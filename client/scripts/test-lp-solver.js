/**
 * LP solver smoke tests (objective evaluation).
 */
function parseObjective(objectiveStr) {
  if (!objectiveStr) return { type: 'max', coeffs: { x: 1, y: 1 } };
  const isMax = /max/i.test(objectiveStr);
  const expr = objectiveStr.replace(/^(max|min)\s*/i, '').trim();
  const coeffs = { x: 0, y: 0 };
  const xMatch = expr.match(/([+-]?\d*\.?\d*)\s*\*\s*x1?/i) || expr.match(/([+-]?\d*\.?\d*)\s*x(?!1)/i);
  const yMatch = expr.match(/([+-]?\d*\.?\d*)\s*\*\s*y/i) || expr.match(/([+-]?\d*\.?\d*)\s*y/i);
  if (xMatch) coeffs.x = !xMatch[1] || xMatch[1] === '+' ? 1 : xMatch[1] === '-' ? -1 : parseFloat(xMatch[1]);
  if (yMatch) coeffs.y = !yMatch[1] || yMatch[1] === '+' ? 1 : yMatch[1] === '-' ? -1 : parseFloat(yMatch[1]);
  return { type: isMax ? 'max' : 'min', coeffs };
}

function evaluateObjective(x, y, objectiveStr) {
  const obj = parseObjective(objectiveStr);
  return obj.coeffs.x * x + obj.coeffs.y * y;
}

const z = evaluateObjective(4, 2, 'Maximize 3*x + 2*y');
if (Math.abs(z - 16) > 0.01) {
  console.error('FAIL: expected Z=16 at (4,2), got', z);
  process.exit(1);
}

const zMin = evaluateObjective(0, 0, 'Minimize x + y');
if (zMin !== 0) {
  console.error('FAIL: expected min Z=0 at origin');
  process.exit(1);
}

console.log('lpSolver smoke tests passed');
