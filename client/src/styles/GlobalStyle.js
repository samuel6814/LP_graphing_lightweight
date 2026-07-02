import { createGlobalStyle } from 'styled-components';
import { devices } from './theme';

const GlobalStyle = createGlobalStyle`
  :root {
    --breakpoint-mobile-max: ${devices.mobile};
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    color-scheme: ${({ theme }) => theme.mode};
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.typography.bodyMd.fontSize};
    line-height: ${({ theme }) => theme.typography.bodyMd.lineHeight};
    color: ${({ theme }) => theme.colors.onBackground};
    background: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
    overflow-x: hidden;
    padding-bottom: env(safe-area-inset-bottom, 0);
  }

  body.nav-open {
    overflow: hidden;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.outlineVariant};
    border-radius: 10px;
  }
`;

export default GlobalStyle;
