import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { LineChart, Menu, X } from 'lucide-react';
import { ROUTES } from '../utils/routes';
import media from '../styles/media';

const Nav = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.marginMobile}`};
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  backdrop-filter: blur(8px);

  ${media.tablet} {
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.marginTablet}`};
  }

  ${media.desktop} {
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.marginDesktop}`};
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
  z-index: 52;
`;

const LogoText = styled.span`
  ${media.mobile} {
    @media (max-width: 400px) {
      display: none;
    }
  }
`;

const DesktopLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  ${media.tabletDown} {
    display: none;
  }
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
  white-space: nowrap;

  &:hover {
    opacity: 0.9;
  }
`;

const MenuBtn = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  color: ${({ theme }) => theme.colors.primary};
  z-index: 52;

  ${media.tabletDown} {
    display: flex;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(13, 28, 46, 0.45);
  z-index: 50;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 0.25s ease;
`;

const MobileDrawer = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  width: min(300px, 85vw);
  height: 100%;
  background: ${({ theme }) => theme.colors.surface};
  z-index: 51;
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.lg}`};
  padding-top: calc(${({ theme }) => theme.spacing.xl} + env(safe-area-inset-top, 0));
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.popover};
  transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
  transition: transform 0.3s ease;

  ${media.desktop} {
    display: none;
  }
`;

const MobileNavLink = styled(Link)`
  font-size: 18px;
  font-weight: 600;
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.onSurface)};
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  min-height: 44px;
  display: flex;
  align-items: center;
`;

const MobileCta = styled(Cta)`
  margin-top: ${({ theme }) => theme.spacing.md};
  text-align: center;
  justify-content: center;
  display: flex;
`;

export default function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('nav-open', menuOpen);
    return () => document.body.classList.remove('nav-open');
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <Nav>
        <Logo to={ROUTES.home}>
          <LineChart size={28} strokeWidth={2.5} />
          <LogoText>LP Grapher</LogoText>
        </Logo>

        <DesktopLinks>
          <NavLink to={ROUTES.home} $active={pathname === ROUTES.home}>
            Home
          </NavLink>
          <NavLink to={ROUTES.learn} $active={pathname.startsWith(ROUTES.learn)}>
            Learn
          </NavLink>
          <Cta to={ROUTES.learn}>Start Learning</Cta>
        </DesktopLinks>

        <MenuBtn
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </MenuBtn>
      </Nav>

      <Overlay $open={menuOpen} onClick={() => setMenuOpen(false)} />
      <MobileDrawer $open={menuOpen} aria-hidden={!menuOpen}>
        <MobileNavLink to={ROUTES.home} $active={pathname === ROUTES.home}>
          Home
        </MobileNavLink>
        <MobileNavLink to={ROUTES.learn} $active={pathname.startsWith(ROUTES.learn)}>
          Learn
        </MobileNavLink>
        <MobileCta to={ROUTES.learn} onClick={() => setMenuOpen(false)}>
          Start Learning
        </MobileCta>
      </MobileDrawer>
    </>
  );
}
