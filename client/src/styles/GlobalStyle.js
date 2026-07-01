import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;600&family=Hanken+Grotesk:wght@400;600;700&family=Inter:wght@400;500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.typography.bodyMd.fontSize};
    line-height: ${({ theme }) => theme.typography.bodyMd.lineHeight};
    color: ${({ theme }) => theme.colors.onBackground};
    background: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
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
