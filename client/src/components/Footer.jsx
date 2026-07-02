import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LineChart } from 'lucide-react';
import FooterWordmark from './FooterWordmark';
import { ROUTES } from '../utils/routes';
import media from '../styles/media';

const FooterWrap = styled.footer`
  background: ${({ theme }) => theme.colors.inverseSurface};
  color: ${({ theme }) => theme.colors.inverseOnSurface};
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.marginMobile} 0`};
  margin-top: auto;

  ${media.tablet} {
    padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.marginTablet} 0`};
  }

  ${media.desktop} {
    padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.marginDesktop} 0`};
  }
`;

const TopSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};

  ${media.tablet} {
    grid-template-columns: 1.4fr 1fr 1fr 1fr;
  }
`;

const BrandCol = styled.div`
  grid-column: 1 / -1;

  ${media.tablet} {
    grid-column: auto;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 700;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.inverseOnSurface};
`;

const Copyright = styled.p`
  font-size: 13px;
  opacity: 0.6;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const Tagline = styled.p`
  font-size: 14px;
  opacity: 0.8;
  line-height: 1.6;
  margin-top: ${({ theme }) => theme.spacing.sm};
  max-width: 280px;
`;

const LinkCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ColHeading = styled.h3`
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  opacity: 0.55;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const FooterLink = styled(Link)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.inverseOnSurface};
  opacity: 0.85;
  min-height: 36px;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.inversePrimary};
  }
`;

const ExternalLink = styled.a`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.inverseOnSurface};
  opacity: 0.85;
  min-height: 36px;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.inversePrimary};
  }
`;

const StaticText = styled.span`
  font-size: 14px;
  opacity: 0.7;
  line-height: 1.5;
`;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <FooterWrap>
      <TopSection>
        <BrandCol>
          <Brand>
            <LineChart size={22} />
            LP Grapher
          </Brand>
          <Copyright>© {year} LP Grapher</Copyright>
          <Tagline>MATH 466 — Optimization II (Linear Programming), KNUST.</Tagline>
        </BrandCol>

        <LinkCol>
          <ColHeading>Learn</ColHeading>
          <FooterLink to={ROUTES.learn}>Course Topics</FooterLink>
          <FooterLink to={ROUTES.learn}>Learn Hub</FooterLink>
        </LinkCol>

        <LinkCol>
          <ColHeading>Platform</ColHeading>
          <FooterLink to={ROUTES.home}>Home</FooterLink>
          <FooterLink to="/#features">Features</FooterLink>
        </LinkCol>

        <LinkCol>
          <ColHeading>Resources</ColHeading>
          <ExternalLink
            href="https://github.com/samuel6814/LP_graphing_lightweight"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Repository
          </ExternalLink>
          <StaticText>MATH 466 · KNUST</StaticText>
        </LinkCol>
      </TopSection>

      <FooterWordmark />
    </FooterWrap>
  );
}
