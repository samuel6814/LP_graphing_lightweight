import { create, all } from 'mathjs';

const math = create(all);

const PLOT_COLORS = ['teal', 'magenta', 'indigo', 'amber'];

export function getPlotColor(index) {
  return PLOT_COLORS[index % PLOT_COLORS.length];
}

export function normalizePlotVars(expr) {
  return expr
    .replace(/\bx1\b/gi, 'x')
    .replace(/\bx2\b/gi, 'y')
    .replace(/\^/g, '^');
}

export function detectPlotType(expr) {
  const s = normalizePlotVars(expr).replace(/\s/g, '');
  if (/<=|>=|!=/.test(s)) return 'explicit';
  if (/(?<![=<>!])=(?!=)/.test(s)) return 'implicit';
  return 'explicit';
}

export function resolvePlotType(expr, mode = 'auto') {
  if (mode === 'explicit' || mode === 'implicit') return mode;
  return detectPlotType(expr);
}

export function plotLabel(expr, index, mode = 'auto') {
  const type = resolvePlotType(expr, mode);
  const n = index + 1;
  return type === 'implicit' ? `C${n}` : `f${n}(x)`;
}

function prepareExpr(expr) {
  return normalizePlotVars(expr.trim());
}

export function isPlottable(expr) {
  return Boolean(expr && String(expr).trim());
}

function evalSafe(fn, x, y) {
  try {
    const v = fn(x, y);
    return typeof v === 'number' && isFinite(v) ? v : NaN;
  } catch {
    return NaN;
  }
}

export function buildEvaluator(expr, type) {
  if (!isPlottable(expr)) return null;
  const normalized = prepareExpr(expr);

  if (type === 'implicit') {
    const eqMatch = normalized.match(/^(.+?)(?<![=<>!])=(?!=)(.+)$/);
    if (!eqMatch) return null;
    const lhsSrc = eqMatch[1].trim();
    const rhsSrc = eqMatch[2].trim();
    if (!lhsSrc || !rhsSrc) return null;
    let lhs;
    let rhs;
    try {
      lhs = math.compile(lhsSrc);
    } catch {
      return null;
    }
    try {
      rhs = math.compile(rhsSrc);
    } catch {
      return null;
    }
    return (x, y) => {
      const scope = { x, y, z: 0 };
      return lhs.evaluate(scope) - rhs.evaluate(scope);
    };
  }

  let compiled;
  try {
    compiled = math.compile(normalized);
  } catch {
    return null;
  }
  return (x) => {
    const scope = { x, y: 0, z: 0 };
    return compiled.evaluate(scope);
  };
}

export function sampleExplicit(expr, xRange, steps = 200, mode = 'auto') {
  if (!isPlottable(expr)) return { segments: [] };
  const type = resolvePlotType(expr, mode);
  if (type !== 'explicit') return { segments: [] };

  const fn = buildEvaluator(expr, 'explicit');
  if (!fn) return { segments: [] };

  const [xMin, xMax] = xRange;
  const points = [];
  const step = (xMax - xMin) / steps;

  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * step;
    const y = fn(x);
    if (typeof y === 'number' && isFinite(y)) {
      points.push({ x, y });
    } else if (points.length > 1) {
      return { segments: [{ points }] };
    }
  }

  return points.length > 1 ? { segments: [{ points }] } : { segments: [] };
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function interpEdge(v0, v1, x0, y0, x1, y1) {
  if (!isFinite(v0) || !isFinite(v1) || Math.abs(v1 - v0) < 1e-12) return null;
  const t = -v0 / (v1 - v0);
  return { x: lerp(x0, x1, t), y: lerp(y0, y1, t) };
}

// Edge indices: 0=bottom, 1=right, 2=top, 3=left
const MS_SEGMENTS = [
  [],
  [[3, 0]],
  [[0, 1]],
  [[3, 1]],
  [[1, 2]],
  [[3, 0], [1, 2]],
  [[0, 2]],
  [[3, 2]],
  [[2, 3]],
  [[2, 0]],
  [[0, 1], [2, 3]],
  [[2, 1]],
  [[1, 3]],
  [[1, 0]],
  [[0, 3]],
  [],
];

export function sampleImplicit(expr, xRange, yRange, gridSteps = 80, mode = 'auto') {
  if (!isPlottable(expr)) return { segments: [] };
  const type = resolvePlotType(expr, mode);
  if (type !== 'implicit') return { segments: [] };

  const fn = buildEvaluator(expr, 'implicit');
  if (!fn) return { segments: [] };

  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;
  const nx = gridSteps;
  const ny = gridSteps;
  const dx = (xMax - xMin) / nx;
  const dy = (yMax - yMin) / ny;

  const values = [];
  for (let j = 0; j <= ny; j++) {
    const row = [];
    const y = yMin + j * dy;
    for (let i = 0; i <= nx; i++) {
      const x = xMin + i * dx;
      row.push(evalSafe(fn, x, y));
    }
    values.push(row);
  }

  const segments = [];

  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const x0 = xMin + i * dx;
      const y0 = yMin + j * dy;
      const x1 = x0 + dx;
      const y1 = y0 + dy;

      const v00 = values[j][i];
      const v10 = values[j][i + 1];
      const v11 = values[j + 1][i + 1];
      const v01 = values[j + 1][i];

      let idx = 0;
      if (v00 > 0) idx |= 1;
      if (v10 > 0) idx |= 2;
      if (v11 > 0) idx |= 4;
      if (v01 > 0) idx |= 8;

      const edgePts = [
        interpEdge(v00, v10, x0, y0, x1, y0),
        interpEdge(v10, v11, x1, y0, x1, y1),
        interpEdge(v11, v01, x1, y1, x0, y1),
        interpEdge(v01, v00, x0, y1, x0, y0),
      ];

      for (const [ea, eb] of MS_SEGMENTS[idx]) {
        const p1 = edgePts[ea];
        const p2 = edgePts[eb];
        if (p1 && p2) segments.push({ points: [p1, p2] });
      }
    }
  }

  return { segments };
}

export function samplePlot(expr, xRange, yRange, mode = 'auto') {
  if (!isPlottable(expr)) return { segments: [] };
  const type = resolvePlotType(expr, mode);
  if (type === 'implicit') {
    return sampleImplicit(expr, xRange, yRange, 80, mode);
  }
  return sampleExplicit(expr, xRange, 200, mode);
}
