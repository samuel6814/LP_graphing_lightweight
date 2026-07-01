import { useMemo } from 'react';
import styled from 'styled-components';
import { sampleFunction, lineFromConstraint, parseObjective, worldToSvg } from '../../utils/graphHelpers';

const Canvas = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 280px;
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

export default function GraphCanvas({ expressions = [], lpConfig = null, width = 600, height = 400 }) {
  const xRange = [-1, 10];
  const yRange = [-2, 12];

  const paths = useMemo(() => {
    const result = [];

    if (lpConfig?.constraints) {
      lpConfig.constraints.forEach((c, i) => {
        const line = lineFromConstraint(c, xRange);
        if (line?.type === 'line' && line.points.length > 1) {
          const d = line.points
            .map((p, j) => {
              const { sx, sy } = worldToSvg(p.x, p.y, width, height, xRange, yRange);
              return `${j === 0 ? 'M' : 'L'} ${sx} ${sy}`;
            })
            .join(' ');
          result.push({ d, color: i % 2 === 0 ? PLOT_COLORS.teal : PLOT_COLORS.magenta, dash: true });
        }
        if (line?.type === 'vertical') {
          const { sx } = worldToSvg(line.x, 0, width, height, xRange, yRange);
          result.push({ vertical: sx, color: PLOT_COLORS.indigo });
        }
        if (line?.type === 'horizontal') {
          const { sy } = worldToSvg(0, line.y, width, height, xRange, yRange);
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
              const { sx, sy } = worldToSvg(p.x, p.y, width, height, xRange, yRange);
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
              const { sx, sy } = worldToSvg(p.x, p.y, width, height, xRange, yRange);
              return `${j === 0 ? 'M' : 'L'} ${sx} ${sy}`;
            })
            .join(' ');
          result.push({ d, color: PLOT_COLORS[e.color] || PLOT_COLORS.teal });
        }
      });

    return result;
  }, [expressions, lpConfig, width, height]);

  const axisX = worldToSvg(0, 0, width, height, xRange, yRange).sy;
  const axisY = worldToSvg(0, 0, width, height, xRange, yRange).sx;

  return (
    <Canvas>
      <Svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <line x1={0} y1={axisX} x2={width} y2={axisX} stroke="#45464e" strokeWidth="1.5" opacity="0.5" />
        <line x1={axisY} y1={0} x2={axisY} y2={height} stroke="#45464e" strokeWidth="1.5" opacity="0.5" />
        {paths.map((p, i) => {
          if (p.vertical !== undefined) {
            return <line key={i} x1={p.vertical} y1={0} x2={p.vertical} y2={height} stroke={p.color} strokeWidth="2" strokeDasharray="6 4" />;
          }
          if (p.horizontal !== undefined) {
            return <line key={i} x1={0} y1={p.horizontal} x2={width} y2={p.horizontal} stroke={p.color} strokeWidth="2" strokeDasharray="6 4" />;
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
