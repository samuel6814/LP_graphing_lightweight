import { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { loadProgress, markTopicComplete as markComplete } from '../utils/progress';

const TopicProgressContext = createContext(null);

export function TopicProgressProvider({ children }) {
  const [progress, setProgress] = useState(loadProgress);

  const markTopicComplete = useCallback((slug) => {
    const next = markComplete(slug);
    setProgress({ ...next });
  }, []);

  const isComplete = useCallback((slug) => Boolean(progress[slug]?.completed), [progress]);

  const value = useMemo(
    () => ({ progress, markTopicComplete, isComplete }),
    [progress, markTopicComplete, isComplete],
  );

  return (
    <TopicProgressContext.Provider value={value}>{children}</TopicProgressContext.Provider>
  );
}

export function useTopicProgress() {
  const ctx = useContext(TopicProgressContext);
  if (!ctx) throw new Error('useTopicProgress must be used within TopicProgressProvider');
  return ctx;
}
