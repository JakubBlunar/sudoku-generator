import { GlobalStyle, theme } from '../theme'
import { StyleSheetManager, ThemeProvider } from 'styled-components'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/next'
import { shouldForwardProp } from '../should-forward-prop'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        <GlobalStyle />
        <Head>
          <title>Sudoku</title>
          <meta name="description" content="Free sudoku game and printable sudoku generator" />
        </Head>
        <Component {...pageProps} />
        <Analytics />
      </StyleSheetManager>
    </ThemeProvider>
  )
}

export default App
