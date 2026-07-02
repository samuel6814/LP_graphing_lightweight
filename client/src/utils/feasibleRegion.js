import { normalizeLinearConstraint, parseConstraint, evalLinearLhs } from './graphHelpers.js';

const EPS = 1e-6;

function isInside(p, { a, b, c, op }) {
  const val = a * p.x + b * p.y;
  if (op === '<=') return val <= c + EPS;
  if (op === '>=') return val >= c - EPS;
  return Math.abs(val - c) <= EPS;
}

function segmentIntersection(p1, p2, { a, b, c }) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const denom = a * dx + b * dy;
  if (Math.abs(denom) < 1e-12) return null;
  const t = (c - a * p1.x - b * p1.y) / denom;
  if (t < -EPS || t > 1 + EPS) return null;
  return { x: p1.x + t * dx, y: p1.y + t * dy };
}

function clipPolygonByHalfPlane(polygon, halfPlane) {
  if (!polygon.length) return [];

  const output = [];
  for (let i = 0; i < polygon.length; i++) {
    const current = polygon[i];
    const next = polygon[(i + 1) % polygon.length];
    const currInside = isInside(current, halfPlane);
    const nextInside = isInside(next, halfPlane);

    if (currInside && nextInside) {
      output.push(next);
    } else if (currInside && !nextInside) {
      const hit = segmentIntersection(current, next, halfPlane);
      if (hit) output.push(hit);
    } else if (!currInside && nextInside) {
      const hit = segmentIntersection(current, next, halfPlane);
      if (hit) output.push(hit);
      output.push(next);
    }
  }

  return output;
}

function viewportPolygon(xRange, yRange) {
  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;
  return [
    { x: xMin, y: yMin },
    { x: xMax, y: yMin },
    { x: xMax, y: yMax },
    { x: xMin, y: yMax },
  ];
}

function satisfiesConstraint(x, y, constraint) {
  const c = parseConstraint(constraint);
  if (!c) return true;
  const val = evalLinearLhs(c.lhs, x, y);
  if (!isFinite(val)) return false;
  if (c.op === '<=') return val <= c.rhs + EPS;
  if (c.op === '>=') return val >= c.rhs - EPS;
  return Math.abs(val - c.rhs) <= EPS;
}

export function isFeasible(x, y, constraints) {
  return constraints.every((c) => satisfiesConstraint(x, y, c));
}

/** Polygon vertices of the feasible region clipped to the viewport. */
export function getFeasibleVertices(constraints, xRange = [-1, 10], yRange = [-2, 12]) {
  return feasibleRegionPolygon(constraints, xRange, yRange);
}

export function feasibleRegionPolygon(constraints, xRange = [-1, 10], yRange = [-2, 12]) {
  if (!constraints?.length) return [];

  let polygon = viewportPolygon(xRange, yRange);

  for (const constraint of constraints) {
    const halfPlanes = normalizeLinearConstraint(constraint);
    for (const halfPlane of halfPlanes) {
      polygon = clipPolygonByHalfPlane(polygon, halfPlane);
      if (polygon.length < 3) return [];
    }
  }

  return polygon;
}
