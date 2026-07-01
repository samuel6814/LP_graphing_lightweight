import { useMemo } from 'react';
import styled from 'styled-components';
import { sampleFunction, lineFromConstraint, parseObjective, worldToSvg } from '../../utils/graphHelpers';
import { feasibleRegionPolygon } from '../../utils/feasibleRegion';
import { useResizeObserver } from '../../hooks/useResizeObserver';

const Canvas = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 200px;
  background: #fff;
  background-image:
    linear-gradient(to right, rgba(117, 119, 126, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(117, 119, 126, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
`;

const Svg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const PLOT_COLORS = {
  teal: '#006a66',
  magenta: '#d81b60',
  indigo: '#182442',
};

const AXIS_COLOR = '#45464e';
const LABEL_STYLE = { fontSize: 11, fill: AXIS_COLOR, fontFamily: 'system-ui, sans-serif' };

function buildTicks(min, max, count = 6) {
  const step = (max - min) / (count - 1);
  const ticks = [];
  for (let i = 0; i < count; i++) {
    const v = min + i * step;
    ticks.push(Math.round(v * 10) / 10);
  }
  return ticks;
}

export default function GraphCanvas({ expressions = [], lpConfig = null }) {
  const [containerRef, { width, height }] = useResizeObserver();
  const xRange = [-1, 10];
  const yRange = [-2, 12];

  const w = width || 600;
  const h = height || 400;

  const feasiblePolygon = useMemo(() => {
    if (!lpConfig?.constraints) return null;
    const verts = feasibleRegionPolygon(lpConfig.constraints, xRange, yRange);
    if (verts.length < 3) return null;
    return verts
      .map((p) => {
        const { sx, sy } = worldToSvg(p.x, p.y, w, h, xRange, yRange);
        return `${sx},${sy}`;
      })
      .join(' ');
  }, [lpConfig, w, h]);

  const paths = useMemo(() => {
    const result = [];

    if (lpConfig?.constraints) {
      lpConfig.constraints.forEach((c, i) => {
        const line = lineFromConstraint(c, xRange);
        if (line?.type === 'line' && line.points.length > 1) {
          const d = line.points
            .map((p, j) => {
              const { sx, sy } = worldToSvg(p.x, p.y, w, h, xRange, yRange);
              return `${j === 0 ? 'M' : 'L'} ${sx} ${sy}`;
            })
            .join(' ');
          result.push({ d, color: i % 2 === 0 ? PLOT_COLORS.teal : PLOT_COLORS.magenta, dash: true });
        }
        if (line?.type === 'vertical') {
          const { sx } = worldToSvg(line.x, 0, w, h, xRange, yRange);
          result.push({ vertical: sx, color: PLOT_COLORS.indigo });
        }
        if (line?.type === 'horizontal') {
          const { sy } = worldToSvg(0, line.y, w, h, xRange, yRange);
          result.push({ horizontal: sy, color: PLOT_COLORS.indigo });
        }
      });

      if (lpConfig.objective) {
        const obj = parseObjective(lpConfig.objective);
        const k = 12;
        const pts = [];
        for (let x = xRange[0]; x <= xRange[1]; x += 1) {
          const y = (k - obj.coeffs.x * x) / (obj.coeffs.y || 1);
          if (isFinite(y)) pts.push({ x, y });
        }
        if (pts.length > 1) {
          const d = pts
            .map((p, j) => {
              const { sx, sy } = worldToSvg(p.x, p.y, w, h, xRange, yRange);
              return `${j === 0 ? 'M' : 'L'} ${sx} ${sy}`;
            })
            .join(' ');
          result.push({ d, color: PLOT_COLORS.magenta, dash: false, objective: true });
        }
      }
    }

    expressions
      .filter((e) => e.visible)
      .forEach((e) => {
        const pts = sampleFunction(e.expr, xRange[0], xRange[1]);
        if (pts.length > 1) {
          const d = pts
            .map((p, j) => {
              const { sx, sy } = worldToSvg(p.x, p.y, w, h, xRange, yRange);
              return `${j === 0 ? 'M' : 'L'} ${sx} ${sy}`;
            })
            .join(' ');
          result.push({ d, color: PLOT_COLORS[e.color] || PLOT_COLORS.teal });
        }
      });

    return result;
  }, [expressions, lpConfig, w, h]);

  const axisX = worldToSvg(0, 0, w, h, xRange, yRange).sy;
  const axisY = worldToSvg(0, 0, w, h, xRange, yRange).sx;
  const xTicks = buildTicks(xRange[0], xRange[1]);
  const yTicks = buildTicks(yRange[0], yRange[1]);
  const pad = 14;

  return (
    <Canvas ref={containerRef}>
      <Svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        {feasiblePolygon && (
          <polygon points={feasiblePolygon} fill="rgba(0, 106, 102, 0.12)" stroke="none" />
        )}
        <line x1={0} y1={axisX} x2={w} y2={axisX} stroke={AXIS_COLOR} strokeWidth="1.5" opacity="0.5" />
        <line x1={axisY} y1={0} x2={axisY} y2={h} stroke={AXIS_COLOR} strokeWidth="1.5" opacity="0.5" />
        {xTicks.map((v) => {
          const { sx, sy } = worldToSvg(v, 0, w, h, xRange, yRange);
          return (
            <g key={`x-${v}`}>
              <line x1={sx} y1={axisX - 4} x2={sx} y2={axisX + 4} stroke={AXIS_COLOR} strokeWidth="1" opacity="0.4" />
              <text x={sx} y={Math.min(h - 4, axisX + pad)} textAnchor="middle" {...LABEL_STYLE}>
                {v}
              </text>
            </g>
          );
        })}
        {yTicks.map((v) => {
          if (Math.abs(v) < 0.01) return null;
          const { sx, sy } = worldToSvg(0, v, w, h, xRange, yRange);
          return (
            <g key={`y-${v}`}>
              <line x1={axisY - 4} y1={sy} x2={axisY + 4} y2={sy} stroke={AXIS_COLOR} strokeWidth="1" opacity="0.4" />
              <text x={Math.max(4, axisY - pad)} y={sy + 4} textAnchor="end" {...LABEL_STYLE}>
                {v}
              </text>
            </g>
          );
        })}
        <text x={w - 8} y={Math.min(h - 6, axisX + pad)} textAnchor="end" {...LABEL_STYLE}>
          x
        </text>
        <text x={Math.max(8, axisY + pad)} y={12} textAnchor="start" {...LABEL_STYLE}>
          y
        </text>
        {paths.map((p, i) => {
          if (p.vertical !== undefined) {
            return (
              <line
                key={i}
                x1={p.vertical}
                y1={0}
                x2={p.vertical}
                y2={h}
                stroke={p.color}
                strokeWidth="2"
                strokeDasharray="6 4"
              />
            );
          }
          if (p.horizontal !== undefined) {
            return (
              <line
                key={i}
                x1={0}
                y1={p.horizontal}
                x2={w}
                y2={p.horizontal}
                stroke={p.color}
                strokeWidth="2"
                strokeDasharray="6 4"
              />
            );
          }
          return (
            <path
              key={i}
              d={p.d}
              fill="none"
              stroke={p.color}
              strokeWidth={p.objective ? 2.5 : 2}
              strokeDasharray={p.dash ? '8 4' : undefined}
              opacity={p.objective ? 0.7 : 1}
            />
          );
        })}
      </Svg>
    </Canvas>
  );
}
