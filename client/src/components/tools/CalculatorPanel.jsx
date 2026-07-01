import styled from 'styled-components';
import { useTools } from '../../context/ToolsContext';
import { evaluateCalc } from '../../utils/graphHelpers';

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.md};
`;

const Display = styled.div`
  background: ${({ theme }) => theme.colors.surfaceContainerLowest};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: right;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const ExprLine = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  min-height: 20px;
`;

const ResultLine = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 32px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

const Keypad = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
`;

const Key = styled.button`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 16px;
  background: ${({ $op, theme }) => ($op ? theme.colors.surfaceContainerHigh : theme.colors.surfaceContainerLow)};
  color: ${({ $op, theme }) => ($op ? theme.colors.primary : theme.colors.onSurface)};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  transition: transform 0.1s;

  &:active {
    transform: scale(0.95);
  }

  &.wide {
    grid-column: span 2;
  }

  &.equals {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onPrimary};
  }
`;

const KEYS = [
  ['C', '(', ')', '/'],
  ['7', '8', '9', '*'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', 'pi', '='],
];

const OPS = new Set(['+', '-', '*', '/', '(', ')']);

export default function CalculatorPanel() {
  const { calcDisplay, setCalcDisplay, calcExpr, setCalcExpr } = useTools();

  const handleKey = (key) => {
    if (key === 'C') {
      setCalcExpr('');
      setCalcDisplay('0');
      return;
    }
    if (key === '=') {
      const result = evaluateCalc(calcExpr);
      setCalcDisplay(result);
      return;
    }
    if (key === 'pi') {
      setCalcExpr((e) => e + 'pi');
      return;
    }
    setCalcExpr((e) => e + key);
    if (!OPS.has(key)) {
      setCalcDisplay(key === '.' ? '0.' : key);
    }
  };

  return (
    <Panel>
      <Display>
        <ExprLine>{calcExpr}</ExprLine>
        <ResultLine>{calcDisplay}</ResultLine>
      </Display>
      <Keypad>
        {KEYS.flat().map((key) => (
          <Key
            key={key}
            type="button"
            $op={OPS.has(key)}
            className={key === '0' ? 'wide' : key === '=' ? 'equals' : ''}
            onClick={() => handleKey(key)}
          >
            {key}
          </Key>
        ))}
      </Keypad>
    </Panel>
  );
}
