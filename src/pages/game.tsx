import Head from 'next/head'
import { Layout } from '../components/layout/Layout'
import { Game } from '../containers/Game'
import { SudokuProvider } from '../context/SudokuContext'

const GamePage = () => (
  <Layout>
    <Head>
      <title>Play sudoku — Sudoku</title>
      <meta name="description" content="Free online sudoku with undo, hints, mistakes mode and an auto-generating board." />
    </Head>
    <SudokuProvider>
      <Game />
    </SudokuProvider>
  </Layout>
)

export default GamePage
