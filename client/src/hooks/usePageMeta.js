import { useEffect } from 'react';
import { DEFAULT_TITLE, ogImageUrl, SITE } from '../config/site';

function upsertMeta(attr, key, content) {
  if (content == null || content === '') return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function removeMeta(attr, key) {
  const el = document.querySelector(`meta[${attr}="${key}"]`);
  if (el) el.remove();
}

function removeLink(rel) {
  const el = document.querySelector(`link[rel="${rel}"]`);
  if (el) el.remove();
}

const MANAGED = {
  meta: [
    ['name', 'description'],
    ['name', 'robots'],
    ['name', 'keywords'],
    ['property', 'og:title'],
    ['property', 'og:description'],
    ['property', 'og:url'],
    ['property', 'og:type'],
    ['property', 'og:site_name'],
    ['property', 'og:image'],
    ['property', 'og:locale'],
    ['name', 'twitter:card'],
    ['name', 'twitter:title'],
    ['name', 'twitter:description'],
    ['name', 'twitter:image'],
  ],
  links: ['canonical'],
};

/**
 * @param {{ title?: string, description?: string, path?: string, image?: string, type?: string, keywords?: string[], noindex?: boolean }} options
 */
export function usePageMeta({
  title,
  description = SITE.description,
  path = '/',
  image,
  type = 'website',
  keywords,
  noindex = false,
} = {}) {
  useEffect(() => {
    const pageTitle = title ? `${title} — ${SITE.name}` : DEFAULT_TITLE;
    const url = `${SITE.url.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
    const imageUrl = image ? (image.startsWith('http') ? image : ogImageUrl(image)) : ogImageUrl();
    const robots = noindex ? 'noindex, nofollow' : 'index, follow';
    const keywordsStr = keywords?.length ? keywords.join(', ') : undefined;

    document.title = pageTitle;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', robots);
    if (keywordsStr) upsertMeta('name', 'keywords', keywordsStr);
    else removeMeta('name', 'keywords');

    upsertMeta('property', 'og:title', pageTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:site_name', SITE.name);
    upsertMeta('property', 'og:image', imageUrl);
    upsertMeta('property', 'og:locale', SITE.locale);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', pageTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', imageUrl);

    upsertLink('canonical', url);

    return () => {
      document.title = DEFAULT_TITLE;
      MANAGED.meta.forEach(([attr, key]) => removeMeta(attr, key));
      MANAGED.links.forEach((rel) => removeLink(rel));
    };
  }, [title, description, path, image, type, keywords, noindex]);
}
