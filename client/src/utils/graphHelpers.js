import { create, all } from 'mathjs';
import { sampleExplicit } from './plotSampler.js';

const math = create(all);

/** Normalize LP expressions: 2x+3y, x1/x2 aliases, optional spaces. */
export function normalizeLpExpression(expr) {
  if (!expr) return '';
  return expr
    .trim()
    .replace(/x1/gi, 'x')
    .replace(/x2/gi, 'y')
    .replace(/\s+/g, '')
    .replace(/(\d)([xy])/gi, '$1*$2')
    .replace(/([xy])(\d)/gi, '$1*$2')
    .replace(/(\))([xy(])/gi, '$1*$2')
    .replace(/(\d)\(/g, '$1*(');
}

/** Evaluate a linear LHS at (x, y). Returns NaN if not evaluable. */
export function evalLinearLhs(lhs, x, y) {
  const normalized = normalizeLpExpression(lhs).replace(/\*/g, '');
  const withImplicit = normalized
    .replace(/(\d)([xy])/gi, '$1*$2')
    .replace(/([xy])(\d)/gi, '$1*$2');
  try {
    return math.evaluate(withImplicit, { x, y });
  } catch {
    return NaN;
  }
}

export function parseObjective(objectiveStr) {
  if (!objectiveStr) return { type: 'max', coeffs: { x: 1, y: 1 } };
  const isMax = /max/i.test(objectiveStr);
  const expr = normalizeLpExpression(objectiveStr.replace(/^(max|min)/i, ''));
  const atOrigin = evalLinearLhs(expr, 0, 0);
  const coeffs = {
    x: evalLinearLhs(expr, 1, 0) - atOrigin,
    y: evalLinearLhs(expr, 0, 1) - atOrigin,
  };
  if (!Number.isFinite(coeffs.x)) coeffs.x = 0;
  if (!Number.isFinite(coeffs.y)) coeffs.y = 0;
  return { type: isMax ? 'max' : 'min', coeffs };
}

export function parseConstraint(constraintStr) {
  const s = normalizeLpExpression(constraintStr);
  const ge = s.match(/^(.+)>=(.+)$/);
  const le = s.match(/^(.+)<=(.+)$/);
  const eq = s.match(/^(.+)=(.+)$/);
  if (ge) return { lhs: ge[1], op: '>=', rhs: parseFloat(ge[2]) };
  if (le) return { lhs: le[1], op: '<=', rhs: parseFloat(le[2]) };
  if (eq) return { lhs: eq[1], op: '=', rhs: parseFloat(eq[2]) };
  return null;
}

/**
 * Normalize a constraint to one or more half-planes { a, b, c, op } for ax + by op c.
 * @returns {{ a: number, b: number, c: number, op: '<=' | '>=' }[]}
 */
export function normalizeLinearConstraint(constraintStr) {
  const parsed = parseConstraint(constraintStr);
  if (!parsed || !Number.isFinite(parsed.rhs)) return [];

  const lhs = parsed.lhs;
  let a;
  let b;

  if (/^x$/i.test(lhs)) {
    a = 1;
    b = 0;
  } else if (/^y$/i.test(lhs)) {
    a = 0;
    b = 1;
  } else {
    const atOrigin = evalLinearLhs(lhs, 0, 0);
    a = evalLinearLhs(lhs, 1, 0) - atOrigin;
    b = evalLinearLhs(lhs, 0, 1) - atOrigin;
    if (!Number.isFinite(a) || !Number.isFinite(b)) return [];
    if (Math.abs(a) < 1e-12 && Math.abs(b) < 1e-12) return [];
  }

  if (parsed.op === '=') {
    return [
      { a, b, c: parsed.rhs, op: '<=' },
      { a, b, c: parsed.rhs, op: '>=' },
    ];
  }
  return [{ a, b, c: parsed.rhs, op: parsed.op }];
}

export function lineFromConstraint(constraint, xRange = [-1, 10]) {
  const c = parseConstraint(constraint);
  if (!c) return null;
  const lhs = c.lhs;

  if (/^x$/i.test(lhs)) {
    return { type: 'vertical', x: c.rhs, op: c.op };
  }
  if (/^y$/i.test(lhs)) {
    return { type: 'horizontal', y: c.rhs, op: c.op };
  }

  const points = [];
  for (let x = xRange[0]; x <= xRange[1]; x += 0.25) {
    const y = solveConstraintY(lhs, c.rhs, x);
    if (y !== null && isFinite(y) && Math.abs(y) < 50) points.push({ x, y });
  }
  if (points.length > 1) return { type: 'line', points, op: c.op };
  return null;
}

function solveConstraintY(lhs, rhs, x) {
  const atOrigin = evalLinearLhs(lhs, 0, 0);
  const a = evalLinearLhs(lhs, 1, 0) - atOrigin;
  const b = evalLinearLhs(lhs, 0, 1) - atOrigin;
  if (Math.abs(b) < 1e-9) return null;
  const xPart = evalLinearLhs(lhs, x, 0);
  return (rhs - xPart) / b;
}

export function sampleFunction(expr, xMin, xMax, steps = 200) {
  const { segments } = sampleExplicit(expr, [xMin, xMax], steps);
  return segments[0]?.points ?? [];
}

export function evaluateCalc(expr) {
  try {
    const result = math.evaluate(expr.replace(/\^/g, '^'));
    return String(result);
  } catch {
    return 'Error';
  }
}

export function worldToSvg(x, y, width, height, xRange, yRange) {
  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;
  const sx = ((x - xMin) / (xMax - xMin)) * width;
  const sy = height - ((y - yMin) / (yMax - yMin)) * height;
  return { sx, sy };
}
