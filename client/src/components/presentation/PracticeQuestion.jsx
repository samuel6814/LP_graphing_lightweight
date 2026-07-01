import { useState } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surfaceContainerLowest};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h4`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.typography.headlineSm.fontSize};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Prompt = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.bodyLg.fontSize};
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.typography.labelCaps.fontSize};
  letter-spacing: ${({ theme }) => theme.typography.labelCaps.letterSpacing};
  text-transform: uppercase;
  font-weight: 600;
  margin-right: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  &:hover {
    opacity: 0.9;
  }
`;

const SecondaryBtn = styled(Button)`
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
`;

const Answer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surfaceContainer};
  border-radius: ${({ theme }) => theme.radii.md};
`;

export default function PracticeQuestion({ question, onShowSteps }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <Card>
      <Title>Practice Question</Title>
      <Prompt>{question.prompt}</Prompt>
      <div>
        <Button type="button" onClick={() => setRevealed(true)}>
          Reveal Answer
        </Button>
        {question.steps?.length > 0 && (
          <SecondaryBtn type="button" onClick={() => onShowSteps?.(question.steps)}>
            Show Steps in Solver
          </SecondaryBtn>
        )}
      </div>
      {revealed && (
        <Answer>
          <p>{question.answer}</p>
        </Answer>
      )}
    </Card>
  );
}
