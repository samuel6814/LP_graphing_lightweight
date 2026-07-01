import styled, { css } from 'styled-components';
import media from './media';

export const PageSection = styled.section`
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.marginMobile}`};

  ${media.tablet} {
    padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.marginTablet}`};
  }

  ${media.desktop} {
    padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.marginDesktop}`};
  }

  ${({ $compact }) =>
    $compact &&
    css`
      padding-top: ${({ theme }) => theme.spacing.lg};
      padding-bottom: ${({ theme }) => theme.spacing.lg};
    `}
`;

export const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

export const ResponsiveGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme, $gap }) => theme.spacing[$gap || 'lg']};

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.desktop} {
    grid-template-columns: repeat(${({ $cols }) => $cols || 3}, 1fr);
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, ${({ $min }) => $min || '280px'}), 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;
