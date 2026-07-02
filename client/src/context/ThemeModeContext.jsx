import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { buildTheme } from '../styles/theme';

const STORAGE_KEY = 'lp-grapher-theme';
const PREFERENCES = ['system', 'light', 'dark'];

const ThemeModeContext = createContext(null);

function readStoredPreference() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (PREFERENCES.includes(stored)) return stored;
  } catch {
    /* private mode */
  }
  return 'system';
}

function getSystemMode() {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function upsertThemeColor(content) {
  let el = document.querySelector('meta[name="theme-color"]');
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', 'theme-color');
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function ThemeModeProvider({ children }) {
  const [preference, setPreferenceState] = useState(readStoredPreference);
  const [systemMode, setSystemMode] = useState(getSystemMode);

  const resolvedMode = useMemo(() => {
    if (preference === 'light' || preference === 'dark') return preference;
    return systemMode;
  }, [preference, systemMode]);

  const theme = useMemo(() => buildTheme(resolvedMode), [resolvedMode]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => setSystemMode(mq.matches ? 'dark' : 'light');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    upsertThemeColor(theme.colors.themeColorMeta);
  }, [theme.colors.themeColorMeta]);

  const setPreference = useCallback((next) => {
    setPreferenceState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const cyclePreference = useCallback(() => {
    const i = PREFERENCES.indexOf(preference);
    const next = PREFERENCES[(i + 1) % PREFERENCES.length];
    setPreference(next);
  }, [preference, setPreference]);

  const value = useMemo(
    () => ({
      preference,
      resolvedMode,
      theme,
      setPreference,
      cyclePreference,
    }),
    [preference, resolvedMode, theme, setPreference, cyclePreference],
  );

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
}

export function useThemeMode() {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error('useThemeMode must be used within ThemeModeProvider');
  return ctx;
}
