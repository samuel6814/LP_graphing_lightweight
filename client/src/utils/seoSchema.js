import { absoluteUrl, SITE } from '../config/site';
import { buildFaqPageSchema } from './topicFaq';

const ORG_ID = `${SITE.url}#organization`;
const WEBSITE_ID = `${SITE.url}#website`;
const COURSE_ID = `${SITE.url}#course`;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    sameAs: [SITE.github],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: { '@id': ORG_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${absoluteUrl('/learn')}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function courseSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': COURSE_ID,
    name: SITE.course.name,
    description: SITE.description,
    provider: {
      '@type': 'Organization',
      name: SITE.course.institution,
    },
    isPartOf: { '@id': WEBSITE_ID },
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function homePageSchemas() {
  return [organizationSchema(), websiteSchema(), courseSchema()];
}

export function learnHubSchemas() {
  return [
    organizationSchema(),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Learn Hub',
      url: absoluteUrl('/learn'),
      description: 'Browse MATH 466 linear programming topics with explainers, practice, and interactive graphs.',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': COURSE_ID },
    },
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Learn Hub', path: '/learn' },
    ]),
  ];
}

export function topicPageSchemas({ topic, faqItems }) {
  const path = `/learn/${topic.slug}`;
  const pageUrl = absoluteUrl(path);
  const graphs = [
    organizationSchema(),
    {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: topic.title,
      description: topic.quickAnswer || topic.summary,
      url: pageUrl,
      learningResourceType: 'Lesson',
      educationalLevel: 'Undergraduate',
      inLanguage: 'en',
      isPartOf: { '@id': COURSE_ID },
      about: {
        '@type': 'Thing',
        name: 'Linear Programming',
      },
      keywords: topic.keywords?.join(', '),
    },
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Learn Hub', path: '/learn' },
      { name: topic.title, path },
    ]),
    courseSchema(),
  ];

  const faq = buildFaqPageSchema(faqItems, pageUrl);
  if (faq) graphs.push(faq);

  return graphs;
}
