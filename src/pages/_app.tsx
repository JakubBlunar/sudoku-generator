import { GlobalStyle, theme } from '../theme'
import { StyleSheetManager, ThemeProvider } from 'styled-components'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { shouldForwardProp } from '../should-forward-prop'

/* Self-hosted fonts (Fontsource):
 * - Space Grotesk (variable 300-700): wordmark + headlines
 * - Figtree (variable 300-900): body text
 * - Noto Sans 400/700: board digits + print preview (same face the printer
 *   was designed around, so the printed sheets keep their exact look)
 * CSS-only imports: processed at build time, no runtime fetch, no CLS. */
import '@fontsource-variable/space-grotesk/wght.css'
import '@fontsource-variable/figtree/wght.css'
import '@fontsource/noto-sans/400.css'
import '@fontsource/noto-sans/700.css'

// Public origin for og:/twitter: meta tags. Baked in at build time
// (NEXT_PUBLIC_*) — the Docker build sets it to the VPS host
// (see Dockerfile / docker-compose.yml).
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://sudoku.jablu.sk'

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
          <meta property="og:image" content={`${SITE}/og-image.png`} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Sudoku, online and printable" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <Component {...pageProps} />
      </StyleSheetManager>
    </ThemeProvider>
  )
}

export default App
