import { create, all } from 'mathjs';

const math = create(all);

export function parseObjective(objectiveStr) {
  if (!objectiveStr) return { type: 'max', coeffs: { x: 1, y: 1 } };
  const isMax = /max/i.test(objectiveStr);
  const expr = objectiveStr.replace(/^(max|min)\s*/i, '').trim();
  const coeffs = { x: 0, y: 0 };
  const xMatch = expr.match(/([+-]?\d*\.?\d*)\s*\*\s*x1?/i) || expr.match(/([+-]?\d*\.?\d*)\s*x(?!1)/i);
  const yMatch = expr.match(/([+-]?\d*\.?\d*)\s*\*\s*y/i) || expr.match(/([+-]?\d*\.?\d*)\s*y/i);
  if (xMatch) coeffs.x = parseCoeff(xMatch[1]);
  if (yMatch) coeffs.y = parseCoeff(yMatch[1]);
  return { type: isMax ? 'max' : 'min', coeffs };
}

function parseCoeff(s) {
  if (!s || s === '+' || s === '') return 1;
  if (s === '-') return -1;
  return parseFloat(s);
}

export function parseConstraint(constraintStr) {
  const s = constraintStr.replace(/\s/g, '');
  const ge = s.match(/^(.+)>=(.+)$/);
  const le = s.match(/^(.+)<=(.+)$/);
  const eq = s.match(/^(.+)=(.+)$/);
  if (ge) return { lhs: ge[1], op: '>=', rhs: parseFloat(ge[2]) };
  if (le) return { lhs: le[1], op: '<=', rhs: parseFloat(le[2]) };
  if (eq) return { lhs: eq[1], op: '=', rhs: parseFloat(eq[2]) };
  return null;
}

export function lineFromConstraint(constraint, xRange = [-1, 10]) {
  const c = parseConstraint(constraint);
  if (!c) return null;
  const lhs = c.lhs.replace(/x1/g, 'x').replace(/x2/g, 'y');

  if (/^x$/.test(lhs)) {
    return { type: 'vertical', x: c.rhs, op: c.op };
  }
  if (/^y$/.test(lhs)) {
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
  const normalized = lhs
    .replace(/\*/g, '')
    .replace(/(\d)([xy])/g, '$1*$2')
    .replace(/([xy])(\d)/g, '$1*$2');
  const expr = normalized.replace(/x/g, `(${x})`);
  try {
    const node = math.parse(expr);
    const coeffs = { x: 0, y: 0, c: 0 };
    node.traverse((n) => {
      if (n.isSymbolNode) {
        if (n.name === 'x') coeffs.x += 1;
        if (n.name === 'y') coeffs.y += 1;
      }
    });
    const scope = { x };
    const valAtZero = math.evaluate(expr.replace(/y/g, '(0)'), scope);
    const valAtOne = math.evaluate(expr.replace(/y/g, '(1)'), scope);
    const yCoeff = valAtOne - valAtZero;
    if (Math.abs(yCoeff) < 1e-9) return null;
    const xPart = math.evaluate(expr.replace(/y/g, '(0)'), scope);
    return (rhs - xPart) / yCoeff;
  } catch {
    return null;
  }
}

export function sampleFunction(expr, xMin, xMax, steps = 200) {
  const points = [];
  const step = (xMax - xMin) / steps;
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * step;
    try {
      const y = math.evaluate(expr.replace(/\^/g, '^'), { x });
      if (typeof y === 'number' && isFinite(y)) points.push({ x, y });
    } catch {
      /* skip */
    }
  }
  return points;
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
