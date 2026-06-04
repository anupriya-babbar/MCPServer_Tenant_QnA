/**
 * MCP Help Article Server
 * Exposes: search_articles, get_article tools
 * Supports: shared articles + per-tenant articles
 */

import { articles } from "../data/articles.js";

// ---------- core search logic ----------

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9 ]/g, "");
}

function score(article, query) {
  const q = normalize(query);
  const terms = q.split(" ").filter(Boolean);
  const haystack = normalize(
    article.title + " " + article.content + " " + article.tags.join(" ")
  );
  let hits = 0;
  for (const term of terms) {
    if (haystack.includes(term)) hits++;
  }
  return hits / terms.length;
}

/**
 * search_articles tool
 * @param {string} query        - user's natural language question
 * @param {string} tenant_id    - which tenant is asking
 * @returns {Array}             - ranked list of matching articles
 */
export function search_articles({ query, tenant_id }) {
  if (!query) throw new Error("query is required");
  if (!tenant_id) throw new Error("tenant_id is required");

  // Only return shared articles + this tenant's own articles
  const visible = articles.filter(
    (a) => a.tenant_id === "shared" || a.tenant_id === tenant_id
  );

  const results = visible
    .map((a) => ({ ...a, score: score(a, query) }))
    .filter((a) => a.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ score: _s, content: _c, ...meta }) => meta); // strip full content from list

  return {
    tool: "search_articles",
    tenant_id,
    query,
    results,
    total: results.length,
  };
}

/**
 * get_article tool
 * @param {string} article_id   - ID of the article to fetch
 * @param {string} tenant_id    - must match article's tenant or "shared"
 * @returns {Object}            - full article content
 */
export function get_article({ article_id, tenant_id }) {
  if (!article_id) throw new Error("article_id is required");
  if (!tenant_id) throw new Error("tenant_id is required");

  const article = articles.find((a) => a.id === article_id);

  if (!article) {
    throw new Error(`Article '${article_id}' not found`);
  }

  // Tenant isolation: only allow shared or own articles
  if (article.tenant_id !== "shared" && article.tenant_id !== tenant_id) {
    throw new Error(`Access denied: article belongs to a different tenant`);
  }

  return { tool: "get_article", tenant_id, article };
}

/**
 * MCP server manifest — what tools are available
 */
export const manifest = {
  name: "helpdesk-mcp-server",
  version: "1.0.0",
  description: "Serves help articles to tenants via MCP protocol",
  tools: [
    {
      name: "search_articles",
      description: "Search help articles by query. Returns shared + tenant-specific results.",
      parameters: {
        query: { type: "string", required: true, description: "Natural language search query" },
        tenant_id: { type: "string", required: true, description: "Tenant identifier for scoping results" },
      },
    },
    {
      name: "get_article",
      description: "Fetch full content of a specific help article by ID.",
      parameters: {
        article_id: { type: "string", required: true, description: "Article ID to retrieve" },
        tenant_id: { type: "string", required: true, description: "Tenant identifier for access control" },
      },
    },
  ],
};
