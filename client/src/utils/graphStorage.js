const STORAGE_KEY = 'lp-grapher-graph-state';
const VERSION = 1;

export function loadGraphState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.v !== VERSION) return null;
    return data;
  } catch {
    return null;
  }
}

export function saveGraphState(state) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        v: VERSION,
        expressions: state.expressions,
        graphScale: state.graphScale,
        lpConfig: state.lpConfig,
      }),
    );
  } catch {
    /* quota or private mode */
  }
}
