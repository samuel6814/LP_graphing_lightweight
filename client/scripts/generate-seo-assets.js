#!/usr/bin/env node
/**
 * Generates sitemap.xml, robots.txt, and llms.txt into client/public/
 * Run: node scripts/generate-seo-assets.js
 */
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { topics } from '../src/data/topicRegistry.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '../public');
const SITE_URL = (process.env.VITE_SITE_URL || 'https://example.com').replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);

mkdirSync(publicDir, { recursive: true });

const staticPaths = ['/', '/learn'];
const topicPaths = topics.map((t) => `/learn/${t.slug}`);
const allPaths = [...staticPaths, ...topicPaths];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths
  .map(
    (path) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${path === '/' ? '1.0' : path === '/learn' ? '0.9' : '0.8'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const robots = `# LP Grapher — allow search and AI answer crawlers
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

const topicLines = topics
  .map((t) => `- [${t.title}](${SITE_URL}/learn/${t.slug}): ${t.summary}`)
  .join('\n');

const llmsTxt = `# LP Grapher

> Interactive MATH 466 Linear Programming learning for KNUST Optimization II — graphing tool, calculator, step-by-step solver, and 21 topic lessons with practice questions.

## Learn

- [Learn Hub](${SITE_URL}/learn): Browse all MATH 466 topics by module with progress tracking.

${topicLines}

## Tools

- [Home](${SITE_URL}/): Landing page with LP graphing, scientific calculator, and step solver in the tools dock.

## About

- [GitHub](https://github.com/samuel6814/LP_graphing_lightweight): Source code and project repository.
- Course: MATH 466 Optimization II (KNUST).
`;

writeFileSync(join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
writeFileSync(join(publicDir, 'robots.txt'), robots, 'utf8');
writeFileSync(join(publicDir, 'llms.txt'), llmsTxt, 'utf8');

console.log(`Generated SEO assets for ${SITE_URL} (${allPaths.length} URLs)`);
