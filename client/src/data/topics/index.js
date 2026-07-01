/**
 * MATH 466 topic content — explainers, practice questions, solver steps.
 * Inline math uses $...$ delimiters rendered by MathText.
 */

export const topicContent = {
  'intro-to-linear-programming': {
    explainer: {
      sections: [
        {
          heading: 'What is Linear Programming?',
          plain:
            'Linear programming (LP) has nothing to do with computer programming. The word "programming" means choosing a course of action. LP involves optimizing a linear objective subject to linear constraints.',
        },
        {
          math: '\\text{Optimize } Z = c_1 x_1 + c_2 x_2 + \\cdots + c_n x_n',
          plain: 'The objective is either maximized or minimized.',
        },
        {
          plain:
            'LP applies when the mathematical model contains only linear functions — each variable appears to the first power, multiplied by a constant.',
        },
      ],
    },
    practice: [
      {
        prompt: 'In LP terminology, what does "programming" refer to?',
        answer: 'Choosing a course of action (a plan of activities), not writing computer code.',
        steps: [
          { title: 'Recall definition', detail: 'LP = linear relationships + optimal decision making.' },
          { title: 'Answer', detail: 'Programming means selecting the best feasible plan.' },
        ],
      },
    ],
  },

  'lp-definitions': {
    explainer: {
      sections: [
        {
          heading: 'Feasible & Optimal Solutions',
          plain:
            'Every LP has an objective and constraints. A feasible solution satisfies all constraints. An optimal solution is feasible and gives the best objective value.',
        },
        {
          math: 'S = \\{ (x_1,\\ldots,x_n) : \\text{all constraints hold} \\}',
          plain: 'The set $S$ is the feasible region. Graphically (two variables), $S$ is a polygon or unbounded region.',
        },
      ],
    },
    practice: [
      {
        prompt: 'A point lies inside the feasible region but does not maximize $Z$. Is it optimal?',
        answer: 'No. It is feasible but not optimal unless it achieves the best objective value.',
        steps: [
          { title: 'Feasible check', detail: 'The point satisfies all constraints.' },
          { title: 'Optimality', detail: 'Another feasible point yields a higher $Z$, so it is not optimal.' },
        ],
      },
    ],
  },

  'general-lp-formulation': {
    explainer: {
      sections: [
        {
          heading: 'General LP Model',
          math: '\\begin{aligned} \\text{Optimize } & Z = \\sum_{j=1}^{n} c_j x_j \\\\ \\text{s.t. } & \\sum_{j=1}^{n} a_{ij} x_j \\in \\{\\leq, =, \\geq\\} b_i, \\quad i=1,\\ldots,m \\\\ & x_j \\geq 0 \\end{aligned}',
        },
        {
          plain:
            'Decision variables $x_j$ represent quantities to determine. Coefficients $c_j$ are per-unit profit or cost. Constraints limit resources.',
        },
      ],
    },
    practice: [
      {
        prompt: 'Write the compact LP form for maximizing $Z = 3x_1 + 5x_2$ with $x_1 + 2x_2 \\leq 8$ and $x_1, x_2 \\geq 0$.',
        answer: '$\\max Z = 3x_1 + 5x_2$ s.t. $x_1 + 2x_2 \\leq 8$, $x_1, x_2 \\geq 0$.',
        steps: [
          { title: 'Objective', detail: 'Maximize $Z = 3x_1 + 5x_2$' },
          { title: 'Constraint', detail: '$x_1 + 2x_2 \\leq 8$' },
          { title: 'Non-negativity', detail: '$x_1, x_2 \\geq 0$' },
        ],
      },
    ],
  },

  'key-terminology': {
    explainer: {
      sections: [
        {
          heading: 'Coefficients & Resources',
          plain:
            '$c_j$ = profit/cost per unit of $x_j$. $a_{ij}$ = amount of resource $i$ used per unit of activity $j$. $b_i$ = total availability of resource $i$.',
        },
        {
          math: 'a_{ij} x_j \\leq b_i',
          plain: 'If $b_i < 0$, multiply the constraint by $-1$ to obtain $b_i > 0$ and reverse the inequality.',
        },
      ],
    },
    practice: [
      {
        prompt: 'In $2x_1 + 3x_2 \\leq 12$, what is $b_1$ if this is resource 1?',
        answer: '$b_1 = 12$ (right-hand side availability).',
        steps: [{ title: 'Identify RHS', detail: '$b_i$ is the value on the right of the inequality.' }],
      },
    ],
  },

  'graphing-linear-inequalities': {
    explainer: {
      sections: [
        {
          heading: 'Graphing $ax + by \\geq c$',
          plain:
            'Replace the inequality with equality to draw the boundary line. Use a test point (often the origin) to determine which half-plane satisfies the inequality.',
        },
        {
          math: '2x + 3y \\geq 6',
          plain: 'Origin test: $2(0)+3(0) \\geq 6$ is false, so shade away from the origin.',
        },
      ],
    },
    practice: [
      {
        prompt: 'For $2x + 3y \\geq 6$, does $(0,0)$ lie in the solution set?',
        answer: 'No, because $0 \\geq 6$ is false.',
        steps: [
          { title: 'Substitute', detail: '$2(0) + 3(0) = 0$' },
          { title: 'Compare', detail: '$0 \\geq 6$ is false' },
        ],
      },
    ],
  },

  'systems-of-inequalities': {
    explainer: {
      sections: [
        {
          heading: 'Feasible Region of a System',
          plain:
            'Graph each inequality, then take the intersection of all half-planes. The common region is the feasible set.',
        },
        {
          math: '\\begin{cases} 4x + 3y \\geq 12 \\\\ x - y \\leq 0 \\end{cases}',
          plain: 'The feasible region is where both inequalities hold simultaneously.',
        },
      ],
    },
    practice: [
      {
        prompt: 'Point $(3,3)$: is it feasible for $4x+3y\\geq12$ and $x-y\\leq0$?',
        answer: 'No. Try $(4,1)$: $4(4)+3(1)=19\\geq12$ ✓, but $4-1=3\\not\\leq0$ ✗.',
        steps: [
          { title: 'Test $(4,1)$', detail: 'First constraint OK; second fails.' },
        ],
      },
    ],
  },

  'problem-formulation': {
    explainer: {
      sections: [
        {
          heading: 'Four Modeling Steps',
          plain:
            'Step 1: Identify decision variables. Step 2: Identify problem data. Step 3: Formulate constraints. Step 4: Formulate the objective (max or min).',
        },
        {
          math: '\\text{Max } Z = 70x_1 + 50x_2 \\quad \\text{(tables and chairs example)}',
          plain: 'Furniture example: $x_1$ tables, $x_2$ chairs; carpentry and painting hour limits.',
        },
      ],
    },
    practice: [
      {
        prompt: 'A firm makes products A and B. Define decision variables.',
        answer: 'Let $x_1$ = units of A, $x_2$ = units of B (or $x$ and $y$).',
        steps: [{ title: 'Step 1', detail: 'Name each unknown quantity to decide.' }],
      },
    ],
  },

  'extreme-points': {
    explainer: {
      sections: [
        {
          heading: 'Extreme Point Theorem',
          plain:
            'For a bounded feasible region in two variables, the optimal solution occurs at an extreme point (corner) of the polygon.',
        },
        {
          math: '\\text{Optimum} \\in \\{\\text{vertices of } S\\}',
        },
      ],
    },
    practice: [
      {
        prompt: 'Why check only corner points when the feasible region is bounded?',
        answer: 'The objective is linear, so its maximum over a polygon occurs at a vertex.',
        steps: [
          { title: 'Theorem', detail: 'Linear objectives attain extrema at extreme points.' },
        ],
      },
    ],
  },

  'isoprofit-method': {
    explainer: {
      sections: [
        {
          heading: 'Isoprofit Lines',
          plain:
            'Plot $c_1 x_1 + c_2 x_2 = k$ for various $k$. Parallel lines represent equal profit. Slide outward (max) until the last point touching the feasible region.',
        },
        {
          math: '4x + 3y = k',
          plain: 'Increase $k$ to improve profit; the last feasible touch point is optimal.',
        },
      ],
    },
    practice: [
      {
        prompt: 'For $\\max Z=4x+3y$, what is the slope of an isoprofit line?',
        answer: 'Rewrite $4x+3y=k$ as $y = k/3 - (4/3)x$, slope $= -4/3$.',
        steps: [
          { title: 'Solve for $y$', detail: '$y = -(4/3)x + k/3$' },
        ],
      },
    ],
  },

  'graphical-solution': {
    explainer: {
      sections: [
        {
          heading: 'Graphical Procedure',
          plain:
            '1) Graph constraints and find feasible region. 2) Identify extreme points. 3) Evaluate $Z$ at each corner. 4) Select the best.',
        },
      ],
    },
    practice: [
      {
        prompt: '$\\max Z=5x+4y$ s.t. $x,y\\geq0$, $2x+y\\leq10$, $x+2y\\leq10$. Which corner gives $Z=26$?',
        answer: '$(2,4)$: $Z=5(2)+4(4)=26$. Verify it is feasible and compare with other corners.',
        steps: [
          { title: 'Corners', detail: '$(0,0)$, $(5,0)$, $(0,5)$, $(2,4)$' },
          { title: 'Evaluate', detail: '$Z(2,4)=26$ is largest among feasible corners.' },
        ],
      },
    ],
  },

  'standard-form': {
    explainer: {
      sections: [
        {
          heading: 'Standard Form',
          plain:
            'Convert inequalities to equalities: $\\leq$ adds slack ($+$), $\\geq$ adds surplus ($-$) and often artificial variables for an initial BFS.',
        },
        {
          math: 'a_1 x_1 + \\cdots + a_n x_n + s = b, \\quad s \\geq 0',
        },
      ],
    },
    practice: [
      {
        prompt: 'Convert $x_1 + 2x_2 \\leq 8$ to equality.',
        answer: '$x_1 + 2x_2 + s_1 = 8$, $s_1 \\geq 0$.',
        steps: [{ title: 'Add slack', detail: '$s_1 = 8 - x_1 - 2x_2 \\geq 0$' }],
      },
    ],
  },

  'simplex-algorithm': {
    explainer: {
      sections: [
        {
          heading: 'Simplex Method',
          plain:
            'Start at a basic feasible solution. Compute $c_j - z_j$. If all $\\leq 0$ (max), stop. Else enter the most positive column, pivot to a new BFS, repeat.',
        },
        {
          math: 'c_j - z_j \\leq 0 \\;\\forall j \\Rightarrow \\text{optimal}',
        },
      ],
    },
    practice: [
      {
        prompt: 'At optimality for a maximization problem, what sign must $c_j - z_j$ have?',
        answer: 'All $c_j - z_j \\leq 0$ (no improving entering variable).',
        steps: [{ title: 'Optimality test', detail: 'Non-positive reduced costs for max.' }],
      },
    ],
  },

  'special-cases': {
    explainer: {
      sections: [
        {
          heading: 'Unbounded & Infeasible',
          plain:
            'Infeasible: no point satisfies all constraints. Unbounded: feasible region allows the objective to improve without limit.',
        },
      ],
    },
    practice: [
      {
        prompt: '$\\max\\; x+y$ with $x-y\\geq1$, $x,y\\geq0$ — bounded or unbounded?',
        answer: 'Unbounded. Feasible ray e.g. $(1+t, t)$ for $t\\geq0$ gives $x+y=1+2t \\to \\infty$.',
        steps: [{ title: 'Construct ray', detail: 'Objective increases along feasible direction.' }],
      },
    ],
  },

  'degeneracy': {
    explainer: {
      sections: [
        {
          heading: 'Degeneracy',
          plain:
            'Occurs when a basic variable equals zero at a corner. Tie in leaving variable — choose carefully to avoid cycling.',
        },
      ],
    },
    practice: [
      {
        prompt: 'What is a degenerate BFS?',
        answer: 'A basic feasible solution where at least one basic variable is zero.',
        steps: [{ title: 'Definition', detail: 'More than $n$ constraints active at a point in $\\mathbb{R}^n$.' }],
      },
    ],
  },

  'artificial-variables': {
    explainer: {
      sections: [
        {
          heading: 'Artificial Variables',
          plain:
            'Added to constraints lacking slack to form an initial basis. Penalized in objective (Big M) or minimized in Phase I.',
        },
        {
          math: 'x_1 + x_2 - s_1 + a_1 = 5',
        },
      ],
    },
    practice: [
      {
        prompt: 'Why introduce artificial variables?',
        answer: 'To obtain an initial basic feasible solution when $\\geq$ or $=$ constraints lack slack variables.',
        steps: [{ title: 'Purpose', detail: 'Start simplex when no obvious BFS exists.' }],
      },
    ],
  },

  'two-phase-method': {
    explainer: {
      sections: [
        {
          heading: 'Two-Phase Simplex',
          plain:
            'Phase I: minimize sum of artificial variables. If optimum $> 0$, infeasible. Phase II: optimize real objective, dropping artificial columns.',
        },
      ],
    },
    practice: [
      {
        prompt: 'Phase I ends with $W^*=0$ and no artificials in basis. What next?',
        answer: 'Proceed to Phase II with the original objective function.',
        steps: [
          { title: 'Feasible', detail: 'Artificials driven to zero — feasible starting tableau.' },
        ],
      },
    ],
  },

  'duality-theory': {
    explainer: {
      sections: [
        {
          heading: 'Primal & Dual',
          plain:
            'Every primal LP has a dual. If one has a finite optimum, so does the other, and their optimal values coincide (duality theorem).',
        },
        {
          math: '\\text{Primal max} \\Leftrightarrow \\text{Dual min}',
        },
      ],
    },
    practice: [
      {
        prompt: 'Primal has $\\leq$ constraints and is a maximization. Dual constraint direction?',
        answer: 'Dual uses $\\geq$ constraints (and dual is a minimization).',
        steps: [{ title: 'Rule (3)', detail: '$\\leq$ in primal becomes $\\geq$ in dual.' }],
      },
    ],
  },

  'sensitivity-analysis': {
    explainer: {
      sections: [
        {
          heading: 'Post-Optimality Analysis',
          plain:
            'Sensitivity analysis finds ranges for $c_j$ and $b_i$ over which the current optimal basis remains optimal.',
        },
      ],
    },
    practice: [
      {
        prompt: 'What question does sensitivity analysis answer?',
        answer: 'How much can a coefficient or RHS change before the optimal solution structure changes?',
        steps: [{ title: 'Purpose', detail: 'Robustness of the optimal plan.' }],
      },
    ],
  },

  'transportation-models': {
    explainer: {
      sections: [
        {
          heading: 'Transportation Problem',
          plain:
            'Ship goods from $m$ sources to $n$ destinations minimizing cost. Balanced: total supply = total demand. Use NW corner, least cost, or Vogel method.',
        },
        {
          math: '\\min \\sum_i \\sum_j c_{ij} x_{ij}',
        },
      ],
    },
    practice: [
      {
        prompt: 'When is a transportation problem balanced?',
        answer: 'When total supply equals total demand.',
        steps: [{ title: 'Balance', detail: '$\\sum$ supply $= \\sum$ demand.' }],
      },
    ],
  },

  'transshipment-models': {
    explainer: {
      sections: [
        {
          heading: 'Transshipment',
          plain:
            'Items may pass through intermediate nodes (warehouses). Modeled as transportation with extra transshipment rows/columns.',
        },
      ],
    },
    practice: [
      {
        prompt: 'How does transshipment differ from pure transportation?',
        answer: 'Goods can flow through intermediate points, not only source $\\to$ destination.',
        steps: [{ title: 'Extension', detail: 'Adds transshipment nodes to the network.' }],
      },
    ],
  },

  'assignment-models': {
    explainer: {
      sections: [
        {
          heading: 'Assignment Problem',
          plain:
            'Special balanced transportation with $n$ sources and $n$ destinations, one assignment per row/column. Hungarian method on cost matrix.',
        },
      ],
    },
    practice: [
      {
        prompt: 'Assignment model: how many assignments per row at optimum?',
        answer: 'Exactly one assignment (one 1) per row and per column.',
        steps: [{ title: 'Structure', detail: '$n \\times n$ binary assignment matrix.' }],
      },
    ],
  },
};

export function loadTopicContent(slug) {
  return topicContent[slug] ?? null;
}

export function getAllTopicSlugs() {
  return Object.keys(topicContent);
}
