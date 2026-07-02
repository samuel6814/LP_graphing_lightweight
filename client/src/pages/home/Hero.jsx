import { useRef } from 'react';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { ArrowRight } from 'lucide-react';
import { useHeroStagger } from '../../hooks/useGsapReveal';
import { ROUTES } from '../../utils/routes';
import { PageSection, ContentContainer } from '../../styles/layout';
import media from '../../styles/media';

const HeroSection = styled(PageSection)`
  padding-top: ${({ theme }) => theme.spacing.xl};
  min-height: 70vh;
  display: flex;
  align-items: center;

  ${media.mobile} {
    min-height: auto;
    padding-top: ${({ theme }) => theme.spacing.lg};
  }
`;

const Grid = styled(ContentContainer)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;

  ${media.tabletDown} {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const Copy = styled.div`
  ${media.mobile} {
    order: 2;
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
  font-size: ${({ theme }) => theme.typography.displayLg.fontSize};
  line-height: ${({ theme }) => theme.typography.displayLg.lineHeight};
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

  ${media.tabletDown} {
    max-width: 100%;
  }
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
  min-height: 44px;

  &:hover {
    opacity: 0.92;
  }
`;

const HeroVisual = styled.div`
  background: ${({ theme }) => theme.colors.surfaceContainerLow};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  min-height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  ${media.mobile} {
    order: 1;
    min-height: 220px;
    padding: ${({ theme }) => theme.spacing.md};
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(to right, ${({ theme }) => theme.colors.graphGrid} 1px, transparent 1px),
      linear-gradient(to bottom, ${({ theme }) => theme.colors.graphGrid} 1px, transparent 1px);
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
  const { colors } = useTheme();
  useHeroStagger(ref);

  return (
    <HeroSection ref={ref}>
      <Grid>
        <Copy>
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
        </Copy>
        <HeroVisual data-hero>
          <svg viewBox="0 0 400 280" fill="none">
            <line x1="0" y1="140" x2="400" y2="140" stroke={colors.graphAxis} strokeWidth="1.5" opacity="0.4" />
            <line x1="200" y1="0" x2="200" y2="280" stroke={colors.graphAxis} strokeWidth="1.5" opacity="0.4" />
            <path d="M 40 220 L 120 60 L 200 140 L 360 40" stroke={colors.plotTeal} strokeWidth="3" fill="none" />
            <path d="M 80 260 Q 200 20 320 200" stroke={colors.plotMagenta} strokeWidth="3" fill="none" />
            <polygon
              points="120,60 200,140 80,200"
              fill={colors.graphFeasibleFill}
              stroke={colors.plotTeal}
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />
          </svg>
        </HeroVisual>
      </Grid>
    </HeroSection>
  );
}
