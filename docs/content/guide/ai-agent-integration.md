# AI Agent Integration

Spark UI documentation is designed to be agent-friendly, implementing modern standards for AI crawler control and agent discovery.

## Features

### 1. Robots.txt with AI Crawler Rules

We provide explicit rules for AI crawlers including:
- GPTBot (OpenAI)
- OAI-SearchBot (OpenAI Search)
- Claude-Web (Anthropic)
- Google-Extended (Bard/Gemini)
- PerplexityBot
- CCBot (Common Crawl)
- cohere-ai

**Location:** `/robots.txt`

### 2. Content Signals

We declare our AI content usage preferences using Content Signals:

```
Content-Signal: ai-train=yes, search=yes, ai-input=yes
```

This tells AI systems that our content:
- ✅ Can be used for AI training
- ✅ Can be indexed for search
- ✅ Can be used as input to AI models

**Learn more:** [contentsignals.org](https://contentsignals.org/)

### 3. API Catalog (RFC 9727)

Automated API discovery via `/.well-known/api-catalog` in `application/linkset+json` format.

**Standard:** [RFC 9727](https://www.rfc-editor.org/rfc/rfc9727)

### 4. MCP Server Card

Model Context Protocol server card for agent discovery at `/.well-known/mcp/server-card.json`.

**Standard:** [SEP-1649](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2127)

### 5. Agent Skills Discovery

Agent skills index at `/.well-known/agent-skills/index.json` following the Agent Skills Discovery RFC.

**Standard:** [Agent Skills Discovery RFC v0.2.0](https://github.com/cloudflare/agent-skills-discovery-rfc)

### 6. Link Response Headers

HTTP Link headers (RFC 8288) advertise resources on the homepage:

```http
Link: </.well-known/api-catalog>; rel="api-catalog"
Link: </.well-known/mcp/server-card.json>; rel="mcp-server-card"
Link: </.well-known/agent-skills/index.json>; rel="agent-skills"
```

**Standard:** [RFC 8288](https://www.rfc-editor.org/rfc/rfc8288)

### 7. WebMCP Integration

We implement WebMCP (Web Machine Context Protocol) to expose tools to AI agents via the browser:

**Available Tools:**
- `searchComponents` - Search for components by name
- `getComponentDetails` - Get details about a specific component
- `getInstallationInstructions` - Get installation guide
- `navigateToComponent` - Navigate to component documentation

**Documentation:** [WebMCP](https://webmachinelearning.github.io/webmcp/)

### 8. Sitemap

Complete sitemap at `/sitemap.xml` with all documentation pages.

**Standard:** [sitemaps.org](https://www.sitemaps.org/protocol.html)

## For AI Agent Developers

### Accessing Resources

All discovery resources are available at standard `.well-known` paths:

```bash
# API Catalog
curl https://spark-ui.vercel.app/.well-known/api-catalog

# MCP Server Card
curl https://spark-ui.vercel.app/.well-known/mcp/server-card.json

# Agent Skills Index
curl https://spark-ui.vercel.app/.well-known/agent-skills/index.json

# Robots.txt
curl https://spark-ui.vercel.app/robots.txt

# Sitemap
curl https://spark-ui.vercel.app/sitemap.xml
```

### WebMCP Integration

If your browser supports WebMCP:

```javascript
// Check if available
if (navigator.modelContext) {
  // Tools are automatically registered on page load
  // Access via the navigator.modelContext API
}
```

## Verification

Test the agent-readiness of this site at:
**[isitagentready.com](https://isitagentready.com/)**

## Standards Compliance

This implementation follows:
- ✅ RFC 9309 - Robots Exclusion Protocol
- ✅ RFC 8288 - Web Linking (Link headers)
- ✅ RFC 9727 - API Catalog
- ✅ RFC 9264 - Linkset
- ✅ Content Signals Draft
- ✅ Agent Skills Discovery RFC v0.2.0
- ✅ SEP-1649 - MCP Server Card
- ✅ WebMCP specification

## Resources

- [Cloudflare AI Crawl Control](https://developers.cloudflare.com/ai-crawl-control/)
- [Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/)
- [Agent Skills](https://agentskills.io/)
- [Content Signals](https://contentsignals.org/)
- [Is It Agent Ready?](https://isitagentready.com/)
