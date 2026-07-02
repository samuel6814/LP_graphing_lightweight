import { useRef, useMemo } from 'react';
import styled from 'styled-components';
import { Plus, Eye, EyeOff, X, Maximize2, Minimize2, Download, Layers } from 'lucide-react';
import { useTools } from '../../context/ToolsContext';
import { getPlotColor, plotLabel, resolvePlotType, isLpConstraint } from '../../utils/plotSampler';
import { solveGraphicalLP, formatLpResult } from '../../utils/lpSolver';
import { exportGraphSvg, exportGraphPng } from '../../utils/exportGraph';
import GraphCanvas from './GraphCanvas';
import media from '../../styles/media';

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  flex-shrink: 0;
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.typography.headlineSm.fontSize};
  color: ${({ theme }) => theme.colors.primary};
`;

const List = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  max-height: 220px;
  overflow-y: auto;
  flex-shrink: 0;

  ${media.mobile} {
    max-height: 140px;
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const Card = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.surfaceContainerLow};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
`;

const Strip = styled.div`
  width: 6px;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
`;

const CardBody = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  min-width: 0;

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
  flex-wrap: wrap;
`;

const CardLabel = styled.span`
  font-family: monospace;
  font-weight: 700;
  font-size: 13px;
`;

const CardActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};

  button {
    min-width: 32px;
    min-height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ExprInput = styled.input`
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.equation};
  font-size: ${({ theme }) => theme.typography.equation.fontSize};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  outline: none;
  margin-bottom: 8px;
`;

const ModeSelect = styled.select`
  font-size: 12px;
  padding: 4px 8px;
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  min-height: 32px;
`;

const GraphArea = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  min-height: 200px;
  display: flex;
  flex-direction: column;

  ${media.mobile} {
    min-height: 180px;
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const IconBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.md};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceContainer};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const AddBtn = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.labelCaps.fontSize};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: ${({ theme }) => theme.spacing.sm};
  min-height: 44px;
`;

const LpModeBtn = styled(AddBtn)`
  ${({ $active, theme }) =>
    $active &&
    `
    background: ${theme.colors.primaryContainer};
    border-radius: ${theme.radii.md};
  `}
`;

const ListCompact = styled(List)`
  max-height: ${({ $compact }) => ($compact ? '120px' : '220px')};

  ${media.mobile} {
    max-height: ${({ $compact }) => ($compact ? '80px' : '140px')};
  }
`;

const ScaleSection = styled.div`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  flex-shrink: 0;
`;

const ScaleTitle = styled.div`
  font-weight: 600;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ScaleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: end;

  ${media.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ScaleField = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`;

const ScaleInput = styled.input`
  padding: 6px 8px;
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 14px;
  min-height: 36px;
  width: 100%;
`;

const ResetScaleBtn = styled.button`
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.sm};
  min-height: 36px;
  white-space: nowrap;
`;

const LpTitle = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
  font-size: 14px;
`;

const LpLine = styled.div`
  font-family: monospace;
  font-size: 14px;
  word-break: break-all;
`;

const LpStatus = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.primaryContainer};
  border-radius: ${({ theme }) => theme.radii.md};
`;

const ConstraintRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 6px;
`;

const ConstraintInput = styled(ExprInput)`
  margin-bottom: 0;
  padding: 4px 0;
`;

const ObjectiveLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  margin-top: 8px;
  margin-bottom: 4px;
`;

const COLORS = {
  teal: '#006a66',
  magenta: '#d81b60',
  indigo: '#182442',
  amber: '#e65100',
};

function placeholderForMode(mode, expr) {
  const resolved = mode === 'auto' ? resolvePlotType(expr) : mode;
  if (resolved === 'constraint') return '2*x + 3*y <= 12';
  return resolved === 'implicit' ? 'x^2 + y^2 = 9' : 'x^2 + 2*x';
}

export default function GraphingPanel() {
  const canvasRef = useRef(null);
  const {
    expressions,
    setExpressions,
    lpConfig,
    enterLpMode,
    clearLpMode,
    addLpConstraint,
    appendLpConstraint,
    updateLpConstraint,
    removeLpConstraint,
    setLpObjective,
    graphFullscreen,
    setGraphFullscreen,
    graphScale,
    setGraphScale,
    resetGraphScale,
  } = useTools();

  const isUserLp = lpConfig?.source === 'user';
  const hasGraphContent = Boolean(lpConfig) || expressions.some((e) => e.expr?.trim());

  const lpStatus = useMemo(() => {
    if (!lpConfig?.constraints?.length || !lpConfig.objective) return '';
    const solution = solveGraphicalLP(
      lpConfig.constraints,
      lpConfig.objective,
      [graphScale.xMin, graphScale.xMax],
      [graphScale.yMin, graphScale.yMax],
    );
    return formatLpResult(solution);
  }, [lpConfig, graphScale]);

  const updateScale = (key, raw) => {
    const num = parseFloat(raw);
    if (!Number.isFinite(num)) return;
    setGraphScale({ [key]: num });
  };

  const validateScale = () => {
    const { xMin, xMax, yMin, yMax, step } = graphScale;
    const patch = {};
    if (xMin >= xMax) patch.xMax = xMin + 1;
    if (yMin >= yMax) patch.yMax = yMin + 1;
    if (!step || step < 0.1) patch.step = 1;
    if (Object.keys(patch).length) setGraphScale(patch);
  };

  const handleExprBlur = (id, expr) => {
    const trimmed = expr?.trim();
    if (!isLpConstraint(trimmed)) return;
    setExpressions((prev) => prev.filter((e) => e.id !== id));
    appendLpConstraint(trimmed);
  };

  const updateExpr = (id, patch) => {
    setExpressions((prev) =>
      prev.map((e) => {
        if (e.id !== id) return e;
        const next = { ...e, ...patch };
        const idx = prev.findIndex((x) => x.id === id);
        if (patch.expr !== undefined || patch.mode !== undefined) {
          next.label = plotLabel(next.expr, idx, next.mode);
        }
        return next;
      }),
    );
  };

  const toggleVisible = (id) => {
    setExpressions((prev) => prev.map((e) => (e.id === id ? { ...e, visible: !e.visible } : e)));
  };

  const removeExpr = (id) => {
    setExpressions((prev) => prev.filter((e) => e.id !== id));
  };

  const addExpr = () => {
    const n = expressions.length;
    setExpressions((prev) => [
      ...prev,
      {
        id: `e${Date.now()}`,
        label: plotLabel('x^2', n, 'auto'),
        expr: 'x^2',
        color: getPlotColor(n),
        visible: true,
        mode: 'auto',
      },
    ]);
  };

  const toggleLpMode = () => {
    if (lpConfig && isUserLp) {
      clearLpMode();
    } else {
      enterLpMode();
    }
  };

  const handleExportSvg = () => {
    const svg = canvasRef.current?.getSvgElement();
    exportGraphSvg(svg, 'lp-graph.svg');
  };

  const handleExportPng = () => {
    const svg = canvasRef.current?.getSvgElement();
    const { width, height } = canvasRef.current?.getDimensions() ?? {};
    exportGraphPng(svg, width, height, 'lp-graph.png');
  };

  return (
    <Panel>
      <Header>
        <Title>Graphing Tool</Title>
        <HeaderActions>
          <IconBtn
            type="button"
            onClick={handleExportSvg}
            disabled={!hasGraphContent}
            aria-label="Export SVG"
            title="Export SVG"
          >
            <Download size={18} />
          </IconBtn>
          <IconBtn
            type="button"
            onClick={handleExportPng}
            disabled={!hasGraphContent}
            aria-label="Export PNG"
            title="Export PNG"
          >
            <span style={{ fontSize: 11, fontWeight: 700 }}>PNG</span>
          </IconBtn>
          <IconBtn
            type="button"
            onClick={() => setGraphFullscreen((v) => !v)}
            aria-label={graphFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {graphFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </IconBtn>
          <LpModeBtn type="button" onClick={toggleLpMode} $active={isUserLp} title="LP mode">
            <Layers size={18} /> LP
          </LpModeBtn>
          {!lpConfig && (
            <AddBtn type="button" onClick={addExpr}>
              <Plus size={18} /> Add
            </AddBtn>
          )}
          {isUserLp && (
            <AddBtn type="button" onClick={addLpConstraint}>
              <Plus size={18} /> Constraint
            </AddBtn>
          )}
        </HeaderActions>
      </Header>
      <ScaleSection>
        <ScaleTitle>Scale</ScaleTitle>
        <ScaleGrid>
          <ScaleField>
            X min
            <ScaleInput
              type="number"
              step="any"
              value={graphScale.xMin}
              onChange={(e) => updateScale('xMin', e.target.value)}
              onBlur={validateScale}
            />
          </ScaleField>
          <ScaleField>
            X max
            <ScaleInput
              type="number"
              step="any"
              value={graphScale.xMax}
              onChange={(e) => updateScale('xMax', e.target.value)}
              onBlur={validateScale}
            />
          </ScaleField>
          <ScaleField>
            Y min
            <ScaleInput
              type="number"
              step="any"
              value={graphScale.yMin}
              onChange={(e) => updateScale('yMin', e.target.value)}
              onBlur={validateScale}
            />
          </ScaleField>
          <ScaleField>
            Y max
            <ScaleInput
              type="number"
              step="any"
              value={graphScale.yMax}
              onChange={(e) => updateScale('yMax', e.target.value)}
              onBlur={validateScale}
            />
          </ScaleField>
          <ScaleField>
            Step
            <ScaleInput
              type="number"
              step="0.1"
              min="0.1"
              value={graphScale.step}
              onChange={(e) => updateScale('step', e.target.value)}
              onBlur={validateScale}
            />
          </ScaleField>
          <ScaleField>
            &nbsp;
            <ResetScaleBtn type="button" onClick={resetGraphScale}>
              Reset
            </ResetScaleBtn>
          </ScaleField>
        </ScaleGrid>
      </ScaleSection>
      {(lpConfig || expressions.length > 0) && (
        <ListCompact $compact={graphFullscreen}>
          {lpConfig && isUserLp && (
            <Card>
              <Strip $color={COLORS.teal} />
              <CardBody>
                <CardHeader>
                  <LpTitle>LP Mode</LpTitle>
                  <CardActions>
                    <button type="button" onClick={clearLpMode} aria-label="Exit LP mode">
                      <X size={16} />
                    </button>
                  </CardActions>
                </CardHeader>
                {lpConfig.constraints.map((c, i) => (
                  <ConstraintRow key={i}>
                    <ConstraintInput
                      value={c}
                      placeholder="2*x + 3*y <= 12"
                      onChange={(e) => updateLpConstraint(i, e.target.value)}
                    />
                    <button type="button" onClick={() => removeLpConstraint(i)} aria-label="Remove constraint">
                      <X size={16} />
                    </button>
                  </ConstraintRow>
                ))}
                <ObjectiveLabel>Objective</ObjectiveLabel>
                <ConstraintInput
                  value={lpConfig.objective || ''}
                  placeholder="Maximize 3*x + 2*y"
                  onChange={(e) => setLpObjective(e.target.value)}
                />
                {lpStatus && <LpStatus>{lpStatus}</LpStatus>}
              </CardBody>
            </Card>
          )}
          {lpConfig && !isUserLp && (
            <Card>
              <Strip $color={COLORS.teal} />
              <CardBody>
                <LpTitle>LP Constraints</LpTitle>
                {lpConfig.constraints.map((c, i) => (
                  <LpLine key={i}>{c}</LpLine>
                ))}
                {lpConfig.objective && (
                  <LpLine style={{ marginTop: 8, color: COLORS.magenta }}>{lpConfig.objective}</LpLine>
                )}
                {lpStatus && <LpStatus>{lpStatus}</LpStatus>}
              </CardBody>
            </Card>
          )}
          {!lpConfig &&
            expressions.map((e, i) => (
              <Card key={e.id}>
                <Strip $color={COLORS[e.color] || COLORS.teal} />
                <CardBody>
                  <CardHeader>
                    <CardLabel style={{ color: COLORS[e.color] || COLORS.teal }}>
                      {e.label || plotLabel(e.expr, i, e.mode)}
                    </CardLabel>
                    <CardActions>
                      <button type="button" onClick={() => toggleVisible(e.id)} aria-label="Toggle visibility">
                        {e.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                      <button type="button" onClick={() => removeExpr(e.id)} aria-label="Remove">
                        <X size={16} />
                      </button>
                    </CardActions>
                  </CardHeader>
                  <ExprInput
                    value={e.expr}
                    placeholder={placeholderForMode(e.mode || 'auto', e.expr)}
                    onChange={(ev) => updateExpr(e.id, { expr: ev.target.value })}
                    onBlur={(ev) => handleExprBlur(e.id, ev.target.value)}
                  />
                  <ModeSelect
                    value={e.mode || 'auto'}
                    onChange={(ev) => updateExpr(e.id, { mode: ev.target.value })}
                    aria-label="Plot mode"
                  >
                    <option value="auto">Auto</option>
                    <option value="explicit">y = f(x)</option>
                    <option value="implicit">F(x,y) = 0</option>
                  </ModeSelect>
                </CardBody>
              </Card>
            ))}
          {lpConfig &&
            isUserLp &&
            expressions.map((e, i) => (
              <Card key={e.id}>
                <Strip $color={COLORS[e.color] || COLORS.teal} />
                <CardBody>
                  <CardHeader>
                    <CardLabel style={{ color: COLORS[e.color] || COLORS.teal }}>
                      {e.label || plotLabel(e.expr, i, e.mode)}
                    </CardLabel>
                    <CardActions>
                      <button type="button" onClick={() => toggleVisible(e.id)} aria-label="Toggle visibility">
                        {e.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                      <button type="button" onClick={() => removeExpr(e.id)} aria-label="Remove">
                        <X size={16} />
                      </button>
                    </CardActions>
                  </CardHeader>
                  <ExprInput
                    value={e.expr}
                    placeholder={placeholderForMode(e.mode || 'auto', e.expr)}
                    onChange={(ev) => updateExpr(e.id, { expr: ev.target.value })}
                    onBlur={(ev) => handleExprBlur(e.id, ev.target.value)}
                  />
                </CardBody>
              </Card>
            ))}
        </ListCompact>
      )}
      <GraphArea>
        <GraphCanvas ref={canvasRef} expressions={expressions} lpConfig={lpConfig} />
      </GraphArea>
    </Panel>
  );
}
