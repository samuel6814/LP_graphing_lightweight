/** Strip LaTeX delimiters and common commands for schema plain text. */
export function plainTextFromMath(str) {
  if (!str) return '';
  return String(str)
    .replace(/\$+/g, '')
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\\[a-zA-Z]+\{([^}]*)\}/g, '$1')
    .replace(/\\[a-zA-Z]+/g, ' ')
    .replace(/[{}_^]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getTopicFaq(content) {
  if (!content?.practice?.length) return [];
  return content.practice.map((q) => ({
    question: plainTextFromMath(q.prompt),
    answer: plainTextFromMath(q.answer),
    raw: q,
  }));
}

export function buildFaqPageSchema(faqItems, pageUrl) {
  if (!faqItems.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
    url: pageUrl,
  };
}
