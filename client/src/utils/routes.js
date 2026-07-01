export const ROUTES = {
  home: '/',
  learn: '/learn',
  topic: (slug) => `/learn/${slug}`,
};

export function getTopicPath(slug) {
  return `/learn/${slug}`;
}
