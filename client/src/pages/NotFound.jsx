import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES } from '../utils/routes';
import { PageSection } from '../styles/layout';

const Wrap = styled(PageSection)`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Code = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(3rem, 12vw, 4.5rem);
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1;
`;

const Message = styled.p`
  font-size: ${({ theme }) => theme.typography.bodyLg.fontSize};
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const LinkBtn = styled(Link)`
  margin-top: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
`;

export default function NotFound() {
  return (
    <Wrap $compact>
      <Code>404</Code>
      <Message>Page not found.</Message>
      <LinkBtn to={ROUTES.home}>Return home</LinkBtn>
    </Wrap>
  );
}
