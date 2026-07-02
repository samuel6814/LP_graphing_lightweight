import { useMemo } from 'react';
import Hero from './Hero';
import Features from './Features';
import TopicsPreview from './TopicsPreview';
import HowItWorks from './HowItWorks';
import { usePageMeta } from '../../hooks/usePageMeta';
import { JsonLdMulti } from '../../components/seo/JsonLd';
import { homePageSchemas } from '../../utils/seoSchema';
import { SITE } from '../../config/site';

export default function LandingPage() {
  const schemas = useMemo(() => homePageSchemas(), []);

  usePageMeta({
    title: SITE.course.name,
    description: SITE.description,
    path: '/',
    keywords: ['linear programming', 'LP grapher', 'MATH 466', 'optimization', 'graphing tool'],
  });

  return (
    <>
      <JsonLdMulti graphs={schemas} />
      <Hero />
      <Features />
      <TopicsPreview />
      <HowItWorks />
    </>
  );
}
