import _ from 'lodash'
import styled from 'styled-components'
import { useSudokuContext } from '../../context/SudokuContext'
import { themeColor } from '../../theme'
import { CharacterMap } from '../../utils'

const GameBoard = styled.table`
  font-family: 'Noto Sans', sans-serif;
  font-size: 26px;
  margin: 0;
  margin-bottom: 20px;

  border: 2px solid ${themeColor('secondary')};
  border-collapse: collapse;

  .row:nth-child(3n) {
    border-bottom: 2px solid ${themeColor('secondary')};
  }

  .cell {
    user-select: none;
    border: 1px solid ${themeColor('secondaryLighter')};
    padding: 12px 16px;
    color: white;
    cursor: pointer;
    width: 48px;
    height: 48px;
    text-align: center;

    &.filled {
      color: ${themeColor('secondary')};
    }

    &.highlight-selected {
      color: ${themeColor('ternaryDark')};
      background-color: ${themeColor('ternaryDark')};
    }

    &.filled.selected {
      color: ${themeColor('secondary')};
      background-color: ${themeColor('ternary')};
    }

    &.user-filled {
      color: ${themeColor('secondaryLight')} !important;
    }

    &.user-filled.selected {
      color: ${themeColor('secondaryLight')};
      background-color: ${themeColor('ternary')};
    }

    &.filled.highlight-selected {
      color: ${themeColor('secondary')};
      background-color: ${themeColor('ternaryDark')};
    }

    &.user-filled.highlight-selected {
      color: ${themeColor('secondaryLight')};
      background-color: ${themeColor('ternaryDark')};
    }
  }

  .cell:nth-child(3n) {
    border-right: 2px solid ${themeColor('secondary')};
  }

  @media print {
    margin-bottom: 0;
  }
`

type GameSectionProps = {
  onClick: (indexOfArray: number) => void
  characterMap: CharacterMap
}

export const GameSection = ({ onClick, characterMap }: GameSectionProps) => {
  const rows = _.times(9, x => x)
  let { gameArray, cellSelected, initArray } = useSudokuContext()

  const isCellSameAsSelectedCell = (row: number, column: number) => {
    if (cellSelected === row * 9 + column) {
      return true
    }
    if (gameArray[cellSelected] === '0') {
      return false
    }
    if (gameArray[cellSelected] === gameArray[row * 9 + column]) {
      return true
    }
  }

  const selectedCell = (indexOfArray: number, value: string, highlight: string) => {
    if (value !== '0') {
      if (initArray[indexOfArray] === '0') {
        return (
          <td
            className={`cell user-filled ${highlight}selected`}
            key={indexOfArray}
            onClick={() => onClick(indexOfArray)}
          >
            {characterMap[value]}
          </td>
        )
      } else {
        return (
          <td className={`cell filled ${highlight}selected`} key={indexOfArray} onClick={() => onClick(indexOfArray)}>
            {characterMap[value]}
          </td>
        )
      }
    } else {
      return (
        <td className={`cell ${highlight}selected`} key={indexOfArray} onClick={() => onClick(indexOfArray)}>
          {characterMap[value]}
        </td>
      )
    }
  }

  const unselectedCell = (indexOfArray: number, value: string) => {
    if (value !== '0') {
      if (initArray[indexOfArray] === '0') {
        return (
          <td className="cell user-filled" key={indexOfArray} onClick={() => onClick(indexOfArray)}>
            {characterMap[value]}
          </td>
        )
      } else {
        return (
          <td className="cell filled" key={indexOfArray} onClick={() => onClick(indexOfArray)}>
            {characterMap[value]}
          </td>
        )
      }
    } else {
      return <td className="cell" key={indexOfArray} onClick={() => onClick(indexOfArray)}></td>
    }
  }

  return (
    <GameBoard>
      <tbody>
        {_.map(rows, row => {
          return (
            <tr className="row" key={row}>
              {_.map(rows, column => {
                const indexOfArray = row * 9 + column
                const value = gameArray[indexOfArray]

                if (cellSelected === indexOfArray) {
                  return selectedCell(indexOfArray, value, 'highlight-')
                }

                if (cellSelected !== -1 && isCellSameAsSelectedCell(row, column)) {
                  return selectedCell(indexOfArray, value, '')
                } else {
                  return unselectedCell(indexOfArray, value)
                }
              })}
            </tr>
          )
        })}
      </tbody>
    </GameBoard>
  )
}
