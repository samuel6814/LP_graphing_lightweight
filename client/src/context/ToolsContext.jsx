import { createContext, useContext, useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { getPlotColor, plotLabel } from '../utils/plotSampler';
import { DEFAULT_GRAPH_SCALE } from '../utils/axisTicks';
import { loadGraphState, saveGraphState } from '../utils/graphStorage';

const ToolsContext = createContext(null);

const DEFAULT_EXPRESSIONS = [
  { id: 'f1', label: 'f1(x)', expr: 'sin(x)', color: 'teal', visible: true, mode: 'auto' },
];

const DEFAULT_LP = {
  constraints: ['x>=0', 'y>=0'],
  objective: 'Maximize x + y',
  source: 'user',
};

function hydrateState() {
  const saved = loadGraphState();
  if (!saved) {
    return {
      expressions: DEFAULT_EXPRESSIONS,
      graphScale: DEFAULT_GRAPH_SCALE,
      lpConfig: null,
    };
  }
  return {
    expressions: saved.expressions?.length ? saved.expressions : DEFAULT_EXPRESSIONS,
    graphScale: { ...DEFAULT_GRAPH_SCALE, ...saved.graphScale },
    lpConfig: saved.lpConfig ?? null,
  };
}

export function ToolsProvider({ children }) {
  const hydrated = useRef(hydrateState());
  const [isOpen, setIsOpenState] = useState(false);
  const [activeTab, setActiveTabState] = useState('graph');
  const [graphFullscreen, setGraphFullscreen] = useState(false);
  const [graphScale, setGraphScaleState] = useState(hydrated.current.graphScale);
  const [expressions, setExpressions] = useState(hydrated.current.expressions);
  const [lpConfig, setLpConfigState] = useState(hydrated.current.lpConfig);
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcExpr, setCalcExpr] = useState('');
  const [solverSteps, setSolverSteps] = useState([]);

  const setLpConfig = useCallback((config) => {
    setLpConfigState(config);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      saveGraphState({ expressions, graphScale, lpConfig });
    }, 300);
    return () => clearTimeout(timer);
  }, [expressions, graphScale, lpConfig]);

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

  const enterLpMode = useCallback(() => {
    setLpConfigState({ ...DEFAULT_LP, constraints: [...DEFAULT_LP.constraints] });
    setExpressions([]);
  }, []);

  const clearLpMode = useCallback(() => {
    setLpConfigState(null);
  }, []);

  const appendLpConstraint = useCallback((text) => {
    setLpConfigState((prev) => {
      if (!prev) {
        return {
          constraints: ['x>=0', 'y>=0', text],
          objective: 'Maximize x + y',
          source: 'user',
        };
      }
      return { ...prev, source: 'user', constraints: [...prev.constraints, text] };
    });
  }, []);

  const addLpConstraint = useCallback(() => {
    setLpConfigState((prev) => {
      if (!prev) return { ...DEFAULT_LP, constraints: ['x>=0', 'y>=0', 'x+y<=10'] };
      return {
        ...prev,
        source: 'user',
        constraints: [...prev.constraints, 'x+y<=10'],
      };
    });
  }, []);

  const updateLpConstraint = useCallback((index, text) => {
    setLpConfigState((prev) => {
      if (!prev) return prev;
      const constraints = [...prev.constraints];
      constraints[index] = text;
      return { ...prev, source: 'user', constraints };
    });
  }, []);

  const removeLpConstraint = useCallback((index) => {
    setLpConfigState((prev) => {
      if (!prev) return prev;
      const constraints = prev.constraints.filter((_, i) => i !== index);
      return { ...prev, source: 'user', constraints };
    });
  }, []);

  const setLpObjective = useCallback((objective) => {
    setLpConfigState((prev) => {
      if (!prev) return { ...DEFAULT_LP, objective };
      return { ...prev, source: 'user', objective };
    });
  }, []);

  const loadTopicGraph = useCallback((defaultGraph) => {
    if (!defaultGraph) return;
    if (defaultGraph.type === 'lp') {
      setLpConfigState({
        constraints: defaultGraph.constraints || [],
        objective: defaultGraph.objective || '',
        source: 'topic',
      });
      setExpressions([]);
    } else if (defaultGraph.expressions) {
      setLpConfigState(null);
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
      enterLpMode,
      clearLpMode,
      addLpConstraint,
      appendLpConstraint,
      updateLpConstraint,
      removeLpConstraint,
      setLpObjective,
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
      setLpConfig,
      enterLpMode,
      clearLpMode,
      addLpConstraint,
      appendLpConstraint,
      updateLpConstraint,
      removeLpConstraint,
      setLpObjective,
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
