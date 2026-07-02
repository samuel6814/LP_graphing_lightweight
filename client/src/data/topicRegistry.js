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
    quickAnswer:
      'Linear programming (LP) is choosing the best plan of action by optimizing a linear objective function subject to linear constraints. The word programming means planning, not computer coding. LP applies when every relationship in the model is linear.',
    keywords: ['linear programming', 'LP introduction', 'optimization', 'MATH 466'],
    defaultGraph: { type: 'functions', expressions: ['2*x + 3'] },
  },
  {
    id: 'lp-definitions',
    slug: 'lp-definitions',
    title: 'LP Definitions: Feasible & Optimal',
    module: 1,
    summary: 'Objective, constraints, feasible solutions, optimal solutions, and the feasible region.',
    quickAnswer:
      'In linear programming, a feasible solution satisfies all constraints. An optimal solution is feasible and gives the best objective value (maximum profit or minimum cost). The feasible region is the set of all feasible points, often a polygon in two dimensions.',
    keywords: ['feasible region', 'optimal solution', 'feasible solution', 'linear programming'],
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
    summary: 'Standard mathematical form with $n$ decision variables and $m$ constraints.',
    quickAnswer:
      'A general LP model chooses values for decision variables $x_j$ to optimize a linear objective $Z = \\sum_j c_j x_j$, subject to $m$ linear constraints on resources and non-negativity. Coefficients $c_j$ are profits or costs; $a_{ij}$ and $b_i$ describe resource use and availability.',
    keywords: ['LP formulation', 'decision variables', 'constraints', 'objective function'],
    defaultGraph: { type: 'functions', expressions: ['3*x1 + 2*x2'] },
  },
  {
    id: 'key-terminology',
    slug: 'key-terminology',
    title: 'Key Terminology',
    module: 1,
    summary: 'Coefficients $c_j$, technological coefficients $a_{ij}$, and resource availabilities $b_i$.',
    quickAnswer:
      'In LP notation, $c_j$ is the profit or cost per unit of activity $j$, $a_{ij}$ is how much resource $i$ is consumed per unit of activity $j$, and $b_i$ is the total amount available of resource $i$. Constraints take the form $\\sum_j a_{ij} x_j$ compared to $b_i$.',
    keywords: ['LP terminology', 'technological coefficients', 'RHS', 'objective coefficients'],
    defaultGraph: { type: 'lp', constraints: ['x>=0', 'y>=0', '2*x+3*y<=12'], objective: 'max 5*x+4*y' },
  },
  {
    id: 'graphing-linear-inequalities',
    slug: 'graphing-linear-inequalities',
    title: 'Graphing Linear Inequalities',
    module: 2,
    summary: 'Boundary lines, test points, and half-plane shading for $ax + by \\leq c$.',
    quickAnswer:
      'To graph a linear inequality, first draw the boundary line from the corresponding equality. Then use a test point (often the origin) to decide which half-plane satisfies the inequality and shade that region. Dashed lines indicate strict inequalities.',
    keywords: ['graphing inequalities', 'half-plane', 'test point', 'feasible region'],
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
    quickAnswer:
      'The feasible region of a system of linear inequalities is the intersection of all individual half-planes. Graph each constraint, shade the satisfying side, and the overlapping region is where every constraint holds at once.',
    keywords: ['systems of inequalities', 'feasible region', 'intersection', 'graphical LP'],
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
    quickAnswer:
      'LP problem formulation follows four steps: identify decision variables, gather problem data, write constraints that limit resources or requirements, and state the objective to maximize or minimize. Real problems are translated into this algebraic form before solving.',
    keywords: ['problem formulation', 'LP modeling', 'decision variables', 'constraints'],
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
    quickAnswer:
      'For a bounded feasible region in two-variable LP, the optimal solution occurs at an extreme point (corner) of the polygon. This theorem justifies evaluating the objective only at vertices rather than every point in the region.',
    keywords: ['extreme points', 'corner points', 'optimal solution', 'graphical LP'],
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
    quickAnswer:
      'The isoprofit (or isocost) method draws parallel lines of equal objective value and slides them in the improving direction until they last touch the feasible region. The last feasible contact point is the optimal corner solution.',
    keywords: ['isoprofit line', 'isocost line', 'graphical solution', 'objective function'],
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
    quickAnswer:
      'The graphical LP procedure plots constraints to find the feasible region, identifies corner points, evaluates the objective at each vertex, and selects the best value. It solves two-variable problems visually and builds intuition for the simplex method.',
    keywords: ['graphical solution', 'linear programming', 'corner points', 'two-variable LP'],
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
    quickAnswer:
      'Standard form LP uses equality constraints and non-negative variables. Slack variables convert $\\leq$ constraints to equalities by adding leftover capacity. Surplus and artificial variables handle $\\geq$ and equality constraints for simplex tableaus.',
    keywords: ['standard form', 'slack variables', 'surplus variables', 'simplex'],
    defaultGraph: { type: 'functions', expressions: ['x1 + x2 + s1 - 4'] },
  },
  {
    id: 'simplex-algorithm',
    slug: 'simplex-algorithm',
    title: 'Simplex Algorithm',
    module: 3,
    summary: 'Pivot from basic feasible solution to optimum via $c_j - z_j$ optimality test.',
    quickAnswer:
      'The simplex algorithm moves from one basic feasible solution to another by pivoting, improving the objective each step until the optimality test (non-positive reduced costs $c_j - z_j$ for maximization) shows no further improvement. It is the standard computational method for LP.',
    keywords: ['simplex algorithm', 'pivot', 'basic feasible solution', 'optimality test'],
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
    quickAnswer:
      'An LP is infeasible when no point satisfies all constraints. It is unbounded when the feasible region allows the objective to improve without limit. Both cases are detected during graphical or simplex solution when no optimum exists.',
    keywords: ['infeasible LP', 'unbounded LP', 'special cases', 'simplex'],
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
    quickAnswer:
      'Degeneracy in the simplex method occurs when a basic variable takes value zero at a corner, often from more than $n$ constraints meeting at one point. It can cause cycling but is handled with careful pivot rules and remains a theoretical concern in practice.',
    keywords: ['degeneracy', 'simplex method', 'basic variables', 'cycling'],
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
    quickAnswer:
      'Artificial variables are added to constraints that lack an obvious starting basic feasible solution, especially equalities or $\\geq$ constraints. They are penalized heavily in the objective so the simplex method drives them to zero when a feasible solution exists.',
    keywords: ['artificial variables', 'initial BFS', 'simplex', 'big M method'],
    defaultGraph: { type: 'functions', expressions: ['x1 + x2 + a1 - 5'] },
  },
  {
    id: 'two-phase-method',
    slug: 'two-phase-method',
    title: 'Two-Phase Method',
    module: 3,
    summary: 'Phase I minimizes artificial variables; Phase II optimizes the true objective.',
    quickAnswer:
      'The two-phase simplex method first minimizes the sum of artificial variables (Phase I) to find a feasible starting tableau or prove infeasibility. Phase II then replaces the artificial objective with the true objective and continues pivoting to optimality.',
    keywords: ['two-phase method', 'Phase I', 'Phase II', 'simplex algorithm'],
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
    quickAnswer:
      'Every LP primal has a corresponding dual. Weak duality says dual objective values bound the primal; strong duality says optimal values match when both are feasible. Duality provides economic interpretations and alternative solution approaches.',
    keywords: ['duality theory', 'primal dual', 'weak duality', 'strong duality'],
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
    quickAnswer:
      'Sensitivity analysis asks how much an objective coefficient or right-hand side can change before the current optimal basis stays optimal. It shows which data matter most and gives allowable ranges for robust decision making after solving an LP.',
    keywords: ['sensitivity analysis', 'shadow prices', 'allowable range', 'post-optimality'],
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
    quickAnswer:
      'A transportation model ships goods from sources to destinations at minimum cost. Decision variables are shipment amounts; supply and demand constraints ensure totals balance. Balanced problems have total supply equal to total demand.',
    keywords: ['transportation problem', 'supply demand', 'network LP', 'operations research'],
    defaultGraph: { type: 'functions', expressions: ['3*x + 2*y + 5'] },
  },
  {
    id: 'transshipment-models',
    slug: 'transshipment-models',
    title: 'Transshipment Models',
    module: 5,
    summary: 'Extension of transportation allowing intermediate transshipment nodes.',
    quickAnswer:
      'Transshipment extends transportation by allowing goods to pass through intermediate nodes before reaching final destinations. Flow balance constraints at transshipment points replace simple source-destination shipment limits, still solvable as an LP network.',
    keywords: ['transshipment', 'transportation model', 'network flow', 'LP applications'],
    defaultGraph: { type: 'functions', expressions: ['x + y + z'] },
  },
  {
    id: 'assignment-models',
    slug: 'assignment-models',
    title: 'Assignment Models',
    module: 5,
    summary: 'One-to-one assignment with Hungarian / opportunity cost method.',
    quickAnswer:
      'The assignment problem allocates $n$ tasks to $n$ agents one-to-one at minimum total cost. It is a special LP with binary decision variables, solved efficiently by the Hungarian or opportunity cost method rather than general simplex.',
    keywords: ['assignment problem', 'Hungarian method', 'one-to-one assignment', 'LP applications'],
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

export function getAdjacentTopics(slug) {
  const i = topics.findIndex((t) => t.slug === slug);
  return {
    prev: i > 0 ? topics[i - 1] : null,
    next: i >= 0 && i < topics.length - 1 ? topics[i + 1] : null,
  };
}
