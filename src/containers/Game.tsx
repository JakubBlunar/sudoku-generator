import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { GameSection } from '../components/layout/GameSection'
import { StatusSection } from '../components/layout/StatusSection'
import { getUniqueSudoku } from '../solver/UniqueSudoku'
import { useSudokuContext } from '../context/SudokuContext'
import styled from 'styled-components'
import { ThemeColor, themeColor } from '../theme'
import { Overlay } from '../components/Overlay'
import { isSSR } from '../utils'

const PageWrapper = styled.div`
  max-width: 700px;
  min-width: 270px;
  margin: 0 auto;
  padding: 0 10px;
`

const InnerContainer = styled.div`
  display: flex;
  color: ${themeColor('secondary')};
  flex-wrap: wrap;
  padding: 0 20px;

  @media screen and (max-width: 670px) {
    & {
      max-width: 500px;
      margin: 0 auto;
    }
  }
`

const OverlayText = styled.span<{ color: ThemeColor }>`
  color: ${({ color }) => themeColor(color)};
`

export const Game = () => {
  const {
    setNumberSelected,
    gameArray,
    setGameArray,
    difficulty,
    setDifficulty,
    setTimeGameStarted,
    cellSelected,
    setCellSelected,
    initArray,
    setInitArray,
    setWon
  } = useSudokuContext()
  const [mistakesMode, setMistakesMode] = useState<boolean>(false)
  const [history, setHistory] = useState<string[][]>([])
  const [solvedArray, setSolvedArray] = useState<string[]>([])
  const [overlay, setOverlay] = useState<boolean>(false)

  const createNewGame = (e?: React.ChangeEvent<HTMLSelectElement>) => {
    const [temporaryInitArray, temporarySolvedArray] = getUniqueSudoku(difficulty, undefined, e)

    setInitArray(temporaryInitArray)
    setGameArray(temporaryInitArray)
    setSolvedArray(temporarySolvedArray)
    setNumberSelected('0')
    setTimeGameStarted(moment())
    setCellSelected(-1)
    setHistory([])
    setWon(false)
  }

  const isSolved = (index: number, value: string) => {
    if (
      gameArray.every((cell: string, cellIndex: number) => {
        if (cellIndex === index) return value === solvedArray[cellIndex]
        else return cell === solvedArray[cellIndex]
      })
    ) {
      return true
    }
    return false
  }

  const fillCell = (index: number, value: string) => {
    if (initArray[index] === '0') {
      const tempArray = gameArray.slice()
      const tempHistory = history.slice()

      tempHistory.push(gameArray.slice())
      setHistory(tempHistory)

      tempArray[index] = value
      setGameArray(tempArray)

      if (isSolved(index, value)) {
        setOverlay(true)
        setWon(true)
      }
    }
  }

  const userFillCell = (index: number, value: string) => {
    if (mistakesMode) {
      if (value === solvedArray[index]) {
        fillCell(index, value)
      } else {
        // TODO: Flash
      }
    } else {
      fillCell(index, value)
    }
  }

  const onClickCell = (indexOfArray: number) => setCellSelected(indexOfArray)

  const onChangeDifficulty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value)
    createNewGame(e)
  }

  const onClickNumber = (number: string) => {
    if (cellSelected !== -1) {
      userFillCell(cellSelected, number)
    }
  }

  const onClickUndo = () => {
    if (history.length) {
      const tempHistory = history.slice()
      const tempArray = tempHistory.pop()
      setHistory(tempHistory)
      if (tempArray !== undefined) setGameArray(tempArray)
    }
  }

  const onClickErase = () => {
    if (cellSelected !== -1 && gameArray[cellSelected] !== '0') {
      fillCell(cellSelected, '0')
    }
  }

  const onClickHint = () => {
    if (cellSelected !== -1) {
      fillCell(cellSelected, solvedArray[cellSelected])
    }
  }

  const onClickMistakesMode = () => setMistakesMode(!mistakesMode)

  const onClickOverlay = () => {
    setOverlay(false)
    createNewGame()
  }

  useEffect(() => {
    if (isSSR()) return
    createNewGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <PageWrapper className={overlay ? 'blur' : ''}>
        <InnerContainer>
          <GameSection onClick={(indexOfArray: number) => onClickCell(indexOfArray)} />
          <StatusSection
            newGame={createNewGame}
            onClickNumber={(number: string) => onClickNumber(number)}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChangeDifficulty(e)}
            onClickUndo={onClickUndo}
            onClickErase={onClickErase}
            onClickHint={onClickHint}
            onClickMistakesMode={onClickMistakesMode}
          />
        </InnerContainer>
      </PageWrapper>
      <Overlay onClick={onClickOverlay} visible={overlay}>
        You <OverlayText color="secondaryLighter">solved</OverlayText> <OverlayText color="primary">it!</OverlayText>
      </Overlay>
    </>
  )
}
