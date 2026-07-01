import styled from 'styled-components';
import { useGsapReveal } from '../../hooks/useGsapReveal';

const Section = styled.section`
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.marginDesktop}`};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
`;

const Inner = styled.div`
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
`;

const Heading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.typography.headlineMd.fontSize};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Steps = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const Step = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Num = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondaryContainer};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StepTitle = styled.h3`
  font-size: 18px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StepText = styled.p`
  font-size: 14px;
  opacity: 0.85;
  line-height: 1.6;
`;

const STEPS = [
  { n: '01', title: 'Pick a Topic', text: 'Browse 21 modules from introduction through simplex, duality, and applications.' },
  { n: '02', title: 'Read & Practice', text: 'Study KaTeX explainers and attempt practice questions with instant feedback.' },
  { n: '03', title: 'Graph & Solve', text: 'Use the tools dock on any learn page to graph, calculate, and view worked steps.' },
];

export default function HowItWorks() {
  const ref = useGsapReveal('[data-reveal]');

  return (
    <Section ref={ref}>
      <Inner>
        <Heading data-reveal>How it works</Heading>
        <Steps>
          {STEPS.map((s) => (
            <Step key={s.n} data-reveal>
              <Num>{s.n}</Num>
              <StepTitle>{s.title}</StepTitle>
              <StepText>{s.text}</StepText>
            </Step>
          ))}
        </Steps>
      </Inner>
    </Section>
  );
}
