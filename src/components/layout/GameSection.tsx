import _ from 'lodash'
import styled, { keyframes } from 'styled-components'
import { useSudokuContext } from '../../context/SudokuContext'
import { themeColor } from '../../theme'
import { CharacterMap } from '../../utils'

/* A user-entered digit drops in from slightly above and settles — subtle
 * enough not to read as gimmick on fast entry. Runs once per fill: the span
 * is keyed by its value, so a changed value remounts it and replays the
 * pop. Givens never animate. */
const cellPop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

/* Wrong value with mistakes mode on: quick horizontal shake in red, then the
 * digit is dropped (see Game.tsx). Only the digit span moves, the cell and
 * its collapsed borders stay put. */
const digitShake = keyframes`
  0%,
  100% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-4px);
  }
  40% {
    transform: translateX(4px);
  }
  60% {
    transform: translateX(-3px);
  }
  80% {
    transform: translateX(3px);
  }
`

const GameBoard = styled.table`
  font-family: 'Noto Sans', 'Figtree Variable', sans-serif;
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

    .digit {
      display: inline-block;
    }

    /* Soft cross-highlight under the selected cell's row, column and 3x3
    box; same-value cells tint a little stronger. */
    &.in-line {
      background-color: ${themeColor('primaryLightest')};
    }

    &.same-value {
      background-color: ${themeColor('primaryLight')};
    }

    &.user-filled {
      color: ${themeColor('secondaryLight')} !important;

      .digit {
        animation: ${cellPop} 0.14s ease-out;
      }
    }

    &.filled {
      color: ${themeColor('secondary')};
    }

    /* The selected cell keeps the original strong fill (declared after the
    tints so it wins where they overlap). */
    &.highlight-selected {
      color: ${themeColor('ternaryDark')};
      background-color: ${themeColor('ternaryDark')};
    }

    &.filled.highlight-selected {
      color: ${themeColor('secondary')};
      background-color: ${themeColor('ternaryDark')};
    }

    &.user-filled.highlight-selected {
      color: ${themeColor('secondaryLight')};
      background-color: ${themeColor('ternaryDark')};
    }

    /* Mistakes mode: the rejected digit shakes in red, then clears. */
    &.mistake .digit {
      animation: ${digitShake} 0.4s ease-in-out;
      color: ${themeColor('danger')};
    }
  }

  .cell:nth-child(3n) {
    border-right: 2px solid ${themeColor('secondary')};
  }

  @media print {
    margin-bottom: 0;

    /* Interaction states never reach paper. */
    .cell.in-line,
    .cell.same-value,
    .cell.highlight-selected {
      background-color: none;
    }

    .cell.user-filled .digit,
    .cell.mistake .digit {
      animation: none;
    }
  }
`

type GameSectionProps = {
  onClick: (indexOfArray: number) => void
  characterMap: CharacterMap
}

export const GameSection = ({ onClick, characterMap }: GameSectionProps) => {
  const rows = _.times(9, x => x)
  let { gameArray, cellSelected, initArray, mistake } = useSudokuContext()

  const boxIndex = (row: number, column: number) => Math.floor(row / 3) * 3 + Math.floor(column / 3)
  const selectedRow = cellSelected >= 0 ? Math.floor(cellSelected / 9) : -1
  const selectedColumn = cellSelected >= 0 ? cellSelected % 9 : -1
  const selectedBox = cellSelected >= 0 ? boxIndex(selectedRow, selectedColumn) : -1
  const selectedValue = cellSelected >= 0 ? gameArray[cellSelected] : '0'

  const isCellSameAsSelectedCell = (row: number, column: number) => {
    if (cellSelected === row * 9 + column) {
      return true
    }
    if (selectedValue === '0') {
      return false
    }
    if (selectedValue === gameArray[row * 9 + column]) {
      return true
    }
  }

  const isCellInSelectedLine = (row: number, column: number) =>
    cellSelected !== -1 && (row === selectedRow || column === selectedColumn || boxIndex(row, column) === selectedBox)

  return (
    <GameBoard>
      <tbody>
        {_.map(rows, row => {
          return (
            <tr className="row" key={row}>
              {_.map(rows, column => {
                const indexOfArray = row * 9 + column
                const value = gameArray[indexOfArray]
                const isGiven = initArray[indexOfArray] !== '0'
                const isMistake = mistake !== null && mistake.index === indexOfArray
                // A rejected digit is shown transiently from the mistake
                // state, without committing it to the game.
                const displayValue = isMistake ? mistake.value : value

                let className = 'cell'
                if (displayValue !== '0') {
                  className += isGiven ? ' filled' : ' user-filled'
                }
                if (cellSelected === indexOfArray) {
                  className += ' highlight-selected'
                } else if (cellSelected !== -1 && isCellSameAsSelectedCell(row, column)) {
                  className += ' same-value'
                }
                if (isCellInSelectedLine(row, column)) {
                  className += ' in-line'
                }
                if (isMistake) {
                  className += ' mistake'
                }

                return (
                  <td
                    // The nonce remounts the cell so a repeated mistake on
                    // the same cell replays the shake.
                    key={isMistake ? `${indexOfArray}-m${mistake.nonce}` : indexOfArray}
                    className={className}
                    onClick={() => onClick(indexOfArray)}
                  >
                    {displayValue !== '0' ? (
                      // Keyed by value so a changed user entry remounts the
                      // span and replays the pop.
                      <span className="digit" key={displayValue}>
                        {characterMap[displayValue]}
                      </span>
                    ) : null}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </GameBoard>
  )
}
