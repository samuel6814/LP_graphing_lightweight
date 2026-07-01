import styled from 'styled-components';
import { LineChart, Calculator, Sparkles, X } from 'lucide-react';
import { useTools } from '../../context/ToolsContext';
import GraphingPanel from './GraphingPanel';
import CalculatorPanel from './CalculatorPanel';
import StepSolverPanel from './StepSolverPanel';

const Fab = styled.button`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  box-shadow: ${({ theme }) => theme.shadows.popover};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    bottom: 80px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(13, 28, 46, 0.4);
  z-index: 101;
  display: ${({ $open }) => ($open ? 'block' : 'none')};
`;

const Dock = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: min(480px, 100vw);
  background: ${({ theme }) => theme.colors.surface};
  border-left: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  z-index: 102;
  display: flex;
  flex-direction: column;
  transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
  transition: transform 0.3s ease;
  box-shadow: ${({ theme }) => theme.shadows.popover};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    top: auto;
    height: 75vh;
    width: 100vw;
    border-radius: ${({ theme }) => theme.radii.xl} ${({ theme }) => theme.radii.xl} 0 0;
    transform: translateY(${({ $open }) => ($open ? '0' : '100%')});
  }
`;

const DockHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.outlineVariant};
`;

const Tabs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Tab = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 13px;
  font-weight: 600;
  background: ${({ $active, theme }) => ($active ? theme.colors.surfaceContainer : 'transparent')};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.onSurfaceVariant)};
`;

const CloseBtn = styled.button`
  padding: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`;

const DockBody = styled.div`
  flex: 1;
  overflow: hidden;
`;

const TABS = [
  { id: 'graph', label: 'Graph', icon: LineChart },
  { id: 'calc', label: 'Calc', icon: Calculator },
  { id: 'solver', label: 'Solver', icon: Sparkles },
];

export default function ToolsDock() {
  const { isOpen, setIsOpen, activeTab, setActiveTab } = useTools();

  return (
    <>
      <Fab type="button" onClick={() => setIsOpen(true)} aria-label="Open math tools">
        <LineChart size={24} />
      </Fab>
      <Overlay $open={isOpen} onClick={() => setIsOpen(false)} />
      <Dock $open={isOpen}>
        <DockHeader>
          <Tabs>
            {TABS.map(({ id, label, icon: Icon }) => (
              <Tab key={id} type="button" $active={activeTab === id} onClick={() => setActiveTab(id)}>
                <Icon size={16} />
                {label}
              </Tab>
            ))}
          </Tabs>
          <CloseBtn type="button" onClick={() => setIsOpen(false)} aria-label="Close tools">
            <X size={20} />
          </CloseBtn>
        </DockHeader>
        <DockBody>
          {activeTab === 'graph' && <GraphingPanel />}
          {activeTab === 'calc' && <CalculatorPanel />}
          {activeTab === 'solver' && <StepSolverPanel />}
        </DockBody>
      </Dock>
    </>
  );
}
