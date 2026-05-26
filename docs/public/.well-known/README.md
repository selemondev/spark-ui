# Agent Discovery Resources

This directory contains resources for AI agent discovery and integration, following modern web standards and RFCs.

## Files

### `/api-catalog`
**Standard:** RFC 9727  
**Purpose:** API catalog for automated API discovery  
**Content-Type:** `application/linkset+json`  
**Documentation:** https://www.rfc-editor.org/rfc/rfc9727

Contains linkset describing the Spark UI documentation, GitHub repository, and NPM package information.

### `/mcp/server-card.json`
**Standard:** SEP-1649 (Model Context Protocol)  
**Purpose:** MCP Server Card for agent discovery  
**Content-Type:** `application/json`  
**Documentation:** https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2127

Provides metadata about Spark UI's MCP server capabilities, including available resources and tools for AI agents.

### `/agent-skills/index.json`
**Standard:** Agent Skills Discovery RFC v0.2.0  
**Purpose:** Agent skills discovery index  
**Content-Type:** `application/json`  
**Documentation:** https://github.com/cloudflare/agent-skills-discovery-rfc

Lists all available agent skills and resources for automated discovery by AI agents.

## Related Files

### `/robots.txt`
Located at the site root, contains:
- Standard crawl rules for web crawlers
- Explicit User-agent directives for AI crawlers (GPTBot, Claude-Web, Google-Extended, etc.)
- Content Signals declaring AI content usage preferences
- Sitemap reference

**Standards:**
- RFC 9309 (Robots Exclusion Protocol)
- Content Signals (https://contentsignals.org/)

### `/sitemap.xml`
Located at the site root, contains canonical URLs for all documentation pages.

**Standard:** https://www.sitemaps.org/protocol.html

## HTTP Headers

The site returns Link headers (RFC 8288) on the homepage to advertise these resources:

```
Link: </.well-known/api-catalog>; rel="api-catalog"
Link: </.well-known/mcp/server-card.json>; rel="mcp-server-card"
Link: </.well-known/agent-skills/index.json>; rel="agent-skills"
Link: </sitemap.xml>; rel="sitemap"; type="application/xml"
Link: </robots.txt>; rel="robots"
```

## WebMCP Integration

The site also implements WebMCP (Web Machine Context Protocol) to expose tools directly to AI agents via the browser:

- `navigator.modelContext.provideContext()` API
- Tools for searching components, getting installation instructions, and navigating documentation
- Client-side integration in `/docs/.vitepress/theme/webmcp.ts`

**Documentation:** https://webmachinelearning.github.io/webmcp/

## Purpose

These resources enable:

1. **Automated discovery** - AI agents can find and understand Spark UI's APIs and documentation
2. **Authentication flows** - Future support for OAuth/OIDC discovery
3. **Content preferences** - Clear signals about AI training and content usage
4. **Tool integration** - WebMCP and MCP enable direct interaction with the documentation
5. **Crawl control** - Explicit rules for different types of AI crawlers

## Verification

You can verify these resources are properly configured:

- Check robots.txt: https://spark-ui.vercel.app/robots.txt
- Check sitemap: https://spark-ui.vercel.app/sitemap.xml
- Check API catalog: https://spark-ui.vercel.app/.well-known/api-catalog
- Check MCP card: https://spark-ui.vercel.app/.well-known/mcp/server-card.json
- Check agent skills: https://spark-ui.vercel.app/.well-known/agent-skills/index.json
- Test with: https://isitagentready.com/
