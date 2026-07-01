import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import media from '../../styles/media';

const Wrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.marginMobile};
  padding-bottom: ${({ theme }) => theme.spacing.xl};

  ${media.tablet} {
    padding: ${({ theme }) => `${theme.spacing.marginTablet} ${theme.spacing.marginTablet} ${theme.spacing.xl}`};
  }

  ${media.desktop} {
    padding: ${({ theme }) => `${theme.spacing.marginDesktop} ${theme.spacing.marginDesktop} ${theme.spacing.xl}`};
  }
`;

export default function LearnLayout() {
  return (
    <Wrap>
      <Outlet />
    </Wrap>
  );
}
