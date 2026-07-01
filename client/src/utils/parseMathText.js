/**
 * Split a string on $...$ inline math delimiters.
 * Returns [{ type: 'text'|'math', value: string }, ...]
 */
export function parseMathText(input) {
  if (!input || typeof input !== 'string') return [];

  const segments = [];
  const regex = /\$([^$]+)\$/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(input)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', value: input.slice(lastIndex, match.index) });
    }
    segments.push({ type: 'math', value: match[1] });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < input.length) {
    segments.push({ type: 'text', value: input.slice(lastIndex) });
  }

  return segments.length > 0 ? segments : [{ type: 'text', value: input }];
}

/**
 * Extract all $...$ LaTeX segments from a string (for validation).
 */
export function extractInlineMath(input) {
  if (!input || typeof input !== 'string') return [];
  const regex = /\$([^$]+)\$/g;
  const results = [];
  let match;
  while ((match = regex.exec(input)) !== null) {
    results.push(match[1]);
  }
  return results;
}
