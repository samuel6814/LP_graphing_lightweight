import styled from 'styled-components';
import { useGsapReveal } from '../../hooks/useGsapReveal';
import { PageSection, ContentContainer } from '../../styles/layout';
import media from '../../styles/media';

const Section = styled(PageSection)`
  background: ${({ theme }) => theme.colors.surfaceContainerLow};
`;

const Inner = styled(ContentContainer)`
  max-width: 1200px;
`;

const Heading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.typography.headlineMd.fontSize};
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Bento = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  min-height: 520px;

  ${media.tabletDown} {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    min-height: unset;
  }
`;

const Card = styled.article`
  position: relative;
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  min-height: ${({ $minHeight }) => $minHeight || '220px'};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  ${({ $spanRows }) =>
    $spanRows &&
    `
    grid-row: span 2;
  `}

  ${media.tabletDown} {
    grid-row: auto;
    min-height: 240px;
  }

  &:hover {
    transform: scale(1.01);
    box-shadow: ${({ theme }) => theme.shadows.popover};
  }
`;

const CardImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(13, 28, 46, 0.15) 0%,
    rgba(13, 28, 46, 0.55) 45%,
    rgba(13, 28, 46, 0.88) 100%
  );
`;

const CardBody = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing.lg};
  color: #ffffff;
`;

const Num = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 14px;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StepTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.typography.headlineSm.fontSize};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StepText = styled.p`
  font-size: ${({ theme }) => theme.typography.bodyMd.fontSize};
  line-height: 1.6;
  opacity: 0.92;
  max-width: 42ch;
`;

const STEPS = [
  {
    n: '01',
    title: 'Pick a Topic',
    text: 'Browse 21 modules from introduction through simplex, duality, and applications.',
    image:
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=900&q=80&auto=format&fit=crop',
    imageAlt: 'Open textbook and study notes on a desk',
    spanRows: true,
    minHeight: '100%',
  },
  {
    n: '02',
    title: 'Read & Practice',
    text: 'Study KaTeX explainers and attempt practice questions with instant feedback.',
    image:
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=900&q=80&auto=format&fit=crop',
    imageAlt: 'Mathematical equations written on a chalkboard',
    spanRows: false,
  },
  {
    n: '03',
    title: 'Graph & Solve',
    text: 'Use the tools dock on any learn page to graph, calculate, and view worked steps.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop',
    imageAlt: 'Analytics dashboard with charts and data visualization',
    spanRows: false,
  },
];

export default function HowItWorks() {
  const ref = useGsapReveal('[data-reveal]');

  return (
    <Section ref={ref}>
      <Inner>
        <Heading data-reveal>How it works</Heading>
        <Bento>
          {STEPS.map((s) => (
            <Card key={s.n} data-reveal $spanRows={s.spanRows} $minHeight={s.minHeight}>
              <CardImage src={s.image} alt={s.imageAlt} loading="lazy" decoding="async" />
              <CardOverlay aria-hidden="true" />
              <CardBody>
                <Num>{s.n}</Num>
                <StepTitle>{s.title}</StepTitle>
                <StepText>{s.text}</StepText>
              </CardBody>
            </Card>
          ))}
        </Bento>
      </Inner>
    </Section>
  );
}
