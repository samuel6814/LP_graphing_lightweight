import { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { getPlotColor, plotLabel } from '../utils/plotSampler';
import { DEFAULT_GRAPH_SCALE } from '../utils/axisTicks';

const ToolsContext = createContext(null);

const DEFAULT_EXPRESSIONS = [
  { id: 'f1', label: 'f1(x)', expr: 'sin(x)', color: 'teal', visible: true, mode: 'auto' },
];

export function ToolsProvider({ children }) {
  const [isOpen, setIsOpenState] = useState(false);
  const [activeTab, setActiveTabState] = useState('graph');
  const [graphFullscreen, setGraphFullscreen] = useState(false);
  const [graphScale, setGraphScaleState] = useState(DEFAULT_GRAPH_SCALE);
  const [expressions, setExpressions] = useState(DEFAULT_EXPRESSIONS);
  const [lpConfig, setLpConfig] = useState(null);
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcExpr, setCalcExpr] = useState('');
  const [solverSteps, setSolverSteps] = useState([]);

  const setIsOpen = useCallback((open) => {
    setIsOpenState(open);
    if (!open) setGraphFullscreen(false);
  }, []);

  const setActiveTab = useCallback((tab) => {
    setActiveTabState(tab);
    if (tab !== 'graph') setGraphFullscreen(false);
  }, []);

  const setGraphScale = useCallback((patch) => {
    setGraphScaleState((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetGraphScale = useCallback(() => {
    setGraphScaleState(DEFAULT_GRAPH_SCALE);
  }, []);

  const loadTopicGraph = useCallback((defaultGraph) => {
    if (!defaultGraph) return;
    if (defaultGraph.type === 'lp') {
      setLpConfig({
        constraints: defaultGraph.constraints || [],
        objective: defaultGraph.objective || '',
      });
      setExpressions([]);
    } else if (defaultGraph.expressions) {
      setLpConfig(null);
      setExpressions(
        defaultGraph.expressions.map((expr, i) => ({
          id: `e${i}`,
          label: plotLabel(expr, i, 'auto'),
          expr,
          color: getPlotColor(i),
          visible: true,
          mode: 'auto',
        })),
      );
    }
  }, []);

  const loadSolverSteps = useCallback((steps) => {
    setSolverSteps(steps || []);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      activeTab,
      setActiveTab,
      graphFullscreen,
      setGraphFullscreen,
      graphScale,
      setGraphScale,
      resetGraphScale,
      expressions,
      setExpressions,
      lpConfig,
      setLpConfig,
      calcDisplay,
      setCalcDisplay,
      calcExpr,
      setCalcExpr,
      solverSteps,
      setSolverSteps,
      loadTopicGraph,
      loadSolverSteps,
    }),
    [
      isOpen,
      setIsOpen,
      activeTab,
      setActiveTab,
      graphFullscreen,
      graphScale,
      expressions,
      lpConfig,
      calcDisplay,
      calcExpr,
      solverSteps,
      loadTopicGraph,
      loadSolverSteps,
      setGraphScale,
      resetGraphScale,
    ],
  );

  return <ToolsContext.Provider value={value}>{children}</ToolsContext.Provider>;
}

export function useTools() {
  const ctx = useContext(ToolsContext);
  if (!ctx) throw new Error('useTools must be used within ToolsProvider');
  return ctx;
}
