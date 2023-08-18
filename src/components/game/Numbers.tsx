import _, { reduce } from 'lodash'
import styled from 'styled-components'
import { CharacterMap } from '../../utils'
import { useSudokuContext } from '../../context/SudokuContext'

const NumbersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  position: relative;
  top: 40px;
  left: 10px;
`

const StatusNumber = styled.div`
  text-align: center;
  font-family: 'Noto Sans', sans-serif;
  font-size: 26px;
  padding: 12px 0;
  cursor: pointer;
  user-select: none;

  &.full {
    opacity: 0.2;
  }
`

type NumbersProps = {
  onClickNumber: (number: string) => void
  characterMap: CharacterMap
}

export const Numbers = ({ onClickNumber, characterMap }: NumbersProps) => {
  const { gameArray } = useSudokuContext()

  return (
    <NumbersWrapper>
      {_.times(9, n => {
        const number = n + 1
        const stringNum = `${number}`
        const count = reduce(gameArray, (acc, value) => acc + (value == stringNum ? 1 : 0), 0)

        return (
          <StatusNumber
            className={count === 9 ? 'full' : undefined}
            key={number}
            onClick={() => onClickNumber(number.toString())}
          >
            {characterMap[`${number}`]}
          </StatusNumber>
        )
      })}
    </NumbersWrapper>
  )
}
