import _ from 'lodash'
import { useEffect } from 'react'
import { useSudokuContext } from '../context/SudokuContext'
import { getUniqueSudoku } from '../solver/UniqueSudoku'
import { GameSection } from '../components/layout/GameSection'
import styled from 'styled-components'
import { defaultCharacterMap, isSSR } from '../utils'

const GeneratedGameWrapper = styled.div`
  padding: 15px;

  .cell {
    width: 50px;
    height: 50px;
    font-size: 34px;
  }
`

type GeneratedGameProps = {
  initCells?: number
}

export const GeneratedGame = ({ initCells }: GeneratedGameProps) => {
  let { setGameArray, difficulty, setInitArray } = useSudokuContext()

  const createNewGame = () => {
    let [temporaryInitArray] = getUniqueSudoku(difficulty, initCells)

    setInitArray(temporaryInitArray)
    setGameArray(temporaryInitArray)
  }

  useEffect(() => {
    if (isSSR()) return
    createNewGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <GeneratedGameWrapper>
      <GameSection onClick={_.noop} characterMap={defaultCharacterMap} />
    </GeneratedGameWrapper>
  )
}
