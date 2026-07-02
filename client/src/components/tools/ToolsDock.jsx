import styled from 'styled-components';
import { LineChart, Calculator, Sparkles, X } from 'lucide-react';
import { useTools } from '../../context/ToolsContext';
import GraphingPanel from './GraphingPanel';
import CalculatorPanel from './CalculatorPanel';
import StepSolverPanel from './StepSolverPanel';
import media from '../../styles/media';

const Fab = styled.button`
  position: fixed;
  bottom: calc(${({ theme }) => theme.spacing.lg} + env(safe-area-inset-bottom, 0));
  right: ${({ theme }) => theme.spacing.lg};
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  box-shadow: ${({ theme }) => theme.shadows.popover};
  display: ${({ $hidden }) => ($hidden ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  z-index: 100;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  ${media.mobile} {
    bottom: calc(16px + env(safe-area-inset-bottom, 0));
    right: 16px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.overlay};
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
  z-index: ${({ $fullscreen }) => ($fullscreen ? 200 : 102)};
  display: flex;
  flex-direction: column;
  transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
  transition: transform 0.3s ease;
  box-shadow: ${({ theme }) => theme.shadows.popover};

  ${({ $fullscreen }) =>
    $fullscreen &&
    `
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    border-left: none;
    border-radius: 0;
    transform: none;
  `}

  ${media.tablet} {
    width: ${({ $fullscreen }) => ($fullscreen ? '100vw' : 'min(400px, 90vw)')};
  }

  ${media.mobile} {
    top: auto;
    left: 0;
    right: 0;
    height: ${({ $fullscreen }) => ($fullscreen ? '100vh' : 'min(75vh, 600px)')};
    width: 100vw;
    border-left: none;
    border-top: 1px solid ${({ theme }) => theme.colors.outlineVariant};
    border-radius: ${({ $fullscreen, theme }) =>
      $fullscreen ? '0' : `${theme.radii.xl} ${theme.radii.xl} 0 0`};
    transform: translateY(${({ $open, $fullscreen }) => ($fullscreen || $open ? '0' : '100%')});
    padding-bottom: env(safe-area-inset-bottom, 0);

    ${({ $fullscreen }) =>
      $fullscreen &&
      `
      top: 0;
      border-top: none;
    `}
  }
`;

const DockHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  flex-shrink: 0;
`;

const Tabs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Tab = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 44px;
  min-width: 44px;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 13px;
  font-weight: 600;
  background: ${({ $active, theme }) => ($active ? theme.colors.surfaceContainer : 'transparent')};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.onSurfaceVariant)};

  span {
    ${media.mobile} {
      display: none;
    }
  }
`;

const CloseBtn = styled.button`
  padding: ${({ theme }) => theme.spacing.sm};
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`;

const DockBody = styled.div`
  flex: 1;
  overflow: hidden;
  min-height: 0;
`;

const TABS = [
  { id: 'graph', label: 'Graph', icon: LineChart },
  { id: 'calc', label: 'Calc', icon: Calculator },
  { id: 'solver', label: 'Solver', icon: Sparkles },
];

export default function ToolsDock() {
  const { isOpen, setIsOpen, activeTab, setActiveTab, graphFullscreen } = useTools();
  const isGraphFullscreen = isOpen && activeTab === 'graph' && graphFullscreen;

  return (
    <>
      <Fab type="button" $hidden={isOpen} onClick={() => setIsOpen(true)} aria-label="Open math tools">
        <LineChart size={24} />
      </Fab>
      <Overlay $open={isOpen} onClick={() => setIsOpen(false)} />
      <Dock $open={isOpen} $fullscreen={isGraphFullscreen}>
        <DockHeader>
          <Tabs>
            {TABS.map(({ id, label, icon: Icon }) => (
              <Tab key={id} type="button" $active={activeTab === id} onClick={() => setActiveTab(id)}>
                <Icon size={18} />
                <span>{label}</span>
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
