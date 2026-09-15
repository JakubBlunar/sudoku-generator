import styled from 'styled-components'
import { CharacterMap } from '../../utils'
import { useSudokuContext } from '../../context/SudokuContext'
import { themeColor } from '../../theme'

const NumbersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`

const StatusNumber = styled.button`
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid ${themeColor('secondaryLightest')};
  background: ${themeColor('bgSoft')};
  color: ${themeColor('secondary')};
  font-family: 'Noto Sans', 'Figtree Variable', sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 1;
  padding: 12px 0;
  border-radius: 12px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.14s ease, border-color 0.14s ease, box-shadow 0.14s ease, color 0.14s ease;

  &:hover {
    background: ${themeColor('secondaryLightest')};
    border-color: ${themeColor('secondaryLighter')};
    color: ${themeColor('primaryDark')};
    box-shadow: 0 6px 14px -6px ${themeColor('shadowLg')};
  }

  &:active {
    opacity: 0.88;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${themeColor('secondaryLighter')};
  }

  &.full {
    opacity: 0.35;
    cursor: default;
    &:hover {
      box-shadow: none;
      background: ${themeColor('bgSoft')};
      border-color: ${themeColor('secondaryLightest')};
      color: ${themeColor('secondary')};
    }
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
      {Array.from({ length: 9 }, (_x, n) => {
        const number = n + 1
        const stringNum = `${number}`
        const count = gameArray.reduce((acc, value) => acc + (value === stringNum ? 1 : 0), 0)

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
