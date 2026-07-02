import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import 'katex/dist/katex.min.css';
import './styles/katex-overrides.css';
import { ThemeModeProvider, useThemeMode } from './context/ThemeModeContext';
import { ToolsProvider } from './context/ToolsContext';
import { TopicProgressProvider } from './context/TopicProgressContext';
import HomeLayout from './pages/home/HomeLayout';
import LandingPage from './pages/home/LandingPage';
import AppShell from './components/layout/AppShell';
import LearnLayout from './components/layout/LearnLayout';
import LearnHub from './pages/learn/LearnHub';
import TopicPage from './pages/learn/TopicPage';
import NotFound from './pages/NotFound';

function ThemedApp() {
  const { theme } = useThemeMode();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <ToolsProvider>
          <TopicProgressProvider>
            <Routes>
              <Route element={<HomeLayout />}>
                <Route index element={<LandingPage />} />
              </Route>
              <Route element={<AppShell />}>
                <Route path="learn" element={<LearnLayout />}>
                  <Route index element={<LearnHub />} />
                  <Route path=":topicSlug" element={<TopicPage />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TopicProgressProvider>
        </ToolsProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <ThemeModeProvider>
      <ThemedApp />
    </ThemeModeProvider>
  );
}
