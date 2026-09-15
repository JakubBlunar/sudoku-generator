import Head from 'next/head'
import { Layout } from '../components/layout/Layout'
import { Game } from '../containers/Game'
import { SudokuProvider } from '../context/SudokuContext'

const GamePage = () => (
  <Layout>
    <Head>
      <title>Alphabet sudoku — Sudoku</title>
      <meta name="description" content="Sudoku with letters instead of digits. The same puzzle mechanics, a different grid." />
    </Head>
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
      />
    </SudokuProvider>
  </Layout>
)

export default GamePage
