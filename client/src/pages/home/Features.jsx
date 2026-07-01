import styled from 'styled-components';
import { LineChart, Calculator, Sparkles } from 'lucide-react';
import { useGsapReveal } from '../../hooks/useGsapReveal';

const Section = styled.section`
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.marginDesktop}`};
  background: ${({ theme }) => theme.colors.surfaceContainerLow};
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Heading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.typography.headlineMd.fontSize};
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surfaceContainerLowest};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const IconWrap = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.primaryFixed};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 20px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CardText = styled.p`
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  line-height: 1.6;
`;

const FEATURES = [
  {
    icon: LineChart,
    title: 'LP Graphing',
    text: 'Plot constraints, feasible regions, and isoprofit lines. Pre-loaded presets for every MATH 466 topic.',
  },
  {
    icon: Calculator,
    title: 'Scientific Calculator',
    text: 'Evaluate expressions with a full keypad — available on every learn page via the tools dock.',
  },
  {
    icon: Sparkles,
    title: 'Step-by-Step Solver',
    text: 'Worked solution paths for practice questions, mirroring the slide-based methods from class.',
  },
];

export default function Features() {
  const ref = useGsapReveal('[data-reveal]');

  return (
    <Section ref={ref}>
      <Inner>
        <Heading data-reveal>Everything you need to learn LP</Heading>
        <Grid>
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <Card key={title} data-reveal>
              <IconWrap>
                <Icon size={24} />
              </IconWrap>
              <CardTitle>{title}</CardTitle>
              <CardText>{text}</CardText>
            </Card>
          ))}
        </Grid>
      </Inner>
    </Section>
  );
}
