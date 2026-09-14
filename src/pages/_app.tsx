import { GlobalStyle, theme } from '../theme'
import { StyleSheetManager, ThemeProvider } from 'styled-components'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/next'
import { shouldForwardProp } from '../should-forward-prop'

/* Self-hosted fonts (Fontsource):
 * - Bricolage Grotesque (variable 200-800): wordmark + headlines
 * - Figtree (variable 300-900): body text
 * - Noto Sans 400/700: board digits + print preview (same face the printer
 *   was designed around, so the printed sheets keep their exact look)
 * CSS-only imports: processed at build time, no runtime fetch, no CLS. */
import '@fontsource-variable/bricolage-grotesque/wght.css'
import '@fontsource-variable/figtree/wght.css'
import '@fontsource/noto-sans/400.css'
import '@fontsource/noto-sans/700.css'

const SITE = 'https://sudoku-gtr.vercel.app'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        <GlobalStyle />
        <Head>
          <title>Sudoku</title>
          <meta name="description" content="Free sudoku game and printable sudoku generator" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={SITE} />
          <meta property="og:title" content="Sudoku, online and printable" />
          <meta property="og:description" content="Play sudoku in the browser or generate crisp A4 sheets of puzzles. Free, no sign-up." />
        </Head>
        <Component {...pageProps} />
        <Analytics />
      </StyleSheetManager>
    </ThemeProvider>
  )
}

export default App
