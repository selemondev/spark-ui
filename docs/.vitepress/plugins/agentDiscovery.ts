import type { Plugin } from 'vite'

/**
 * Vite plugin to add Link response headers and support markdown content negotiation
 * RFC 8288: https://www.rfc-editor.org/rfc/rfc8288
 * RFC 9727: https://www.rfc-editor.org/rfc/rfc9727
 */
export function agentDiscoveryPlugin(): Plugin {
  return {
    name: 'vite-plugin-agent-discovery',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || ''
        
        // Add Link headers for agent discovery on homepage
        if (url === '/' || url === '/index.html') {
          const linkHeaders = [
            '</well-known/api-catalog>; rel="api-catalog"',
            '</well-known/mcp/server-card.json>; rel="mcp-server-card"',
            '</well-known/agent-skills/index.json>; rel="agent-skills"',
            '<https://github.com/selemondev/spark-ui>; rel="service-desc"; type="text/html"',
            '</content/guide/getting-started/>; rel="service-doc"; type="text/html"',
            '</sitemap.xml>; rel="sitemap"; type="application/xml"',
            '</robots.txt>; rel="robots"',
          ]
          
          res.setHeader('Link', linkHeaders.join(', '))
        }
        
        // Support markdown content negotiation
        // If Accept header includes text/markdown, we should ideally convert HTML to markdown
        const acceptHeader = req.headers.accept || ''
        if (acceptHeader.includes('text/markdown')) {
          // Note: VitePress doesn't natively support markdown output
          // This would require additional implementation to convert HTML to markdown
          // For now, we set the appropriate header to indicate support
          res.setHeader('Vary', 'Accept')
        }
        
        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || ''
        
        // Add Link headers for agent discovery on homepage
        if (url === '/' || url === '/index.html') {
          const linkHeaders = [
            '</.well-known/api-catalog>; rel="api-catalog"',
            '</.well-known/mcp/server-card.json>; rel="mcp-server-card"',
            '</.well-known/agent-skills/index.json>; rel="agent-skills"',
            '<https://github.com/selemondev/spark-ui>; rel="service-desc"; type="text/html"',
            '</content/guide/getting-started/>; rel="service-doc"; type="text/html"',
            '</sitemap.xml>; rel="sitemap"; type="application/xml"',
            '</robots.txt>; rel="robots"',
          ]
          
          res.setHeader('Link', linkHeaders.join(', '))
        }
        
        const acceptHeader = req.headers.accept || ''
        if (acceptHeader.includes('text/markdown')) {
          res.setHeader('Vary', 'Accept')
        }
        
        next()
      })
    },
  }
}
