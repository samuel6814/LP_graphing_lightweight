import styled from 'styled-components';
import { Plus, Eye, EyeOff, X, Maximize2, Minimize2 } from 'lucide-react';
import { useTools } from '../../context/ToolsContext';
import { getPlotColor, plotLabel, resolvePlotType } from '../../utils/plotSampler';
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

const ListCompact = styled(List)`
  max-height: ${({ $compact }) => ($compact ? '120px' : '220px')};

  ${media.mobile} {
    max-height: ${({ $compact }) => ($compact ? '80px' : '140px')};
  }
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

const COLORS = {
  teal: '#006a66',
  magenta: '#d81b60',
  indigo: '#182442',
  amber: '#e65100',
};

function placeholderForMode(mode, expr) {
  const resolved = mode === 'auto' ? resolvePlotType(expr) : mode;
  return resolved === 'implicit' ? 'x^2 + y^2 = 9' : 'x^2 + 2*x';
}

export default function GraphingPanel() {
  const { expressions, setExpressions, lpConfig, graphFullscreen, setGraphFullscreen } = useTools();

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

  return (
    <Panel>
      <Header>
        <Title>Graphing Tool</Title>
        <HeaderActions>
          <IconBtn
            type="button"
            onClick={() => setGraphFullscreen((v) => !v)}
            aria-label={graphFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {graphFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </IconBtn>
          <AddBtn type="button" onClick={addExpr}>
            <Plus size={18} /> Add
          </AddBtn>
        </HeaderActions>
      </Header>
      {(lpConfig || expressions.length > 0) && (
        <ListCompact $compact={graphFullscreen}>
          {lpConfig && (
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
              </CardBody>
            </Card>
          )}
          {expressions.map((e, i) => (
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
        </ListCompact>
      )}
      <GraphArea>
        <GraphCanvas expressions={expressions} lpConfig={lpConfig} />
      </GraphArea>
    </Panel>
  );
}
