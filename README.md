# MCP Help Article Server

A **Model Context Protocol (MCP)** server that serves help articles to tenants. Each tenant's AI (Claude) connects to this server and can search and retrieve articles — scoped to shared content + their own tenant-specific content.

## Project Structure

```
mcp-helpdesk/
├── server/
│   └── index.js        ← MCP server: tools, search logic, tenant isolation
├── data/
│   └── articles.js     ← Help articles (shared + per-tenant)
├── ui/
│   └── simulator.html  ← Browser simulation of the full MCP flow
└── README.md
```

## MCP Tools Exposed

### `search_articles`
Search help articles by natural language query, scoped to the calling tenant.

```json
{
  "tool": "search_articles",
  "parameters": {
    "query": "how do I reset my password",
    "tenant_id": "acme"
  }
}
```

### `get_article`
Fetch the full content of a specific article. Access denied if the article belongs to a different tenant.

```json
{
  "tool": "get_article",
  "parameters": {
    "article_id": "shared-001",
    "tenant_id": "acme"
  }
}
```

## Tenant Isolation

Every request must carry a `tenant_id`. The server returns:
- ✅ All `shared` articles
- ✅ Articles belonging to the requesting tenant
- ❌ Articles belonging to any other tenant (throws Access Denied)

## Data Model

```js
{
  id: "acme-001",
  tenant_id: "acme",       // "shared" | "<tenant_id>"
  title: "...",
  tags: ["onboarding", "crm"],
  content: "Full article text..."
}
```

## How to extend

1. **Add articles**: Edit `data/articles.js` — set `tenant_id` to `"shared"` or a specific tenant.
2. **Add a tenant**: Add articles with a new `tenant_id` — no server changes needed.
3. **Swap data source**: Replace the in-memory array in `data/articles.js` with a DB query.
4. **Add auth**: Validate `tenant_id` against a JWT/API key before processing any tool call.

## Simulate in browser

Open `ui/simulator.html` in any browser — no server needed. It simulates the full MCP request/response flow in-browser.
