import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { LineChart } from 'lucide-react';
import { ROUTES } from '../utils/routes';

const Nav = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.marginDesktop}`};
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  backdrop-filter: blur(8px);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 700;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Links = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const NavLink = styled(Link)`
  font-size: ${({ theme }) => theme.typography.bodyMd.fontSize};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.onSurfaceVariant)};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Cta = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.typography.labelCaps.fontSize};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-weight: 600;

  &:hover {
    opacity: 0.9;
  }
`;

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <Nav>
      <Logo to={ROUTES.home}>
        <LineChart size={28} strokeWidth={2.5} />
        LP Grapher
      </Logo>
      <Links>
        <NavLink to={ROUTES.home} $active={pathname === ROUTES.home}>
          Home
        </NavLink>
        <NavLink to={ROUTES.learn} $active={pathname.startsWith(ROUTES.learn)}>
          Learn
        </NavLink>
        <Cta to={ROUTES.learn}>Start Learning</Cta>
      </Links>
    </Nav>
  );
}
