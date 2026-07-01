import styled from 'styled-components';
import { Plus, Eye, EyeOff, X } from 'lucide-react';
import { useTools } from '../../context/ToolsContext';
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
  max-height: 200px;
  overflow-y: auto;
  flex-shrink: 0;

  ${media.mobile} {
    max-height: 120px;
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

const ExprInput = styled.input`
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.equation};
  font-size: ${({ theme }) => theme.typography.equation.fontSize};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  outline: none;
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

const COLORS = { teal: '#006a66', magenta: '#d81b60' };

export default function GraphingPanel() {
  const { expressions, setExpressions, lpConfig } = useTools();

  const updateExpr = (id, expr) => {
    setExpressions((prev) => prev.map((e) => (e.id === id ? { ...e, expr } : e)));
  };

  const toggleVisible = (id) => {
    setExpressions((prev) => prev.map((e) => (e.id === id ? { ...e, visible: !e.visible } : e)));
  };

  const removeExpr = (id) => {
    setExpressions((prev) => prev.filter((e) => e.id !== id));
  };

  const addExpr = () => {
    const n = expressions.length + 1;
    setExpressions((prev) => [
      ...prev,
      { id: `e${Date.now()}`, label: `f${n}(x)`, expr: 'x^2', color: n % 2 ? 'teal' : 'magenta', visible: true },
    ]);
  };

  return (
    <Panel>
      <Header>
        <Title>Graphing Tool</Title>
        <AddBtn type="button" onClick={addExpr}>
          <Plus size={18} /> Add
        </AddBtn>
      </Header>
      {!lpConfig && expressions.length > 0 && (
        <List>
          {expressions.map((e) => (
            <Card key={e.id}>
              <Strip $color={COLORS[e.color] || COLORS.teal} />
              <CardBody>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, gap: 8 }}>
                  <span style={{ fontFamily: 'monospace', color: COLORS[e.color], fontWeight: 700 }}>{e.label}</span>
                  <CardActions>
                    <button type="button" onClick={() => toggleVisible(e.id)} aria-label="Toggle visibility">
                      {e.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                    <button type="button" onClick={() => removeExpr(e.id)} aria-label="Remove">
                      <X size={16} />
                    </button>
                  </CardActions>
                </div>
                <ExprInput value={e.expr} onChange={(ev) => updateExpr(e.id, ev.target.value)} />
              </CardBody>
            </Card>
          ))}
        </List>
      )}
      {lpConfig && (
        <List>
          <Card>
            <Strip $color={COLORS.teal} />
            <CardBody>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>LP Constraints</div>
              {lpConfig.constraints.map((c, i) => (
                <div key={i} style={{ fontFamily: 'monospace', fontSize: 14, wordBreak: 'break-all' }}>{c}</div>
              ))}
              {lpConfig.objective && (
                <div style={{ marginTop: 8, fontFamily: 'monospace', color: COLORS.magenta }}>
                  {lpConfig.objective}
                </div>
              )}
            </CardBody>
          </Card>
        </List>
      )}
      <GraphArea>
        <GraphCanvas expressions={expressions} lpConfig={lpConfig} />
      </GraphArea>
    </Panel>
  );
}
