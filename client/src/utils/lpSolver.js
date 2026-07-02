import { parseObjective } from './graphHelpers.js';
import { feasibleRegionPolygon } from './feasibleRegion.js';

const EPS = 1e-6;

export function evaluateObjective(x, y, objectiveStr) {
  const obj = parseObjective(objectiveStr);
  return obj.coeffs.x * x + obj.coeffs.y * y;
}

export function findCornerPoints(constraints, xRange, yRange) {
  return feasibleRegionPolygon(constraints, xRange, yRange);
}

function isViewportCorner(p, xRange, yRange) {
  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;
  const onX = Math.abs(p.x - xMin) < 0.02 || Math.abs(p.x - xMax) < 0.02;
  const onY = Math.abs(p.y - yMin) < 0.02 || Math.abs(p.y - yMax) < 0.02;
  return onX && onY;
}

/**
 * Graphical LP solver for 2-variable problems in the current viewport.
 * @returns {{ corners: {x,y,z}[], optimal: {x,y,z}|null, optima: {x,y,z}[], status: 'optimal'|'infeasible'|'unbounded' }}
 */
export function solveGraphicalLP(constraints, objective, xRange, yRange) {
  const empty = { corners: [], optimal: null, optima: [], status: 'infeasible' };
  if (!constraints?.length || !objective?.trim()) return empty;

  const corners = findCornerPoints(constraints, xRange, yRange);
  if (corners.length < 3) return empty;

  const obj = parseObjective(objective);
  const withZ = corners.map((p) => ({
    x: p.x,
    y: p.y,
    z: evaluateObjective(p.x, p.y, objective),
  }));

  const compare =
    obj.type === 'max'
      ? (a, b) => b.z - a.z
      : (a, b) => a.z - b.z;

  const sorted = [...withZ].sort(compare);
  const bestZ = sorted[0].z;
  const optima = sorted.filter((p) => Math.abs(p.z - bestZ) < EPS);

  if (optima.some((p) => isViewportCorner(p, xRange, yRange))) {
    return { corners: withZ, optimal: optima[0], optima, status: 'unbounded' };
  }

  return { corners: withZ, optimal: optima[0], optima, status: 'optimal' };
}

export function formatCoord(n) {
  if (!Number.isFinite(n)) return '?';
  const rounded = Math.round(n * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2);
}

export function formatLpResult(solution) {
  if (!solution) return '';
  if (solution.status === 'infeasible') return 'No feasible region in view';
  if (solution.status === 'unbounded') {
    if (solution.optimal) {
      return `Possibly unbounded — best in view: (${formatCoord(solution.optimal.x)}, ${formatCoord(solution.optimal.y)}), Z = ${formatCoord(solution.optimal.z)}`;
    }
    return 'Possibly unbounded in view';
  }
  if (solution.optima.length > 1) {
    const pts = solution.optima
      .map((p) => `(${formatCoord(p.x)}, ${formatCoord(p.y)})`)
      .join(', ');
    return `Multiple optima: ${pts}, Z = ${formatCoord(solution.optimal.z)}`;
  }
  if (solution.optimal) {
    return `Optimal: (${formatCoord(solution.optimal.x)}, ${formatCoord(solution.optimal.y)}), Z = ${formatCoord(solution.optimal.z)}`;
  }
  return '';
}
