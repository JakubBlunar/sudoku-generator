import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment'
import { GameSection } from '../components/layout/GameSection'
import { StatusSection } from '../components/layout/StatusSection'
import { getUniqueSudoku } from '../solver/UniqueSudoku'
import { useSudokuContext } from '../context/SudokuContext'
import styled from 'styled-components'
import { ThemeColor, themeColor } from '../theme'
import { Overlay } from '../components/Overlay'
import { CharacterMap, defaultCharacterMap, isSSR } from '../utils'

const GamePageCard = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: 12px auto 40px;
  padding: 28px 28px 26px;
  background: #fff;
  border: 1px solid ${themeColor('secondaryLightest')};
  border-radius: 20px;
  box-shadow:
    0 1px 2px ${themeColor('shadow')},
    0 16px 40px -18px ${themeColor('shadowLg')};

  @media (max-width: 640px) {
    margin: 4px 10px 28px;
    padding: 16px 12px 14px;
    border-radius: 16px;
    box-shadow: 0 1px 2px ${themeColor('shadow')}, 0 10px 24px -14px ${themeColor('shadowLg')};
  }

  @media print {
    all: revert;
    box-shadow: none;
    border: none;
    background: none;
    margin: 0;
    padding: 0;
    max-width: none;
    border-radius: 0;
  }
`

const GameGrid = styled.div`
  display: grid;
  align-items: start;
  gap: 32px;
  grid-template-columns: minmax(0, 1fr) 260px;
  grid-template-areas: "board controls";

  > :nth-child(1) {
    grid-area: board;
    justify-self: center;
    width: max-content;
  }

  > :nth-child(2) {
    grid-area: controls;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "board"
      "controls";
    gap: 28px;

    > :nth-child(1) {
      justify-self: center;
    }

    > :nth-child(2) {
      width: 100%;
    }
  }

  /* Board is a fixed 434px wide (9 × 48px cells) to keep print sizing exact.
     On narrow phones we zoom it down (zoom scales the layout box, unlike
     transform), preventing horizontal overflow. Print resets it to full size. */
  @media (max-width: 480px) {
    > :nth-child(1) {
      zoom: 0.8;
    }
  }

  @media print {
    display: block;
    gap: 0;

    > :nth-child(1) {
      zoom: 1;
    }

    > :nth-child(2) {
      display: none;
    }
  }
`

const OverlayText = styled.span<{ color: ThemeColor }>`
  color: ${({ color }) => themeColor(color)};
`

const WinTime = styled.span`
  display: block;
  margin-top: 8px;
  font-size: 15px;
  font-weight: 500;
  color: ${themeColor('muted')};
  font-variant-numeric: tabular-nums;
`

const WinHint = styled.span`
  display: block;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid ${themeColor('secondaryLightest')};
  font-size: 13px;
  font-weight: 500;
  color: ${themeColor('secondaryLight')};
`

const formatElapsed = (started: moment.Moment) => {
  const total = Math.max(0, moment().diff(started, 'seconds'))
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`
}

type GameProps = {
  characterMap?: CharacterMap
  maxWidth?: number
}

export const Game = ({ characterMap = defaultCharacterMap, maxWidth = 720 }: GameProps) => {
  const {
    setNumberSelected,
    gameArray,
    setGameArray,
    difficulty,
    setDifficulty,
    setTimeGameStarted,
    timeGameStarted,
    cellSelected,
    setCellSelected,
    mistake,
    setMistake,
    initArray,
    setInitArray,
    setWon
  } = useSudokuContext()
  const [mistakesMode, setMistakesMode] = useState<boolean>(false)
  const [history, setHistory] = useState<string[][]>([])
  const [solvedArray, setSolvedArray] = useState<string[]>([])
  const [overlay, setOverlay] = useState<boolean>(false)
  const [finalTime, setFinalTime] = useState('')
  const mistakeNonce = useRef(0)

  const createNewGame = (e?: React.ChangeEvent<HTMLSelectElement>) => {
    const [temporaryInitArray, temporarySolvedArray] = getUniqueSudoku(difficulty, undefined, e)

    setInitArray(temporaryInitArray)
    setGameArray(temporaryInitArray)
    setSolvedArray(temporarySolvedArray)
    setNumberSelected('0')
    setTimeGameStarted(moment())
    setCellSelected(-1)
    setHistory([])
    setMistake(null)
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
        setFinalTime(formatElapsed(timeGameStarted))
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
        // Show the rejected digit with a red shake, then drop it.
        mistakeNonce.current += 1
        setMistake({ index, value, nonce: mistakeNonce.current })
        setTimeout(() => setMistake(m => (m && m.index === index && m.nonce === mistakeNonce.current ? null : m)), 450)
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

  const overlayContent = (
    <>
      <h2>
        You{' '}
        <OverlayText color="secondaryLighter">solved</OverlayText> <OverlayText color="primary">it!</OverlayText>
      </h2>
      {finalTime && <WinTime>{finalTime}</WinTime>}
      <WinHint>Click anywhere for a fresh puzzle</WinHint>
    </>
  )

  return (
    <>
      <GamePageCard className={overlay ? 'blur' : ''}>
        <GameGrid>
          <GameSection characterMap={characterMap} onClick={(indexOfArray: number) => onClickCell(indexOfArray)} />
          <StatusSection
            mistakesMode={mistakesMode}
            newGame={createNewGame}
            onClickNumber={(number: string) => onClickNumber(number)}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChangeDifficulty(e)}
            onClickUndo={onClickUndo}
            onClickErase={onClickErase}
            onClickHint={onClickHint}
            onClickMistakesMode={onClickMistakesMode}
            characterMap={characterMap}
          />
        </GameGrid>
      </GamePageCard>
      <Overlay onClick={onClickOverlay} visible={overlay}>
        {overlayContent}
      </Overlay>
    </>
  )
}
