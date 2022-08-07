import { GlobalStyle, theme } from '../theme'
import { ThemeProvider } from 'styled-components'
import type { AppProps } from 'next/app'
import { Helmet } from 'react-helmet'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Helmet>
        <title>Sudoku</title>
        <meta name="description" content="Free sudoku game and printable sudoku generator" />
      </Helmet>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
