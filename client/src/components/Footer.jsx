import styled from 'styled-components';
import { LineChart } from 'lucide-react';
import media from '../styles/media';

const FooterWrap = styled.footer`
  background: ${({ theme }) => theme.colors.inverseSurface};
  color: ${({ theme }) => theme.colors.inverseOnSurface};
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.marginMobile}`};
  margin-top: auto;

  ${media.tablet} {
    padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.marginTablet}`};
  }

  ${media.desktop} {
    padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.marginDesktop}`};
  }
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};

  ${media.tablet} {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 700;
  font-size: 18px;
`;

const Meta = styled.p`
  font-size: 14px;
  opacity: 0.8;
  max-width: 400px;
  line-height: 1.6;
  margin-top: 12px;
`;

const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: 14px;

  a {
    opacity: 0.85;
    min-height: 44px;
    display: flex;
    align-items: center;

    &:hover {
      opacity: 1;
    }
  }
`;

export default function Footer() {
  return (
    <FooterWrap>
      <Inner>
        <div>
          <Brand>
            <LineChart size={22} />
            LP Grapher
          </Brand>
          <Meta>
            Interactive learning for MATH 466 — Optimization II (Linear Programming), KNUST.
          </Meta>
        </div>
        <LinkGroup>
          <a href="https://github.com/samuel6814/LP_graphing_lightweight" target="_blank" rel="noreferrer">
            GitHub Repository
          </a>
          <a href="/learn">Course Topics</a>
        </LinkGroup>
      </Inner>
    </FooterWrap>
  );
}
