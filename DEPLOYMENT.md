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

## Local preview

```bash
cd client
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview  # production preview
```

## Environment

No environment variables required for v1 (fully static).
