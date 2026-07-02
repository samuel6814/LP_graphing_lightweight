export const SITE = {
  name: 'LP Grapher',
  tagline: 'Interactive MATH 466 Linear Programming learning',
  description:
    'LP Grapher — Interactive MATH 466 Linear Programming learning with graphing, calculator, and step-by-step solver.',
  url: import.meta.env.VITE_SITE_URL || 'https://lp-graph-six.vercel.app',
  locale: 'en',
  github: 'https://github.com/samuel6814/LP_graphing_lightweight',
  course: {
    name: 'MATH 466 Optimization II',
    institution: 'KNUST',
  },
};

export const DEFAULT_TITLE = `${SITE.name} — ${SITE.course.name}`;

export function absoluteUrl(path = '/') {
  const base = SITE.url.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

export function ogImageUrl(path = '/og-default.svg') {
  return absoluteUrl(path);
}
