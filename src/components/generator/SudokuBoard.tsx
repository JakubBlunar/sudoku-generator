import React from 'react'
import styled from 'styled-components'

/**
 * One printable sudoku puzzle, used by the `/generator` preview.
 *
 * `puzzle` is 81 cells: `'0'` = blank, `'1'`..`'9'` = given.
 *
 * Geometry: the board is NOT a square — each cell is taller than wide so the
 * digits can be big (large-print, kitchen-table readable). It's rendered as a
 * border-COLLAPSED `<table>`: neighbors share a single collapsed line instead
 * of each cell painting its own two borders, which is what was leaving a faint
 * double edge where a cell border met the board's frame in print. Same trick the
 * word-search generator uses (a collapsed table + fixed cell height).
 */
export type Puzzle = string[]

/* The output is black-and-white print, so the preview uses the SAME pure-black
 * line color the printer emits — no themed gray for the printer to misrender. */
const LINE = '#000'

const Board = styled.table`
  /* Collapsed table (not a flex grid): one shared border per interior edge, so
  there is no cell-vs-frame doubling anywhere, including the outer four edges. */
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
  background: #fff;
  font-family: 'Noto Sans', 'Source Sans Pro', sans-serif;

  td {
    text-align: center;
    vertical-align: middle;
    padding: 0;
    border: 1px solid ${LINE};
    box-sizing: border-box;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: ${LINE};
    user-select: none;
    /* Screen-only: cells taller than wide (like print). An explicit height is
    used because aspect-ratio and container queries don't resolve reliably on
    a collapsed table. */
    height: 35px;
    font-size: 15px;
  }

  /* 3x3 box dividers are medium, the outer frame is the boldest. With border-
  collapse the WIDER border wins at each shared edge, so these override the
  thin td border cleanly (no doubled lines). */
  .edge-top { border-top: 2.5px solid ${LINE}; }
  .edge-bottom { border-bottom: 2.5px solid ${LINE}; }
  .edge-left { border-left: 2.5px solid ${LINE}; }
  .edge-right { border-right: 2.5px solid ${LINE}; }
  .div-r { border-right: 2px solid ${LINE}; }
  .div-b { border-bottom: 2px solid ${LINE}; }

  @media print {
    /* Fixed mm geometry. The COLUMN width from .sheet (p=8mm, g=6mm) sets cell
    width: (210 − 2·8 − 2·6)/3 = 60.67mm board. Only the cell HEIGHT is pinned;
    it carries the "taller than wide" shape:
      row borders = 2·0.9 + 2·0.6 + 6·0.25 = 4.5mm
      board h     = 9·9.46 + 4.5 = 89.6mm
      sheet h     = 3·89.6 + 2·6 + 2·8 = 296.8mm  (≤ 297, no clip)
    Cell ≈ 6.3 × 9.46mm (≈ 1.5 : 1) → big digit for low-vision readers. */
    td {
      height: 10mm;
      font-size: 8mm;
      border-width: 0.2mm;
      border-color: #999999;
    }
    .edge-top { border-top-width: 0.6mm; }
    .edge-bottom { border-bottom-width: 0.6mm; }
    .edge-left { border-left-width: 0.6mm; }
    .edge-right { border-right-width: 0.6mm; }
  }
`

const cellClass = (r: number, c: number): string => {
  const cls: string[] = []
  if (r === 0) cls.push('edge-top')
  if (r === 8  || r === 2 || r === 5) cls.push('edge-bottom')
  if (c === 0) cls.push('edge-left')
  if (c === 8 || c === 2 || c === 5) cls.push('edge-right')
  return cls.join(' ')
}

export const SudokuBoard: React.FC<{ puzzle: Puzzle }> = ({ puzzle }) => (
  <Board role="img" aria-label="Sudoku puzzle with pre-filled numbers">
    <tbody>
      {Array.from({ length: 9 }, (_, r) => (
        <tr key={r}>
          {Array.from({ length: 9 }, (_, c) => {
            const v = puzzle[r * 9 + c]
            return (
              <td key={c} className={cellClass(r, c)}>
                {v === '0' ? null : v}
              </td>
            )
          })}
        </tr>
      ))}
    </tbody>
  </Board>
)

export default SudokuBoard
