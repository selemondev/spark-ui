/**
 * WebMCP (Web Machine Context Protocol) Integration
 * https://webmachinelearning.github.io/webmcp/
 * https://developer.chrome.com/blog/webmcp-epp
 * 
 * This script provides tools to AI agents via the navigator.modelContext API
 */

// Extend Navigator interface to include modelContext
declare global {
  interface Navigator {
    modelContext?: {
      provideContext: (context: WebMCPContext) => void
    }
  }
}

interface WebMCPContext {
  tools: WebMCPTool[]
  metadata?: {
    name: string
    description: string
    version: string
  }
}

interface WebMCPTool {
  name: string
  description: string
  inputSchema: {
    type: string
    properties: Record<string, any>
    required?: string[]
  }
  execute: (params: any) => Promise<any>
}

function initWebMCP() {
  // Check if WebMCP API is available
  if (typeof window === 'undefined' || !navigator.modelContext) {
    console.log('WebMCP API not available in this browser')
    return
  }

  const tools: WebMCPTool[] = [
    {
      name: 'searchComponents',
      description: 'Search for Spark UI components by name or category',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search query for components',
          },
        },
        required: ['query'],
      },
      execute: async (params: { query: string }) => {
        const components = [
          'Animated Beam', 'Animated Gradient Text', 'Animated List', 
          'Animated Shiny Text', 'Animated Tooltip', 'Avatar Circle',
          'Bento Grid', 'Blur Fade', 'Blur In', 'Dot Pattern',
          'Globe', 'Gradual Spacing', 'Hero Video Dialog', 'Letter Up',
          'Marquee', 'Meteors', 'Orbiting Circles', 'Particles',
          'Resizable Navbar', 'Retro Grid', 'Ripple', 'Scroll Progress',
          'Skewed Infinite Scroll', 'Terminal', 'Typing Animation', 'Aurora Text',
        ]
        
        const query = params.query.toLowerCase()
        const results = components.filter(c => c.toLowerCase().includes(query))
        
        return {
          results,
          count: results.length,
          message: `Found ${results.length} components matching "${params.query}"`,
        }
      },
    },
    {
      name: 'getComponentDetails',
      description: 'Get detailed information about a specific Spark UI component',
      inputSchema: {
        type: 'object',
        properties: {
          componentName: {
            type: 'string',
            description: 'Name of the component to get details for',
          },
        },
        required: ['componentName'],
      },
      execute: async (params: { componentName: string }) => {
        const componentSlug = params.componentName.toLowerCase().replace(/\s+/g, '-')
        const url = `/content/components/${componentSlug}`
        
        return {
          componentName: params.componentName,
          documentationUrl: url,
          message: `Component documentation available at ${url}`,
        }
      },
    },
    {
      name: 'getInstallationInstructions',
      description: 'Get installation instructions for Spark UI',
      inputSchema: {
        type: 'object',
        properties: {},
      },
      execute: async () => {
        return {
          packageManager: 'pnpm, npm, or yarn',
          command: 'pnpm add @spark-ui/vue',
          documentationUrl: '/content/guide/getting-started/installation',
          message: 'Install Spark UI using your preferred package manager',
        }
      },
    },
    {
      name: 'navigateToComponent',
      description: 'Navigate to a component documentation page',
      inputSchema: {
        type: 'object',
        properties: {
          componentName: {
            type: 'string',
            description: 'Name of the component to navigate to',
          },
        },
        required: ['componentName'],
      },
      execute: async (params: { componentName: string }) => {
        const componentSlug = params.componentName.toLowerCase().replace(/\s+/g, '-')
        const url = `/content/components/${componentSlug}`
        
        // Navigate to the component page
        if (window.location.pathname !== url) {
          window.location.href = url
        }
        
        return {
          componentName: params.componentName,
          navigatedTo: url,
          message: `Navigated to ${params.componentName} documentation`,
        }
      },
    },
  ]

  // Provide context to AI agents
  try {
    navigator.modelContext?.provideContext({
      tools,
      metadata: {
        name: 'Spark UI Documentation',
        description: 'Animated components library for Vue.js',
        version: '0.0.2',
      },
    })
    console.log('WebMCP tools registered successfully')
  } catch (error) {
    console.error('Failed to register WebMCP tools:', error)
  }
}

// Initialize WebMCP when the page loads
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWebMCP)
  } else {
    initWebMCP()
  }
}

export { initWebMCP }
