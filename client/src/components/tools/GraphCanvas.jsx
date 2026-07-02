import { useMemo } from 'react';
import styled from 'styled-components';
import { lineFromConstraint, parseObjective, worldToSvg } from '../../utils/graphHelpers';
import { feasibleRegionPolygon } from '../../utils/feasibleRegion';
import { samplePlot } from '../../utils/plotSampler';
import { buildAxisTicks, pixelsPerUnit } from '../../utils/axisTicks';
import { useTools } from '../../context/ToolsContext';
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
  background-size: ${({ $gridX, $gridY }) => `${$gridX}px ${$gridY}px`};
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
  amber: '#e65100',
};

const AXIS_COLOR = '#45464e';
const LABEL_STYLE = { fontSize: 11, fill: AXIS_COLOR, fontFamily: 'system-ui, sans-serif' };
const MINOR_LABEL_STYLE = { fontSize: 9, fill: AXIS_COLOR, fontFamily: 'system-ui, sans-serif', opacity: 0.75 };

function pointsToPath(points, w, h, xRange, yRange) {
  return points
    .map((p, j) => {
      const { sx, sy } = worldToSvg(p.x, p.y, w, h, xRange, yRange);
      return `${j === 0 ? 'M' : 'L'} ${sx} ${sy}`;
    })
    .join(' ');
}

function renderXTicks(ticks, axisY, w, h, xRange, yRange, pad, hideZeroLabel) {
  return ticks.map((tick) => {
    const { sx } = worldToSvg(tick.value, 0, w, h, xRange, yRange);
    const isMajor = tick.type === 'major';
    const hideLabel = hideZeroLabel && Math.abs(tick.value) < 0.01;
    return (
      <g key={`x-${tick.value}-${tick.type}`}>
        <line
          x1={sx}
          y1={axisY - (isMajor ? 5 : 3)}
          x2={sx}
          y2={axisY + (isMajor ? 5 : 3)}
          stroke={AXIS_COLOR}
          strokeWidth="1"
          opacity={isMajor ? 0.5 : 0.25}
        />
        {!hideLabel && tick.label && (
          <text
            x={sx}
            y={Math.min(h - 4, axisY + pad)}
            textAnchor="middle"
            {...(isMajor ? LABEL_STYLE : MINOR_LABEL_STYLE)}
          >
            {tick.label}
          </text>
        )}
      </g>
    );
  });
}

function renderYTicks(ticks, axisX, w, h, xRange, yRange, pad, hideZeroLabel) {
  return ticks.map((tick) => {
    const { sy } = worldToSvg(0, tick.value, w, h, xRange, yRange);
    const isMajor = tick.type === 'major';
    const hideLabel = hideZeroLabel && Math.abs(tick.value) < 0.01;
    return (
      <g key={`y-${tick.value}-${tick.type}`}>
        <line
          x1={axisX - (isMajor ? 5 : 3)}
          y1={sy}
          x2={axisX + (isMajor ? 5 : 3)}
          y2={sy}
          stroke={AXIS_COLOR}
          strokeWidth="1"
          opacity={isMajor ? 0.5 : 0.25}
        />
        {!hideLabel && tick.label && (
          <text
            x={Math.max(4, axisX - pad)}
            y={sy + 4}
            textAnchor="end"
            {...(isMajor ? LABEL_STYLE : MINOR_LABEL_STYLE)}
          >
            {tick.label}
          </text>
        )}
      </g>
    );
  });
}

export default function GraphCanvas({ expressions = [], lpConfig = null }) {
  const { graphScale } = useTools();
  const [containerRef, { width, height }] = useResizeObserver();

  const xRange = [graphScale.xMin, graphScale.xMax];
  const yRange = [graphScale.yMin, graphScale.yMax];
  const majorStep = graphScale.step || 1;

  const w = width || 600;
  const h = height || 400;

  const pxPerX = pixelsPerUnit(graphScale.xMin, graphScale.xMax, w);
  const pxPerY = pixelsPerUnit(graphScale.yMin, graphScale.yMax, h);
  const gridX = Math.max(8, pxPerX * majorStep);
  const gridY = Math.max(8, pxPerY * majorStep);

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
  }, [lpConfig, w, h, graphScale]);

  const paths = useMemo(() => {
    const result = [];

    if (lpConfig?.constraints) {
      lpConfig.constraints.forEach((c, i) => {
        const line = lineFromConstraint(c, xRange);
        if (line?.type === 'line' && line.points.length > 1) {
          result.push({
            d: pointsToPath(line.points, w, h, xRange, yRange),
            color: i % 2 === 0 ? PLOT_COLORS.teal : PLOT_COLORS.magenta,
            dash: true,
          });
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
        const k = graphScale.yMax;
        const pts = [];
        for (let x = xRange[0]; x <= xRange[1]; x += 1) {
          const y = (k - obj.coeffs.x * x) / (obj.coeffs.y || 1);
          if (isFinite(y)) pts.push({ x, y });
        }
        if (pts.length > 1) {
          result.push({
            d: pointsToPath(pts, w, h, xRange, yRange),
            color: PLOT_COLORS.magenta,
            dash: false,
            objective: true,
          });
        }
      }
    }

    expressions
      .filter((e) => e.visible && e.expr?.trim())
      .forEach((e) => {
        try {
          const { segments } = samplePlot(e.expr, xRange, yRange, e.mode || 'auto');
          const color = PLOT_COLORS[e.color] || PLOT_COLORS.teal;
          segments.forEach((seg) => {
            if (seg.points.length > 1) {
              result.push({
                d: pointsToPath(seg.points, w, h, xRange, yRange),
                color,
              });
            }
          });
        } catch {
          /* skip invalid expression */
        }
      });

    return result;
  }, [expressions, lpConfig, w, h, graphScale]);

  const axisX = worldToSvg(0, 0, w, h, xRange, yRange).sy;
  const axisY = worldToSvg(0, 0, w, h, xRange, yRange).sx;
  const pad = 14;

  const xAxisTicks = useMemo(() => {
    const { major, minor } = buildAxisTicks(graphScale.xMin, graphScale.xMax, majorStep, 0.1, pxPerX);
    return [
      ...minor.map((t) => ({ ...t, type: 'minor' })),
      ...major.map((t) => ({ ...t, type: 'major' })),
    ];
  }, [graphScale, majorStep, pxPerX]);

  const yAxisTicks = useMemo(() => {
    const { major, minor } = buildAxisTicks(graphScale.yMin, graphScale.yMax, majorStep, 0.1, pxPerY);
    return [
      ...minor.map((t) => ({ ...t, type: 'minor' })),
      ...major.map((t) => ({ ...t, type: 'major' })),
    ];
  }, [graphScale, majorStep, pxPerY]);

  const originVisible =
    graphScale.xMin <= 0 &&
    graphScale.xMax >= 0 &&
    graphScale.yMin <= 0 &&
    graphScale.yMax >= 0;

  return (
    <Canvas ref={containerRef} $gridX={gridX} $gridY={gridY}>
      <Svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        {feasiblePolygon && (
          <polygon points={feasiblePolygon} fill="rgba(0, 106, 102, 0.12)" stroke="none" />
        )}
        <line x1={0} y1={axisX} x2={w} y2={axisX} stroke={AXIS_COLOR} strokeWidth="1.5" opacity="0.5" />
        <line x1={axisY} y1={0} x2={axisY} y2={h} stroke={AXIS_COLOR} strokeWidth="1.5" opacity="0.5" />
        {renderXTicks(xAxisTicks, axisX, w, h, xRange, yRange, pad, originVisible)}
        {renderYTicks(yAxisTicks, axisY, w, h, xRange, yRange, pad, originVisible)}
        {originVisible && (
          <text x={Math.max(8, axisY + pad)} y={Math.min(h - 4, axisX + pad)} textAnchor="start" {...LABEL_STYLE}>
            0
          </text>
        )}
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
