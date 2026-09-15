import React, { createContext, useContext, useState } from 'react'
import moment from 'moment'

type SudokuContextProps = {
  numberSelected: string
  setNumberSelected: React.Dispatch<React.SetStateAction<string>>
  gameArray: string[]
  setGameArray: React.Dispatch<React.SetStateAction<string[]>>
  difficulty: string
  setDifficulty: React.Dispatch<React.SetStateAction<string>>
  timeGameStarted: moment.Moment
  setTimeGameStarted: React.Dispatch<React.SetStateAction<moment.Moment>>
  cellSelected: number
  setCellSelected: React.Dispatch<React.SetStateAction<number>>
  mistake: { index: number; value: string; nonce: number } | null
  setMistake: React.Dispatch<React.SetStateAction<{ index: number; value: string; nonce: number } | null>>
  initArray: string[]
  setInitArray: React.Dispatch<React.SetStateAction<string[]>>
  won: boolean
  setWon: React.Dispatch<React.SetStateAction<boolean>>
}

const SudokuContext = createContext<SudokuContextProps>({
  numberSelected: '0',
  setNumberSelected: () => {},
  gameArray: [],
  setGameArray: () => {},
  difficulty: 'Easy',
  setDifficulty: () => {},
  timeGameStarted: moment(),
  setTimeGameStarted: () => {},
  cellSelected: -1,
  setCellSelected: () => {},
  mistake: null,
  setMistake: () => {},
  initArray: [],
  setInitArray: () => {},
  won: false,
  setWon: () => {}
})

type SudokuProviderProps = {
  children: React.ReactElement
}

export const SudokuProvider = ({ children }: SudokuProviderProps) => {
  const [numberSelected, setNumberSelected] = useState<string>('0')
  const [gameArray, setGameArray] = useState<string[]>([])
  const [difficulty, setDifficulty] = useState<string>('Easy')
  const [timeGameStarted, setTimeGameStarted] = useState<moment.Moment>(moment())
  const [cellSelected, setCellSelected] = useState<number>(-1)
  const [mistake, setMistake] = useState<{ index: number; value: string; nonce: number } | null>(null)
  const [initArray, setInitArray] = useState<string[]>([])
  const [won, setWon] = useState<boolean>(false)

  return (
    <SudokuContext.Provider
      value={{
        numberSelected,
        setNumberSelected,
        gameArray,
        setGameArray,
        difficulty,
        setDifficulty,
        timeGameStarted,
        setTimeGameStarted,
        cellSelected,
        setCellSelected,
        mistake,
        setMistake,
        initArray,
        setInitArray,
        won,
        setWon
      }}
    >
      {children}
    </SudokuContext.Provider>
  )
}

export const useSudokuContext = (): SudokuContextProps => useContext(SudokuContext)
