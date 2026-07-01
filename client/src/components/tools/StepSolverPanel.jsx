import styled from 'styled-components';
import { CheckCircle } from 'lucide-react';
import { useTools } from '../../context/ToolsContext';
import media from '../../styles/media';

const Panel = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
  max-height: 100%;
  height: 100%;

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.typography.headlineSm.fontSize};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Timeline = styled.div`
  position: relative;
  padding-left: ${({ theme }) => theme.spacing.xl};

  ${media.mobile} {
    padding-left: ${({ theme }) => theme.spacing.lg};
  }
`;

const Line = styled.div`
  position: absolute;
  left: 11px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: repeating-linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.outline} 0,
    ${({ theme }) => theme.colors.outline} 4px,
    transparent 4px,
    transparent 8px
  );
`;

const Step = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Dot = styled.div`
  position: absolute;
  left: -${({ theme }) => theme.spacing.xl};
  top: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.secondaryContainer};
  color: ${({ theme }) => theme.colors.onSecondaryContainer};
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.mobile} {
    left: -${({ theme }) => theme.spacing.lg};
  }
`;

const StepTitle = styled.h4`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.bodyMd.fontSize};
`;

const StepDetail = styled.p`
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  font-size: ${({ theme }) => theme.typography.bodyMd.fontSize};
  line-height: 1.5;
`;

const Empty = styled.p`
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  font-style: italic;
  font-size: ${({ theme }) => theme.typography.bodyMd.fontSize};
  line-height: 1.5;
`;

export default function StepSolverPanel() {
  const { solverSteps } = useTools();

  return (
    <Panel>
      <Title>Step-by-Step Solver</Title>
      {solverSteps.length === 0 ? (
        <Empty>Open a practice question and click &quot;Show Steps in Solver&quot; to load worked steps here.</Empty>
      ) : (
        <Timeline>
          <Line />
          {solverSteps.map((step, i) => (
            <Step key={i}>
              <Dot>
                <CheckCircle size={14} />
              </Dot>
              <StepTitle>{step.title}</StepTitle>
              <StepDetail>{step.detail}</StepDetail>
            </Step>
          ))}
        </Timeline>
      )}
    </Panel>
  );
}
