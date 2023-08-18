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
      <Game
        characterMap={{
          '1': 'A',
          '2': 'B',
          '3': 'C',
          '4': 'D',
          '5': 'E',
          '6': 'F',
          '7': 'G',
          '8': 'H',
          '9': 'I'
        }}
        maxWidth={740}
      />
    </SudokuProvider>
  </Layout>
)

export default GamePage
