import { createContext, useContext, useMemo, useState, useCallback } from 'react';

const ToolsContext = createContext(null);

const DEFAULT_EXPRESSIONS = [
  { id: 'f1', label: 'f(x)', expr: 'sin(x)', color: 'teal', visible: true },
];

export function ToolsProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('graph');
  const [expressions, setExpressions] = useState(DEFAULT_EXPRESSIONS);
  const [lpConfig, setLpConfig] = useState(null);
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcExpr, setCalcExpr] = useState('');
  const [solverSteps, setSolverSteps] = useState([]);

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
          label: `f${i + 1}(x)`,
          expr,
          color: i % 2 === 0 ? 'teal' : 'magenta',
          visible: true,
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
      activeTab,
      expressions,
      lpConfig,
      calcDisplay,
      calcExpr,
      solverSteps,
      loadTopicGraph,
      loadSolverSteps,
    ],
  );

  return <ToolsContext.Provider value={value}>{children}</ToolsContext.Provider>;
}

export function useTools() {
  const ctx = useContext(ToolsContext);
  if (!ctx) throw new Error('useTools must be used within ToolsProvider');
  return ctx;
}
