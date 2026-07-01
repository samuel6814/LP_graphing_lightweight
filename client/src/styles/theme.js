export const colors = {
  surface: '#f8f9ff',
  surfaceDim: '#ccdbf3',
  surfaceBright: '#f8f9ff',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#eff4ff',
  surfaceContainer: '#e6eeff',
  surfaceContainerHigh: '#dce9ff',
  surfaceContainerHighest: '#d5e3fc',
  onSurface: '#0d1c2e',
  onSurfaceVariant: '#45464e',
  inverseSurface: '#233144',
  inverseOnSurface: '#eaf1ff',
  outline: '#75777e',
  outlineVariant: '#c6c6ce',
  surfaceTint: '#525e7f',
  primary: '#182442',
  onPrimary: '#ffffff',
  primaryContainer: '#2e3a59',
  onPrimaryContainer: '#98a4c9',
  inversePrimary: '#bac6ec',
  secondary: '#006a66',
  onSecondary: '#ffffff',
  secondaryContainer: '#6df4ec',
  onSecondaryContainer: '#006f6a',
  tertiary: '#52001e',
  onTertiary: '#ffffff',
  tertiaryContainer: '#7a0031',
  onTertiaryContainer: '#ff7b99',
  error: '#ba1a1a',
  onError: '#ffffff',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',
  primaryFixed: '#dae2ff',
  primaryFixedDim: '#bac6ec',
  onPrimaryFixed: '#0d1a38',
  onPrimaryFixedVariant: '#3a4666',
  secondaryFixed: '#70f7ef',
  secondaryFixedDim: '#4edad3',
  onSecondaryFixed: '#00201e',
  onSecondaryFixedVariant: '#00504c',
  tertiaryFixed: '#ffd9de',
  tertiaryFixedDim: '#ffb2bf',
  onTertiaryFixed: '#3f0016',
  onTertiaryFixedVariant: '#90003b',
  background: '#f8f9ff',
  onBackground: '#0d1c2e',
  surfaceVariant: '#d5e3fc',
  plotTeal: '#006a66',
  plotMagenta: '#d81b60',
  plotIndigo: '#182442',
};

export const fonts = {
  display: '"Hanken Grotesk", system-ui, sans-serif',
  body: '"Inter", system-ui, sans-serif',
  mono: '"Geist", "SF Mono", monospace',
  equation: '"Source Serif 4", Georgia, serif',
};

export const typography = {
  displayLg: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    lineHeight: '1.15',
    fontWeight: 700,
    letterSpacing: '-0.02em',
  },
  headlineMd: {
    fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
    lineHeight: '1.25',
    fontWeight: 600,
  },
  headlineSm: {
    fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
    lineHeight: '1.3',
    fontWeight: 600,
  },
  bodyLg: { fontSize: '18px', lineHeight: '28px', fontWeight: 400 },
  bodyMd: { fontSize: '16px', lineHeight: '24px', fontWeight: 400 },
  equation: { fontSize: 'clamp(1rem, 2.5vw, 1.375rem)', lineHeight: '1.45', fontWeight: 400 },
  labelCaps: { fontSize: '12px', lineHeight: '16px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' },
  mono: { fontSize: '14px', lineHeight: '20px', fontWeight: 400 },
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '40px',
  gutter: '16px',
  marginMobile: '16px',
  marginTablet: '24px',
  marginDesktop: '32px',
};

export const radii = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px',
};

export const shadows = {
  popover: '0px 4px 12px rgba(24, 36, 66, 0.08)',
  card: '0 1px 3px rgba(24, 36, 66, 0.06)',
};

export const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};

export const devices = {
  mobile: '767px',
  tabletMin: '768px',
  tabletMax: '1023px',
  desktop: '1024px',
};

const theme = { colors, fonts, typography, spacing, radii, shadows, breakpoints, devices };
export default theme;
