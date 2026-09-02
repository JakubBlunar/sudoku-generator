import Head from 'next/head'
import { Layout } from '../components/layout/Layout'
import { Game } from '../containers/Game'
import { SudokuProvider } from '../context/SudokuContext'

const GamePage = () => (
  <Layout>
    <Head>
      <title>Sudoku game</title>
      <meta name="description" content="Play free sudoku" />
    </Head>
    <SudokuProvider>
      <Game />
    </SudokuProvider>
  </Layout>
)

export default GamePage
