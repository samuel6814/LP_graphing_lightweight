import styled from 'styled-components';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useThemeMode } from '../context/ThemeModeContext';

const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.md};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceContainer};
  }
`;

const LABELS = {
  system: { icon: Monitor, aria: 'Theme: system. Click for light mode.', title: 'System theme (click for light)' },
  light: { icon: Sun, aria: 'Theme: light. Click for dark mode.', title: 'Light theme (click for dark)' },
  dark: { icon: Moon, aria: 'Theme: dark. Click for system theme.', title: 'Dark theme (click for system)' },
};

export default function ThemeToggle() {
  const { preference, cyclePreference } = useThemeMode();
  const { icon: Icon, aria, title } = LABELS[preference] || LABELS.system;

  return (
    <Btn type="button" onClick={cyclePreference} aria-label={aria} title={title}>
      <Icon size={20} />
    </Btn>
  );
}
