/**
 * Topic metadata derived from MATH 466.pdf (Optimization II, KNUST).
 * Full explainer + practice content lives in ./topics/
 */

export const modules = [
  { id: 1, title: 'Introduction & Foundations' },
  { id: 2, title: 'Graphical Methods' },
  { id: 3, title: 'Simplex Method' },
  { id: 4, title: 'Duality & Sensitivity' },
  { id: 5, title: 'LP Applications' },
];

export const topics = [
  {
    id: 'intro-to-linear-programming',
    slug: 'intro-to-linear-programming',
    title: 'Introduction to Linear Programming',
    module: 1,
    summary: 'What LP is, what “programming” means, and when models are linear.',
    defaultGraph: { type: 'functions', expressions: ['2*x + 3'] },
  },
  {
    id: 'lp-definitions',
    slug: 'lp-definitions',
    title: 'LP Definitions: Feasible & Optimal',
    module: 1,
    summary: 'Objective, constraints, feasible solutions, optimal solutions, and the feasible region.',
    defaultGraph: {
      type: 'lp',
      constraints: ['x>=0', 'y>=0', 'x+y<=6'],
      objective: 'max 4*x+3*y',
    },
  },
  {
    id: 'general-lp-formulation',
    slug: 'general-lp-formulation',
    title: 'General LP Formulation',
    module: 1,
    summary: 'Standard mathematical form with n decision variables and m constraints.',
    defaultGraph: { type: 'functions', expressions: ['3*x1 + 2*x2'] },
  },
  {
    id: 'key-terminology',
    slug: 'key-terminology',
    title: 'Key Terminology',
    module: 1,
    summary: 'Coefficients cj, technological coefficients aij, and resource availabilities bi.',
    defaultGraph: { type: 'lp', constraints: ['x>=0', 'y>=0', '2*x+3*y<=12'], objective: 'max 5*x+4*y' },
  },
  {
    id: 'graphing-linear-inequalities',
    slug: 'graphing-linear-inequalities',
    title: 'Graphing Linear Inequalities',
    module: 2,
    summary: 'Boundary lines, test points, and half-plane shading for ax + by ≤ c.',
    defaultGraph: {
      type: 'lp',
      constraints: ['2*x+3*y>=6', 'x>=0', 'y>=0'],
      objective: 'max x+y',
    },
  },
  {
    id: 'systems-of-inequalities',
    slug: 'systems-of-inequalities',
    title: 'Systems of Linear Inequalities',
    module: 2,
    summary: 'Intersecting half-planes to find the feasible region of a system.',
    defaultGraph: {
      type: 'lp',
      constraints: ['4*x+3*y>=12', 'x-y<=0', 'x>=0', 'y>=0'],
      objective: 'max x+2*y',
    },
  },
  {
    id: 'problem-formulation',
    slug: 'problem-formulation',
    title: 'Problem Formulation',
    module: 2,
    summary: 'Four-step modeling: decision variables, data, constraints, objective.',
    defaultGraph: {
      type: 'lp',
      constraints: ['4*x1+2*x2<=80', '2*x1+4*x2<=60', 'x1>=0', 'x2>=0'],
      objective: 'max 70*x1+50*x2',
    },
  },
  {
    id: 'extreme-points',
    slug: 'extreme-points',
    title: 'Extreme Points & Optimal Solution',
    module: 2,
    summary: 'Theorem: for bounded feasible regions, an optimum occurs at an extreme point.',
    defaultGraph: {
      type: 'lp',
      constraints: ['x>=0', 'y>=0', 'x+y<=5', '2*x+y<=8'],
      objective: 'max 3*x+2*y',
    },
  },
  {
    id: 'isoprofit-method',
    slug: 'isoprofit-method',
    title: 'Isoprofit / Isocost Line Method',
    module: 2,
    summary: 'Slide parallel objective lines to find the optimal corner point.',
    defaultGraph: {
      type: 'lp',
      constraints: ['x>=0', 'y>=0', 'x+2*y<=8', '2*x+y<=8'],
      objective: 'max 4*x+3*y',
    },
  },
  {
    id: 'graphical-solution',
    slug: 'graphical-solution',
    title: 'Graphical Solution Procedure',
    module: 2,
    summary: 'End-to-end graphical solution for two-variable LP problems.',
    defaultGraph: {
      type: 'lp',
      constraints: ['x>=0', 'y>=0', '2*x+y<=10', 'x+2*y<=10'],
      objective: 'max 5*x+4*y',
    },
  },
  {
    id: 'standard-form',
    slug: 'standard-form',
    title: 'Standard Form & Slack Variables',
    module: 3,
    summary: 'Convert inequalities to equalities using slack, surplus, and artificial variables.',
    defaultGraph: { type: 'functions', expressions: ['x1 + x2 + s1 - 4'] },
  },
  {
    id: 'simplex-algorithm',
    slug: 'simplex-algorithm',
    title: 'Simplex Algorithm',
    module: 3,
    summary: 'Pivot from basic feasible solution to optimum via cj − zj optimality test.',
    defaultGraph: {
      type: 'lp',
      constraints: ['x>=0', 'y>=0', 'x+y<=4', '2*x+y<=6'],
      objective: 'max 3*x+2*y',
    },
  },
  {
    id: 'special-cases',
    slug: 'special-cases',
    title: 'Special Cases: Unbounded & Infeasible',
    module: 3,
    summary: 'Detecting empty feasible regions and objectives that grow without bound.',
    defaultGraph: {
      type: 'lp',
      constraints: ['x-y>=1', 'x>=0', 'y>=0'],
      objective: 'max x+y',
    },
  },
  {
    id: 'degeneracy',
    slug: 'degeneracy',
    title: 'Degeneracy',
    module: 3,
    summary: 'Ties in leaving variable selection and zero basic variables at corners.',
    defaultGraph: {
      type: 'lp',
      constraints: ['x>=0', 'y>=0', 'x+y<=2', 'x<=1'],
      objective: 'max x+2*y',
    },
  },
  {
    id: 'artificial-variables',
    slug: 'artificial-variables',
    title: 'Artificial Variables',
    module: 3,
    summary: 'Introducing artificial variables to obtain an initial basic feasible solution.',
    defaultGraph: { type: 'functions', expressions: ['x1 + x2 + a1 - 5'] },
  },
  {
    id: 'two-phase-method',
    slug: 'two-phase-method',
    title: 'Two-Phase Method',
    module: 3,
    summary: 'Phase I minimizes artificial variables; Phase II optimizes the true objective.',
    defaultGraph: {
      type: 'lp',
      constraints: ['x>=0', 'y>=0', 'x+y>=3', '2*x+y<=6'],
      objective: 'max 4*x+3*y',
    },
  },
  {
    id: 'duality-theory',
    slug: 'duality-theory',
    title: 'Duality Theory',
    module: 4,
    summary: 'Primal-dual relationships and the duality theorem.',
    defaultGraph: {
      type: 'lp',
      constraints: ['x>=0', 'y>=0', '2*x+y<=8', 'x+2*y<=8'],
      objective: 'max 5*x+4*y',
    },
  },
  {
    id: 'sensitivity-analysis',
    slug: 'sensitivity-analysis',
    title: 'Sensitivity Analysis',
    module: 4,
    summary: 'Post-optimality ranges for objective coefficients and RHS values.',
    defaultGraph: {
      type: 'lp',
      constraints: ['x>=0', 'y>=0', 'x+y<=6', '2*x+y<=10'],
      objective: 'max 6*x+4*y',
    },
  },
  {
    id: 'transportation-models',
    slug: 'transportation-models',
    title: 'Transportation Models',
    module: 5,
    summary: 'Balanced transportation LP: supplies, demands, and unit costs.',
    defaultGraph: { type: 'functions', expressions: ['3*x + 2*y + 5'] },
  },
  {
    id: 'transshipment-models',
    slug: 'transshipment-models',
    title: 'Transshipment Models',
    module: 5,
    summary: 'Extension of transportation allowing intermediate transshipment nodes.',
    defaultGraph: { type: 'functions', expressions: ['x + y + z'] },
  },
  {
    id: 'assignment-models',
    slug: 'assignment-models',
    title: 'Assignment Models',
    module: 5,
    summary: 'One-to-one assignment with Hungarian / opportunity cost method.',
    defaultGraph: { type: 'functions', expressions: ['7', '9', '8'] },
  },
];

export function getTopicBySlug(slug) {
  return topics.find((t) => t.slug === slug);
}

export function getTopicsByModule(moduleId) {
  return topics.filter((t) => t.module === moduleId);
}

export function getModuleTitle(moduleId) {
  return modules.find((m) => m.id === moduleId)?.title ?? `Module ${moduleId}`;
}
