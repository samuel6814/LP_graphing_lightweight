import { create, all } from 'mathjs';
import { parseConstraint } from './graphHelpers';

const math = create(all);

function evalLhs(lhs, x, y) {
  const normalized = lhs
    .replace(/x1/g, 'x')
    .replace(/x2/g, 'y')
    .replace(/\*/g, '')
    .replace(/(\d)([xy])/g, '$1*$2')
    .replace(/([xy])(\d)/g, '$1*$2');
  try {
    return math.evaluate(normalized, { x, y });
  } catch {
    return NaN;
  }
}

function satisfiesConstraint(x, y, constraint) {
  const c = parseConstraint(constraint);
  if (!c) return true;
  const lhs = c.lhs.replace(/x1/g, 'x').replace(/x2/g, 'y');
  const val = evalLhs(lhs, x, y);
  if (!isFinite(val)) return false;
  const eps = 1e-6;
  if (c.op === '<=') return val <= c.rhs + eps;
  if (c.op === '>=') return val >= c.rhs - eps;
  return Math.abs(val - c.rhs) <= eps;
}

export function isFeasible(x, y, constraints) {
  return constraints.every((c) => satisfiesConstraint(x, y, c));
}

function boundaryLine(constraint) {
  const c = parseConstraint(constraint);
  if (!c) return null;
  const lhs = c.lhs.replace(/x1/g, 'x').replace(/x2/g, 'y');

  if (/^x$/i.test(lhs)) {
    return { type: 'vertical', x: c.rhs };
  }
  if (/^y$/i.test(lhs)) {
    return { type: 'horizontal', y: c.rhs };
  }

  const a = evalLhs(lhs, 1, 0) - evalLhs(lhs, 0, 0);
  const b = evalLhs(lhs, 0, 1) - evalLhs(lhs, 0, 0);
  if (Math.abs(a) < 1e-9 && Math.abs(b) < 1e-9) return null;
  return { type: 'line', a, b, c: c.rhs };
}

function lineIntersection(l1, l2) {
  if (l1.type === 'vertical' && l2.type === 'vertical') return null;
  if (l1.type === 'horizontal' && l2.type === 'horizontal') return null;

  if (l1.type === 'vertical' && l2.type === 'horizontal') {
    return { x: l1.x, y: l2.y };
  }
  if (l1.type === 'horizontal' && l2.type === 'vertical') {
    return { x: l2.x, y: l1.y };
  }

  if (l1.type === 'vertical' && l2.type === 'line') {
    const x = l1.x;
    const y = (l2.c - l2.a * x) / l2.b;
    return isFinite(y) ? { x, y } : null;
  }
  if (l2.type === 'vertical' && l1.type === 'line') {
    const x = l2.x;
    const y = (l1.c - l1.a * x) / l1.b;
    return isFinite(y) ? { x, y } : null;
  }

  if (l1.type === 'horizontal' && l2.type === 'line') {
    const y = l1.y;
    const x = (l2.c - l2.b * y) / l2.a;
    return isFinite(x) ? { x, y } : null;
  }
  if (l2.type === 'horizontal' && l1.type === 'line') {
    const y = l2.y;
    const x = (l1.c - l1.b * y) / l1.a;
    return isFinite(x) ? { x, y } : null;
  }

  if (l1.type === 'line' && l2.type === 'line') {
    const det = l1.a * l2.b - l2.a * l1.b;
    if (Math.abs(det) < 1e-9) return null;
    const x = (l1.c * l2.b - l2.c * l1.b) / det;
    const y = (l1.a * l2.c - l2.a * l1.c) / det;
    return { x, y };
  }

  return null;
}

function inRange(p, xRange, yRange) {
  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;
  return p.x >= xMin - 0.01 && p.x <= xMax + 0.01 && p.y >= yMin - 0.01 && p.y <= yMax + 0.01;
}

function convexHull(points) {
  if (points.length < 3) return points;
  const sorted = [...points].sort((a, b) => a.x - b.x || a.y - b.y);
  const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);

  const lower = [];
  for (const p of sorted) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) {
      lower.pop();
    }
    lower.push(p);
  }

  const upper = [];
  for (let i = sorted.length - 1; i >= 0; i--) {
    const p = sorted[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) {
      upper.pop();
    }
    upper.push(p);
  }

  upper.pop();
  lower.pop();
  return lower.concat(upper);
}

function dedupePoints(points) {
  const seen = new Set();
  return points.filter((p) => {
    const key = `${p.x.toFixed(4)},${p.y.toFixed(4)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function collectFeasibleVertices(constraints, xRange, yRange) {
  const lines = constraints.map(boundaryLine).filter(Boolean);
  const candidates = [];

  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;

  for (let i = 0; i < lines.length; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      const pt = lineIntersection(lines[i], lines[j]);
      if (pt && inRange(pt, xRange, yRange)) candidates.push(pt);
    }
  }

  for (const line of lines) {
    if (line.type === 'vertical') {
      for (const y of [yMin, yMax]) candidates.push({ x: line.x, y });
    } else if (line.type === 'horizontal') {
      for (const x of [xMin, xMax]) candidates.push({ x, y: line.y });
    } else if (line.type === 'line') {
      if (Math.abs(line.b) > 1e-9) {
        for (const x of [xMin, xMax]) {
          candidates.push({ x, y: (line.c - line.a * x) / line.b });
        }
      }
      if (Math.abs(line.a) > 1e-9) {
        for (const y of [yMin, yMax]) {
          candidates.push({ x: (line.c - line.b * y) / line.a, y });
        }
      }
    }
  }

  candidates.push(
    { x: xMin, y: yMin },
    { x: xMax, y: yMin },
    { x: xMin, y: yMax },
    { x: xMax, y: yMax },
  );

  return dedupePoints(candidates).filter((p) => isFeasible(p.x, p.y, constraints));
}

/** All feasible corner candidates before hull (intersections + boundary clips). */
export function getFeasibleVertices(constraints, xRange = [-1, 10], yRange = [-2, 12]) {
  if (!constraints?.length) return [];
  return collectFeasibleVertices(constraints, xRange, yRange);
}

export function feasibleRegionPolygon(constraints, xRange = [-1, 10], yRange = [-2, 12]) {
  if (!constraints?.length) return [];

  const feasible = collectFeasibleVertices(constraints, xRange, yRange);
  if (feasible.length < 3) return [];

  return convexHull(feasible);
}
