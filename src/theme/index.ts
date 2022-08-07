import { createGlobalStyle, ThemedStyledProps } from 'styled-components'

export const theme = {
  colors: {
    bgColor: '#fff',
    primary: 'hsl(210, 88%, 56%)',
    secondary: 'hsl(213, 30%, 29%)',
    secondaryLight: 'hsl(213, 30%, 59%)',
    secondaryLighter: 'hsl(213, 30%, 79%)',
    ternary: 'hsl(34, 26%, 89%)',
    ternaryDark: 'hsl(34, 76%, 89%)',
    text: '#000'
  }
}

export type Theme = typeof theme
export type ThemeColor = keyof Theme['colors']

export function themeColor(color: ThemeColor): (p: ThemedStyledProps<unknown, Theme>) => string {
  return ({ theme }) => theme.colors[color]
}

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: ${themeColor('bgColor')};
  color: ${themeColor('primary')};
  font-family: 'Source Sans Pro', sans-serif;
  line-height: 1.4em;
  font-weight: 300;
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
}
`
