---
name: Mathematical Logic System
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf3'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d5e3fc'
  on-surface: '#0d1c2e'
  on-surface-variant: '#45464e'
  inverse-surface: '#233144'
  inverse-on-surface: '#eaf1ff'
  outline: '#75777e'
  outline-variant: '#c6c6ce'
  surface-tint: '#525e7f'
  primary: '#182442'
  on-primary: '#ffffff'
  primary-container: '#2e3a59'
  on-primary-container: '#98a4c9'
  inverse-primary: '#bac6ec'
  secondary: '#006a66'
  on-secondary: '#ffffff'
  secondary-container: '#6df4ec'
  on-secondary-container: '#006f6a'
  tertiary: '#52001e'
  on-tertiary: '#ffffff'
  tertiary-container: '#7a0031'
  on-tertiary-container: '#ff7b99'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2ff'
  primary-fixed-dim: '#bac6ec'
  on-primary-fixed: '#0d1a38'
  on-primary-fixed-variant: '#3a4666'
  secondary-fixed: '#70f7ef'
  secondary-fixed-dim: '#4edad3'
  on-secondary-fixed: '#00201e'
  on-secondary-fixed-variant: '#00504c'
  tertiary-fixed: '#ffd9de'
  tertiary-fixed-dim: '#ffb2bf'
  on-tertiary-fixed: '#3f0016'
  on-tertiary-fixed-variant: '#90003b'
  background: '#f8f9ff'
  on-background: '#0d1c2e'
  surface-variant: '#d5e3fc'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  equation-display:
    fontFamily: Source Serif 4
    fontSize: 22px
    fontWeight: '400'
    lineHeight: 32px
  label-caps:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono-technical:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style
The design system is engineered for precision, clarity, and academic rigor. It serves students, educators, and researchers by bridging the gap between complex computational power and intuitive user experience. The brand personality is **Intellectual, Reliable, and Progressive**.

The aesthetic leans into **Technical Minimalism**. It prioritizes high legibility and data-dense environments without feeling cluttered. By utilizing a "Scientific/Tech" aesthetic, the system avoids unnecessary decorative flourishes, instead using structured layouts, purposeful color application for data differentiation, and a subtle sense of depth to organize information hierarchy. The emotional response should be one of confidence and focus, allowing the mathematical content to remain the hero of the interface.

## Colors
The palette is rooted in a professional **Deep Indigo (#2E3A59)** for primary brand elements and text, providing a stable, academic foundation. **Slate (#475569)** serves as the neutral anchor for secondary UI elements and iconography.

For the functional graphing and data visualization layers, we employ high-chroma accents:
- **Teal (#00B4AD)**: Used for primary variables, success states, and the primary plot line in a single-variable graph.
- **Magenta (#D81B60)**: Used for secondary variables, highlights, and differentiating intersecting functions.
- **Backgrounds**: A clean white surface for cards and a very light cool-grey canvas ensure that the vibrant plot lines remain highly legible.

## Typography
This design system utilizes a tri-font strategy to balance modernity with academic tradition:
1.  **Hanken Grotesk (Headlines):** A sharp, contemporary sans-serif that provides a clean, "tech" feel for page titles and major sections.
2.  **Inter (Body):** Chosen for its exceptional legibility in UI contexts, used for all descriptive text, settings, and instructions.
3.  **Geist (Technical/Labels):** A mono-leaning sans-serif used for axis labels, coordinate readouts, and the scientific keypad to reinforce the technical nature of the application.
4.  **Source Serif 4 (Equations):** Used as a proxy for LaTeX/Computer Modern, this serif provides the necessary contrast for mathematical notation, ensuring formulas are distinguishable from the surrounding UI text.

*Mobile Note:* Headlines scale down significantly (e.g., `display-lg` moves to 32px) to maintain space for the graphing viewport.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a focus on maximizing the "Canvas Area" for graphing. 

- **Desktop**: A sidebar-main configuration. The left sidebar (320px fixed) houses formula inputs and history, while the main area expands to fill the viewport for the coordinate grid.
- **Mobile**: A stacked approach where the graph occupies the top 40% of the screen, and a sliding bottom sheet contains the formula input and scientific keypad.
- **Rhythm**: A 4px baseline grid ensures tight alignment in data-heavy panels. Use 16px (md) for standard padding within cards and formula blocks.

## Elevation & Depth
Depth is used sparingly to maintain the minimalist scientific aesthetic. We use **Tonal Layering** supplemented by **Ambient Shadows**:
- **Level 0 (Canvas):** The graphing grid, sitting at the lowest depth.
- **Level 1 (Surface):** Formula cards and sidebars, using a very subtle 1px border (#E2E8F0) and no shadow.
- **Level 2 (Popovers/Keypad):** Floating elements like the scientific keypad or tooltips use a soft, diffused shadow (0px 4px 12px, 5% opacity of Deep Indigo) to appear physically above the data layer.
- **Backdrop Blur:** Use a light blur (8px) behind the formula bar on mobile to maintain context of the graph underneath.

## Shapes
The shape language is **Rounded (0.5rem)**, striking a balance between the precision of a scientific tool and the approachability of modern software.
- **Inputs & Buttons:** 8px (0.5rem) corner radius.
- **Formula Cards:** 16px (1rem) corner radius to differentiate them as distinct logical containers.
- **Graphing Points:** Circular (pill-shaped) markers are used for interactive nodes on a plot line to suggest "touchability."

## Components
- **Scientific Keypad:** Keys should have a subtle top-light gradient and a 1px "pressed" state offset. Mathematical operators (sin, cos, log) use the Primary Indigo color, while numerals use a neutral Slate.
- **Formula Cards:** Each card features a "Color Strip" on the left edge corresponding to its plot line color on the graph. They include an inline toggle to show/hide the function.
- **Coordinate Grids:** Grid lines should be hairline (0.5px) in light slate. The X and Y axes are weighted at 1.5px with a darker slate to provide orientation.
- **Interactive Sliders:** Used for variable manipulation (e.g., "Change *k*"). The track is a light neutral, and the thumb is a high-contrast Teal with a visible value tooltip that appears on hover/touch.
- **Action Buttons:** Primary actions use a solid Indigo fill; secondary actions (like "Export Image") use an outlined style with the Mono-Technical font for the label.