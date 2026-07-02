/**
 * Feasible region regression tests (half-plane clipping + LP input normalization).
 */
import { feasibleRegionPolygon, isFeasible } from '../src/utils/feasibleRegion.js';
import { parseConstraint, normalizeLpExpression, evalLinearLhs } from '../src/utils/graphHelpers.js';

const X_RANGE = [0, 10];
const Y_RANGE = [0, 10];

function assert(cond, msg) {
  if (!cond) {
    console.error('FAIL:', msg);
    process.exit(1);
  }
}

function hasVertex(poly, x, y, tol = 0.05) {
  return poly.some((p) => Math.abs(p.x - x) < tol && Math.abs(p.y - y) < tol);
}

let lastConstraints = [];

function testPolygon(name, constraints, checks) {
  lastConstraints = constraints;
  const poly = feasibleRegionPolygon(constraints, X_RANGE, Y_RANGE);
  checks(poly);
  console.log('OK:', name);
}

// --- Normalization ---
assert(normalizeLpExpression('2x + 2y <= 0') === '2*x+2*y<=0', 'normalize spaces and implicit *');
assert(parseConstraint('2x+2y<=12').lhs === '2*x+2*y', 'parseConstraint normalizes lhs');
assert(Math.abs(evalLinearLhs('2x+2y', 1, 1) - 4) < 1e-6, 'evalLinearLhs 2x+2y at (1,1)');

// --- Triangle: x>=0, y>=0, x+y<=6 ---
testPolygon('triangle', ['x>=0', 'y>=0', 'x+y<=6'], (poly) => {
  assert(poly.length === 3, `triangle has 3 verts, got ${poly.length}`);
  assert(hasVertex(poly, 0, 0), 'includes origin');
  assert(hasVertex(poly, 6, 0), 'includes (6,0)');
  assert(hasVertex(poly, 0, 6), 'includes (0,6)');
  assert(isFeasible(2, 2, ['x>=0', 'y>=0', 'x+y<=6']), '(2,2) feasible');
  assert(!isFeasible(4, 4, ['x>=0', 'y>=0', 'x+y<=6']), '(4,4) infeasible');
});

// --- Pentagon: bounded box + x+y<=6 ---
testPolygon('pentagon', ['x>=0', 'y>=0', 'x<=5', 'y<=5', 'x+y<=6'], (poly) => {
  assert(poly.length === 5, `pentagon has 5 verts, got ${poly.length}`);
  assert(hasVertex(poly, 5, 1), 'includes (5,1)');
  assert(hasVertex(poly, 1, 5), 'includes (1,5)');
  assert(!isFeasible(4, 4, ['x>=0', 'y>=0', 'x<=5', 'y<=5', 'x+y<=6']), '(4,4) infeasible for pentagon');
});

// --- Implicit multiplication constraint ---
testPolygon('implicit mult', ['2x+3y<=12', 'x>=0', 'y>=0'], (poly) => {
  assert(poly.length === 3, `2x+3y<=12 triangle, got ${poly.length} verts`);
  assert(hasVertex(poly, 6, 0), 'includes x-intercept (6,0)');
  assert(hasVertex(poly, 0, 4), 'includes y-intercept (0,4)');
});

// --- Spaced input ---
testPolygon('spaced input', ['2x + 2y <= 12', 'x>=0', 'y>=0'], (poly) => {
  assert(poly.length === 3, `spaced 2x+2y<=12 triangle, got ${poly.length} verts`);
  assert(hasVertex(poly, 6, 0), 'spaced input x-intercept');
});

// --- Infeasible ---
testPolygon('infeasible', ['x>=5', 'x<=2'], (poly) => {
  assert(poly.length === 0, 'contradictory constraints yield empty polygon');
});

console.log('All feasible region tests passed');
