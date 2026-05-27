import type { Plugin } from 'vite'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

/**
 * Vite plugin to support Markdown for Agents content negotiation.
 *
 * During dev/preview: intercepts requests with Accept: text/markdown
 * and serves the raw markdown source file with appropriate headers.
 *
 * During build: copies markdown source files to _markdown/ in the output
 * directory so Vercel middleware can serve them.
 */
export function markdownForAgentsPlugin(): Plugin {
  const docsRoot = resolve(__dirname, '../..')

  function getMarkdownFiles(dir: string, base: string = dir): string[] {
    const files: string[] = []
    for (const entry of readdirSync(dir)) {
      const fullPath = join(dir, entry)
      const stat = statSync(fullPath)
      if (stat.isDirectory()) {
        files.push(...getMarkdownFiles(fullPath, base))
      }
      else if (entry.endsWith('.md')) {
        files.push(relative(base, fullPath))
      }
    }
    return files
  }

  function resolveMarkdownPath(url: string): string | null {
    // Map URL paths to markdown source files
    // e.g. /content/guide/getting-started/ -> content/guide/getting-started/index.md
    // e.g. /content/components/animated-beam.html -> content/components/animated-beam.md
    let cleanUrl = url.split('?')[0].split('#')[0]

    // Remove trailing .html
    if (cleanUrl.endsWith('.html')) {
      cleanUrl = cleanUrl.slice(0, -5)
    }

    // Remove leading slash
    if (cleanUrl.startsWith('/')) {
      cleanUrl = cleanUrl.slice(1)
    }

    // Handle root/index
    if (cleanUrl === '' || cleanUrl === 'index') {
      const filePath = resolve(docsRoot, 'index.md')
      try {
        statSync(filePath)
        return filePath
      }
      catch {
        return null
      }
    }

    // Try direct .md file
    const directPath = resolve(docsRoot, `${cleanUrl}.md`)
    try {
      statSync(directPath)
      return directPath
    }
    catch {
      // Try as directory with index.md
      const trimmed = cleanUrl.endsWith('/') ? cleanUrl.slice(0, -1) : cleanUrl
      const indexPath = resolve(docsRoot, trimmed, 'index.md')
      try {
        statSync(indexPath)
        return indexPath
      }
      catch {
        return null
      }
    }
  }

  function countTokens(content: string): number {
    // Approximate token count: ~4 characters per token
    return Math.ceil(content.length / 4)
  }

  function handleMarkdownRequest(req: any, res: any, next: () => void) {
    const acceptHeader = req.headers.accept || ''

    // Always add Vary: Accept to HTML pages for proper caching
    const url = req.url || ''
    const cleanUrl = url.split('?')[0].split('#')[0]
    const isPageRequest = cleanUrl === '/'
      || cleanUrl.endsWith('/')
      || cleanUrl.endsWith('.html')
      || (!cleanUrl.includes('.') && !cleanUrl.startsWith('/_'))

    if (isPageRequest) {
      res.setHeader('Vary', 'Accept')
    }

    // Check if client prefers markdown
    if (!acceptHeader.includes('text/markdown')) {
      return next()
    }

    const mdPath = resolveMarkdownPath(url)
    if (!mdPath) {
      return next()
    }

    try {
      const content = readFileSync(mdPath, 'utf-8')
      // Strip frontmatter for cleaner output
      const stripped = content.replace(/^---[\s\S]*?---\n*/m, '')
      const tokens = countTokens(stripped)

      res.setHeader('Content-Type', 'text/markdown; charset=utf-8')
      res.setHeader('Vary', 'Accept')
      res.setHeader('X-Markdown-Tokens', String(tokens))
      res.setHeader('X-Content-Source', 'vitepress-markdown')
      res.statusCode = 200
      res.end(stripped)
    }
    catch {
      next()
    }
  }

  return {
    name: 'vite-plugin-markdown-for-agents',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        handleMarkdownRequest(req, res, next)
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        handleMarkdownRequest(req, res, next)
      })
    },
    generateBundle() {
      // Copy markdown source files into the build output under _markdown/
      const contentDir = resolve(docsRoot, 'content')
      const mdFiles = getMarkdownFiles(contentDir, docsRoot)

      // Also include the root index.md
      const rootIndex = resolve(docsRoot, 'index.md')
      try {
        const content = readFileSync(rootIndex, 'utf-8')
        const stripped = content.replace(/^---[\s\S]*?---\n*/m, '')
        this.emitFile({
          type: 'asset',
          fileName: '_markdown/index.md',
          source: stripped,
        })
      }
      catch { /* skip if not found */ }

      for (const file of mdFiles) {
        try {
          const fullPath = resolve(docsRoot, file)
          const content = readFileSync(fullPath, 'utf-8')
          const stripped = content.replace(/^---[\s\S]*?---\n*/m, '')
          this.emitFile({
            type: 'asset',
            fileName: `_markdown/${file}`,
            source: stripped,
          })
        }
        catch { /* skip files that can't be read */ }
      }
    },
  }
}
