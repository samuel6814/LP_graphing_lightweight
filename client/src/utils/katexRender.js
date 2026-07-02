import katex from 'katex';

const DEFAULT_OPTS = { throwOnError: false, strict: 'warn', trust: false };

/**
 * Render LaTeX to an HTML string via KaTeX.
 * @param {string} latex
 * @param {{ displayMode?: boolean }} opts
 * @returns {string}
 */
export function renderKatex(latex, { displayMode = false } = {}) {
  return katex.renderToString(latex, { ...DEFAULT_OPTS, displayMode });
}

/**
 * Render LaTeX, returning html or a caught error.
 * @param {string} latex
 * @param {{ displayMode?: boolean }} opts
 * @returns {{ html: string, error: null } | { html: null, error: Error }}
 */
export function tryRenderKatex(latex, { displayMode = false } = {}) {
  try {
    return { html: renderKatex(latex, { displayMode }), error: null };
  } catch (err) {
    return { html: null, error: err };
  }
}
