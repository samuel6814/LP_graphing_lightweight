# Deploying LP Grapher to Vercel

## Prerequisites

- GitHub repo: `samuel6814/LP_graphing_lightweight`
- Vercel account connected to GitHub

## Steps

1. Import the repository in [Vercel](https://vercel.com/new).
2. Set **Root Directory** to `client`.
3. Framework preset: **Vite** (auto-detected).
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy — `vercel.json` handles SPA rewrites for client-side routing.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SITE_URL` | Yes (for production SEO) | Canonical site URL, e.g. `https://your-app.vercel.app` — used for sitemap, Open Graph, canonical links, and `llms.txt` |

Set `VITE_SITE_URL` in Vercel **Project → Settings → Environment Variables** for Production (and Preview if desired). Rebuild after setting it so `prebuild` generates correct `sitemap.xml`, `robots.txt`, and `llms.txt`.

## SEO / discoverability (post-deploy)

1. **Google Search Console** — Add property for your domain, submit `https://YOUR_DOMAIN/sitemap.xml`.
2. **Bing Webmaster Tools** — Submit the same sitemap.
3. **GitHub repo** — Set description and topics: `linear-programming`, `education`, `optimization`, `katex`. Link the live site URL in the README.
4. **Rich Results** — Test a topic URL with [Google Rich Results Test](https://search.google.com/test/rich-results) for FAQ and breadcrumb schema.
5. **AI visibility** — `llms.txt` is served at `/llms.txt`; spot-check citations in Perplexity or ChatGPT over time.

## Local preview

```bash
cd client
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview  # production preview
```

## Environment

No other environment variables required for v1 (fully static).
