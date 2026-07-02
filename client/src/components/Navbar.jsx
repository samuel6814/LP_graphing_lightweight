import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LineChart, Menu, X } from 'lucide-react';
import { ROUTES } from '../utils/routes';
import ThemeToggle from './ThemeToggle';
import media from '../styles/media';

gsap.registerPlugin(ScrollTrigger);

const NavWrap = styled.div`
  position: fixed;
  top: calc(${({ theme }) => theme.spacing.md} + env(safe-area-inset-top, 0));
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.spacing.md};
  pointer-events: none;

  ${media.mobile} {
    padding: 0 ${({ theme }) => theme.spacing.sm};
  }
`;

const Nav = styled.header`
  position: relative;
  pointer-events: auto;
  width: min(1100px, 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.glassBg};
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  box-shadow: ${({ theme }) => theme.colors.glassShadow};

  ${media.mobile} {
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    gap: ${({ theme }) => theme.spacing.md};
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: ${({ theme }) => theme.colors.glassHighlight};
    pointer-events: none;
  }
`;

const NavInner = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: ${({ theme }) => theme.spacing.lg};
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
  background: ${({ theme }) => theme.colors.overlay};
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
  const navRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle('nav-open', menuOpen);
    return () => document.body.classList.remove('nav-open');
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;

    const trigger = ScrollTrigger.create({
      start: 'top -40',
      onUpdate: (self) => {
        gsap.to(el, {
          scale: self.direction === 1 ? 0.98 : 1,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <>
      <NavWrap>
        <Nav ref={navRef}>
          <NavInner>
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
            <ThemeToggle />
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
        </NavInner>
        </Nav>
      </NavWrap>

      <Overlay $open={menuOpen} onClick={() => setMenuOpen(false)} />
      <MobileDrawer $open={menuOpen} aria-hidden={!menuOpen}>
        <MobileNavLink to={ROUTES.home} $active={pathname === ROUTES.home}>
          Home
        </MobileNavLink>
        <MobileNavLink to={ROUTES.learn} $active={pathname.startsWith(ROUTES.learn)}>
          Learn
        </MobileNavLink>
        <ThemeToggle />
        <MobileCta to={ROUTES.learn} onClick={() => setMenuOpen(false)}>
          Start Learning
        </MobileCta>
      </MobileDrawer>
    </>
  );
}
