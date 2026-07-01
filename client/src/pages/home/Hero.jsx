import { useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowRight, BookOpen, LineChart, Sparkles } from 'lucide-react';
import { useHeroStagger } from '../../hooks/useGsapReveal';
import { ROUTES } from '../../utils/routes';

const Section = styled.section`
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.marginDesktop}`};
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.marginMobile}`};
  }
`;

const HeroSection = styled(Section)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;
  min-height: 70vh;
  padding-top: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const Badge = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.secondaryContainer};
  color: ${({ theme }) => theme.colors.onSecondaryContainer};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.typography.labelCaps.fontSize};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(32px, 5vw, 48px);
  line-height: 1.15;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.bodyLg.fontSize};
  line-height: ${({ theme }) => theme.typography.bodyLg.lineHeight};
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  max-width: 520px;
`;

const CtaRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const PrimaryCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 600;

  &:hover {
    opacity: 0.92;
  }
`;

const HeroVisual = styled.div`
  background: ${({ theme }) => theme.colors.surfaceContainerLow};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(to right, rgba(117, 119, 126, 0.08) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(117, 119, 126, 0.08) 1px, transparent 1px);
    background-size: 32px 32px;
  }

  svg {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 400px;
    height: auto;
  }
`;

export default function Hero() {
  const ref = useRef(null);
  useHeroStagger(ref);

  return (
    <HeroSection ref={ref}>
      <div>
        <Badge data-hero>MATH 466 · Optimization II</Badge>
        <Title data-hero>Master Linear Programming with Interactive Tools</Title>
        <Subtitle data-hero>
          LP Grapher combines course explainers, practice questions, and always-available graphing,
          calculator, and step-by-step solver tools — built from the KNUST MATH 466 curriculum.
        </Subtitle>
        <CtaRow data-hero>
          <PrimaryCta to={ROUTES.learn}>
            Explore Topics <ArrowRight size={18} />
          </PrimaryCta>
        </CtaRow>
      </div>
      <HeroVisual data-hero>
        <svg viewBox="0 0 400 280" fill="none">
          <line x1="0" y1="140" x2="400" y2="140" stroke="#45464e" strokeWidth="1.5" opacity="0.4" />
          <line x1="200" y1="0" x2="200" y2="280" stroke="#45464e" strokeWidth="1.5" opacity="0.4" />
          <path d="M 40 220 L 120 60 L 200 140 L 360 40" stroke="#006a66" strokeWidth="3" fill="none" />
          <path d="M 80 260 Q 200 20 320 200" stroke="#d81b60" strokeWidth="3" fill="none" />
          <polygon points="120,60 200,140 80,200" fill="rgba(0,106,102,0.12)" stroke="#006a66" strokeWidth="1.5" strokeDasharray="6 4" />
        </svg>
      </HeroVisual>
    </HeroSection>
  );
}
