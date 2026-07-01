#!/usr/bin/env node
/**
 * Validate all KaTeX strings in topic content.
 * Run: npm run validate-math
 */
import katex from 'katex';
import { topicContent } from '../src/data/topics/index.js';
import { extractInlineMath } from '../src/utils/parseMathText.js';

const failures = [];

function validate(latex, label, displayMode = false) {
  try {
    katex.renderToString(latex, { throwOnError: true, displayMode, strict: 'warn' });
    return true;
  } catch (err) {
    failures.push({ label, latex, error: err.message });
    return false;
  }
}

function walkStrings(obj, path) {
  if (typeof obj === 'string') {
    extractInlineMath(obj).forEach((seg, i) => {
      validate(seg, `${path} [inline $${i + 1}$]`);
    });
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => walkStrings(item, `${path}[${i}]`));
    return;
  }
  if (obj && typeof obj === 'object') {
    for (const [key, val] of Object.entries(obj)) {
      const next = `${path}.${key}`;
      if (key === 'math' && typeof val === 'string') {
        validate(val, next, true);
      } else {
        walkStrings(val, next);
      }
    }
  }
}

let displayCount = 0;
let inlineCount = 0;

for (const [slug, content] of Object.entries(topicContent)) {
  walkStrings(content, slug);
}

// Count successes from walk
function countMath(obj) {
  if (typeof obj === 'string') {
    inlineCount += extractInlineMath(obj).length;
    return;
  }
  if (Array.isArray(obj)) obj.forEach(countMath);
  else if (obj && typeof obj === 'object') {
    for (const [key, val] of Object.entries(obj)) {
      if (key === 'math' && typeof val === 'string') displayCount++;
      else countMath(val);
    }
  }
}
countMath(topicContent);

if (failures.length > 0) {
  console.error(`\n${failures.length} KaTeX validation error(s):\n`);
  failures.forEach(({ label, latex, error }) => {
    console.error(`  [${label}]`);
    console.error(`    LaTeX: ${latex.slice(0, 80)}${latex.length > 80 ? '...' : ''}`);
    console.error(`    Error: ${error}\n`);
  });
  process.exit(1);
}

console.log(`KaTeX validation passed: ${displayCount} display + ${inlineCount} inline expressions across ${Object.keys(topicContent).length} topics.`);
