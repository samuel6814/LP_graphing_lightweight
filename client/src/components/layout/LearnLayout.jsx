import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Wrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.marginDesktop};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.marginMobile};
  }
`;

export default function LearnLayout() {
  return (
    <Wrap>
      <Outlet />
    </Wrap>
  );
}
