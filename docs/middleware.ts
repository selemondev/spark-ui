import { next } from '@vercel/edge'

export const config = {
  matcher: [
    '/',
    '/index.html',
    '/content/:path*',
  ],
}

export default async function middleware(request: Request) {
  const acceptHeader = request.headers.get('accept') || ''

  // Only intercept if client explicitly requests markdown
  if (!acceptHeader.includes('text/markdown')) {
    // Add Vary: Accept header to all page responses for proper caching
    const response = next()
    response.headers.set('Vary', 'Accept')
    return response
  }

  // Map the request URL to the corresponding _markdown/ file
  const url = new URL(request.url)
  let pathname = url.pathname

  // Remove trailing .html
  if (pathname.endsWith('.html')) {
    pathname = pathname.slice(0, -5)
  }

  // Determine the markdown file path
  let mdPath: string
  if (pathname === '/' || pathname === '') {
    mdPath = '/_markdown/index.md'
  }
  else {
    // Remove leading slash
    const cleanPath = pathname.startsWith('/') ? pathname.slice(1) : pathname

    // Try as direct .md file first, then as directory with index.md
    mdPath = `/_markdown/${cleanPath}.md`
  }

  // Fetch the markdown file from the same origin
  const mdUrl = new URL(mdPath, request.url)
  const mdResponse = await fetch(mdUrl.toString(), {
    headers: { Accept: '*/*' },
  })

  if (mdResponse.ok) {
    const content = await mdResponse.text()
    const tokens = Math.ceil(content.length / 4)

    return new Response(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Vary': 'Accept',
        'X-Markdown-Tokens': String(tokens),
        'X-Content-Source': 'vitepress-markdown',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  }

  // If directory-style path, try index.md
  if (!pathname.endsWith('.md')) {
    const trimmed = pathname.endsWith('/') ? pathname.slice(1, -1) : pathname.slice(1)
    const indexMdPath = `/_markdown/${trimmed}/index.md`
    const indexMdUrl = new URL(indexMdPath, request.url)
    const indexMdResponse = await fetch(indexMdUrl.toString(), {
      headers: { Accept: '*/*' },
    })

    if (indexMdResponse.ok) {
      const content = await indexMdResponse.text()
      const tokens = Math.ceil(content.length / 4)

      return new Response(content, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Vary': 'Accept',
          'X-Markdown-Tokens': String(tokens),
          'X-Content-Source': 'vitepress-markdown',
          'Cache-Control': 'public, max-age=3600',
        },
      })
    }
  }

  // Fall back to normal HTML response if markdown not available
  const response = next()
  response.headers.set('Vary', 'Accept')
  return response
}
