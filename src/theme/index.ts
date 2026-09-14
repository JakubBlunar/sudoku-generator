import { createGlobalStyle } from 'styled-components'
import type { DefaultTheme } from 'styled-components'

/* Fonts are self-hosted via Fontsource and imported in _app.tsx.
 * 'Bricolage Grotesque Variable' is a display face (real 200-800 weights,
 * so no fake-bolding); 'Figtree Variable' is the body face; 'Noto Sans'
 * stays as the digit face for boards and the print preview, where it must
 * match what the printer emits. */
export const theme = {
  colors: {
    bgColor: 'hsl(210, 33%, 99.5%)',
    bgSoft: 'hsl(210, 33%, 98%)',
    primary: 'hsl(211, 80%, 52%)',
    primaryDark: 'hsl(213, 76%, 36%)',
    secondary: 'hsl(213, 30%, 29%)',
    secondaryLight: 'hsl(213, 30%, 59%)',
    secondaryLighter: 'hsl(213, 30%, 79%)',
    secondaryLightest: 'hsl(213, 30%, 92%)',
    ternary: 'hsl(34, 26%, 89%)',
    ternaryDark: 'hsl(34, 76%, 89%)',
    text: 'hsl(213, 35%, 16%)',
    ink: 'hsl(213, 35%, 16%)',
    gridLine: 'hsl(213, 25%, 78%)',
    muted: 'hsl(213, 12%, 42%)',
    success: 'hsl(142, 70%, 40%)',
    danger: 'hsl(0, 72%, 51%)',
    shadow: 'rgba(15, 23, 42, 0.08)',
    shadowLg: 'rgba(15, 23, 42, 0.14)'
  }
}

export type Theme = typeof theme
export type ThemeColor = keyof Theme['colors']

export function themeColor(color: ThemeColor): (p: { theme?: DefaultTheme }) => string {
  return ({ theme }) => (theme as Theme).colors[color]
}

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  scroll-behavior: smooth;
}

body {
  background: ${themeColor('bgColor')};
  color: ${themeColor('text')};
  font-family: 'Figtree Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.4em;
  font-weight: 300;
  min-height: 100vh;
  /* The hero's grid-paper backdrop intentionally bleeds past the viewport;
  clip (not hidden) so sticky positioning in the header keeps working. */
  overflow-x: clip;

  @media screen {
    background:
      radial-gradient(1200px 600px at 50% -200px, ${themeColor('secondaryLightest')} 0%, transparent 70%),
      ${themeColor('bgSoft')};
  }
}

/* Display face: wordmark + all headlines (the app sets them per component,
 * this is the catch-all so no heading ever falls back to the body face). */
h1,
h2,
h3,
.logo {
  font-family: 'Bricolage Grotesque Variable', 'Figtree Variable', sans-serif;
}

img, svg { display: block; max-width: 100%; }

::selection {
  background: ${themeColor('secondary')};
  color: #fff;
}

.blur {
  -webkit-filter: blur(2px);
  -moz-filter: blur(2px);
  -o-filter: blur(2px);
  -ms-filter: blur(2px);
  filter: blur(2px);
}

/* --- print output ------------------------------------------------------
 * Only the /generator page opts in via a body class (see generator.tsx),
 * so the OTHER pages (/game, /alphabet-game, …) print as normal.
 *
 * Strategy: hide the app chrome with display:none (so it takes NO space) and
 * let the .print-sheet blocks flow in NORMAL FLOW with break-after: page —
 * one sheet per A4 page. (The old approach used visibility:hidden plus
 * position:absolute on the sheets; absolute positioning takes them out of
 * flow and makes the page breaks collapse onto a single page.)           */
@page {
  size: A4 portrait;
  margin: 0;
}

@media print {
  body.print-sheet-page {
    background: #fff;
  }

  /* App chrome that must not appear (or occupy space) on paper. */
  body.print-sheet-page header,
  body.print-sheet-page .no-print {
    display: none !important;
  }

  /* Reset the app layout wrappers so the first sheet starts at the very top
  of page 1 and the sheets stack one-per-page in normal flow. */
  body.print-sheet-page main {
    width: auto !important;
    min-height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  body.print-sheet-page .print-root {
    display: block !important;
    gap: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  /* One sheet = exactly one A4 page. */
  .print-sheet {
    position: static;
    margin: 0;
    break-after: page;
    page-break-after: always;

    &:last-of-type {
      break-after: auto;
      page-break-after: auto;
    }
  }

  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
`
