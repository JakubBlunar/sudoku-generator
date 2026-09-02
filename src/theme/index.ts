import { createGlobalStyle } from 'styled-components'
import type { DefaultTheme } from 'styled-components'

export const theme = {
  colors: {
    bgColor: '#fff',
    bgSoft: 'hsl(210, 33%, 98%)',
    primary: 'hsl(210, 88%, 56%)',
    primaryDark: 'hsl(212, 78%, 38%)',
    secondary: 'hsl(213, 30%, 29%)',
    secondaryLight: 'hsl(213, 30%, 59%)',
    secondaryLighter: 'hsl(213, 30%, 79%)',
    secondaryLightest: 'hsl(213, 30%, 92%)',
    ternary: 'hsl(34, 26%, 89%)',
    ternaryDark: 'hsl(34, 76%, 89%)',
    text: '#000',
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
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.4em;
  font-weight: 300;
  min-height: 100vh;

  @media screen {
    background:
      radial-gradient(1200px 600px at 50% -200px, ${themeColor('secondaryLightest')} 0%, transparent 70%),
      ${themeColor('bgSoft')};
  }
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

@media all {
  .page-break {
    display: none;
  }
}

@media print {
  .page-break {
    display: block;
    page-break-before: always;
    break-after: page;
  }

  .page-break:last-of-type {
    page-break-before: auto;
    break-after: auto;
  }
}
`
