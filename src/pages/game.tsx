import { Helmet } from 'react-helmet'
import { Layout } from '../components/layout/Layout'
import { Game } from '../containers/Game'
import { SudokuProvider } from '../context/SudokuContext'

const GamePage = () => (
  <Layout>
    <Helmet>
      <title>Sudoku game</title>
      <meta name="description" content="Play free sudoku" />
    </Helmet>
    <SudokuProvider>
      <Game />
    </SudokuProvider>
  </Layout>
)

export default GamePage
