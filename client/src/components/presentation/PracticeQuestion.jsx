import { useState } from 'react';
import styled from 'styled-components';
import MathText from './MathText';
import media from '../../styles/media';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surfaceContainerLowest};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const Title = styled.h4`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.typography.headlineSm.fontSize};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const PromptWrap = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.bodyLg.fontSize};
  line-height: 1.5;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
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
  min-height: 44px;

  &:hover {
    opacity: 0.9;
  }

  ${media.mobile} {
    flex: 1 1 100%;
    justify-content: center;
    display: flex;
    align-items: center;
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
  font-size: ${({ theme }) => theme.typography.bodyMd.fontSize};
  line-height: 1.5;
`;

export default function PracticeQuestion({ question, onShowSteps }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <Card>
      <Title>Practice Question</Title>
      <PromptWrap>
        <MathText as="p">{question.prompt}</MathText>
      </PromptWrap>
      <ButtonRow>
        <Button type="button" onClick={() => setRevealed(true)}>
          Reveal Answer
        </Button>
        {question.steps?.length > 0 && (
          <SecondaryBtn type="button" onClick={() => onShowSteps?.(question.steps)}>
            Show Steps in Solver
          </SecondaryBtn>
        )}
      </ButtonRow>
      {revealed && (
        <Answer>
          <MathText as="p">{question.answer}</MathText>
        </Answer>
      )}
    </Card>
  );
}
