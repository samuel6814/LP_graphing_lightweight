import styled from 'styled-components';
import { LineChart } from 'lucide-react';

const FooterWrap = styled.footer`
  background: ${({ theme }) => theme.colors.inverseSurface};
  color: ${({ theme }) => theme.colors.inverseOnSurface};
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.marginDesktop}`};
  margin-top: auto;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
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
`;

const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: 14px;

  a {
    opacity: 0.85;
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
          <Meta style={{ marginTop: 12 }}>
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
