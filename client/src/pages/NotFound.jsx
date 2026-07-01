import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES } from '../utils/routes';

const Wrap = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Code = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 72px;
  color: ${({ theme }) => theme.colors.primary};
`;

const LinkBtn = styled(Link)`
  margin-top: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

export default function NotFound() {
  return (
    <Wrap>
      <Code>404</Code>
      <p>Page not found.</p>
      <LinkBtn to={ROUTES.home}>Return home</LinkBtn>
    </Wrap>
  );
}
