const STORAGE_KEY = 'lp-grapher-progress';

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function markTopicComplete(slug) {
  const progress = loadProgress();
  progress[slug] = { completed: true, completedAt: Date.now() };
  saveProgress(progress);
  return progress;
}

export function isTopicComplete(slug) {
  return Boolean(loadProgress()[slug]?.completed);
}
