import React, { useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { theme, themeColor } from '../../theme'

const CELL_COUNT = 81

/* --- pacing (ms) ---------------------------------------------------- */
const STAGGER_MS = 210 // delay between each blank cell filling in
const FILL_START_MS = 600 // delay from givens popping in to the first blank
const SOLVED_HOLD_MS = 120000 // how long the finished grid stays on screen
const REDUCED_MOTION_HOLD_MS = 8000 // longer hold when animation is reduced

type CellState = {
  value: string
  given: boolean
  filled: boolean
}

type Phase = 'idle' | 'solving' | 'solved'

const makeBlankCells = (): CellState[] =>
  Array.from({ length: CELL_COUNT }, () => ({
    value: '',
    given: false,
    filled: false,
  }))

const shuffle = <T,>(input: readonly T[]): T[] => {
  const arr = input.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }
  return arr
}

/**
 * Generates a valid, complete 9x9 sudoku grid as an 81-char string of '1'..'9'.
 *
 * Uses the classic base pattern
 *   value(r, c) = (r*3 + floor(r/3) + c) % 9
 * and then applies structure-preserving permutations:
 *   - row-groups (0,1,2)
 *   - rows within each group (0,1,2)
 *   - column-groups (0,1,2)
 *   - columns within each group (0,1,2)
 *   - symbol relabeling (0..8)
 *
 * All of these are sudoku isomorphisms, so the result is always a valid grid,
 * but has plenty of visual variety per cycle. Instant, no backtracking.
 */
const generateSolution = (): string => {
  const base = (r: number, c: number) => (r * 3 + ((r / 3) | 0) + c) % 9
  const rgOrder = shuffle([0, 1, 2])
  const riOrder = shuffle([0, 1, 2])
  const cgOrder = shuffle([0, 1, 2])
  const ciOrder = shuffle([0, 1, 2])
  const symOrder = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8])

  const out = new Array<string>(81)
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const rg = (r / 3) | 0
      const ri = r % 3
      const cg = (c / 3) | 0
      const ci = c % 3
      const nr = rgOrder[rg] * 3 + riOrder[ri]
      const nc = cgOrder[cg] * 3 + ciOrder[ci]
      out[r * 9 + c] = String(symOrder[base(nr, nc)] + 1)
    }
  }
  return out.join('')
}

/**
 * Picks a random subset of cells to be the "givens" (pre-filled) cells.
 * Biasing towards a spread so the board reads like a real puzzle.
 */
const pickGivens = (count: number): boolean[] => {
  const givens = new Array<boolean>(81).fill(false)
  const order = shuffle(Array.from({ length: 81 }, (_, i) => i))
  const target = Math.max(17, Math.min(35, count))
  for (let i = 0; i < target; i++) {
    givens[order[i]] = true
  }
  return givens
}

const popIn = keyframes`
  0% {
    transform: scale(0.5) translateY(5px);
    opacity: 0;
    filter: blur(3px);
  }
  55% {
    transform: scale(1.12) translateY(-1px);
    opacity: 1;
  }
  100% {
    transform: scale(1) translateY(0);
    filter: blur(0);
  }
`

const floatBoard = keyframes`
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
`

const blink = keyframes`
  0%, 100% { opacity: 0.25; transform: scale(0.85); }
  50%      { opacity: 1;    transform: scale(1); }
`

const BoardWrap = styled.div`
  position: relative;
  width: min(100%, 470px);
  margin: 0 auto;
  padding-top: 20px;
  /* The float animation lives on this wrapper (not on Board) so the
  board AND the phase badge move together in lockstep. */
  animation: ${floatBoard} 7s ease-in-out infinite;
  will-change: transform;
  filter: drop-shadow(0 30px 50px ${themeColor('shadowLg')});

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const PhaseBadge = styled.span<{ $phase: Phase }>`
  position: absolute;
  top: 0;
  right: 14px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 12px 6px 10px;
  border-radius: 999px;
  background: ${({ $phase }) => ($phase === 'solved' ? theme.colors.success : theme.colors.primary)};
  color: #fff;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  box-shadow: 0 10px 20px -12px ${themeColor('shadowLg')};
  transition: background-color 260ms ease;

  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.95);
    animation: ${({ $phase }) => ($phase === 'solving' ? css`${blink} 900ms ease-in-out infinite` : 'none')};
    opacity: ${({ $phase }) => ($phase === 'solving' ? 1 : 0.35)};
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      animation: none;
    }
  }
`

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  width: 100%;
  aspect-ratio: 1 / 1;
  padding: 8px;
  background: #fff;
  border: 2.5px solid ${theme.colors.ink};
  border-radius: 18px;
  box-shadow: 0 30px 70px -40px ${themeColor('shadowLg')}, 0 2px 6px ${themeColor('shadow')};
  /* No animation here — the float lives on BoardWrap so the badge
  animates in perfect sync (same element, same transform). */
`

const Cell = styled.div<{
  $row: number;
  $col: number;
  $filled: boolean;
  $given: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(12px, 2.9vw, 22px);
  font-weight: ${({ $given }) => ($given ? 750 : 600)};
  font-variant-numeric: tabular-nums;
  user-select: none;
  color: ${({ $filled, $given }) => (!$filled ? 'transparent' : $given ? theme.colors.ink : theme.colors.primaryDark)};
  background: ${({ $filled, $given }) => (!$filled || $given ? '#fff' : theme.colors.secondaryLightest)};
  /* The board frame covers the top/left edges and the outer right/bottom edges,
  and thick lines sit after cols/rows 2 & 5, so the last col/row draw no border
  of their own to avoid a doubled edge (consistent with top & left cells). */
  border-right: ${({ $col }) => ($col === 8 ? 'none' : $col === 2 || $col === 5 ? `2.5px solid ${theme.colors.ink}` : `1.5px solid ${theme.colors.gridLine}`)};
  border-bottom: ${({ $row }) => ($row === 8 ? 'none' : $row === 2 || $row === 5 ? `2.5px solid ${theme.colors.ink}` : `1.5px solid ${theme.colors.gridLine}`)};
  animation: ${({ $filled }) => ($filled ? css`${popIn} 340ms cubic-bezier(0.22, 1, 0.36, 1)` : 'none')};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const AnimatedSudokuBoard: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [cells, setCells] = useState<CellState[]>(makeBlankCells)
  const [phase, setPhase] = useState<Phase>('idle')
  const [inView, setInView] = useState(false)

  // Only run the animation while the board is actually on screen —
  // on mobile it sits below the fold, so wait for the user to scroll to it.
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return

    let cancelled = false
    const timers: number[] = []
    const push = (t: number) => timers.push(t)

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const setCell = (index: number, value: string, given: boolean) => {
      if (cancelled) return
      setCells((prev) => {
        const next = prev.slice()
        next[index] = { value, given, filled: true }
        return next
      })
    }

    const startCycle = () => {
      if (cancelled) return
      setPhase('solving')

      // Small beat so the "solving" state registers before the board pops in.
      push(window.setTimeout(() => {
        if (cancelled) return

        const solution = generateSolution()
        const givens = pickGivens(28)

        const initial: CellState[] = new Array(CELL_COUNT)
        const blanks: number[] = []
        for (let i = 0; i < CELL_COUNT; i++) {
          const isGiven = givens[i]
          initial[i] = {
            value: solution[i],
            given: isGiven,
            filled: isGiven,
          }
          if (!isGiven) blanks.push(i)
        }

        setCells(initial)

        if (prefersReducedMotion) {
          // Show the whole solved grid without per-cell animation.
          const full = initial.map((c) => ({ ...c, filled: true }))
          push(window.setTimeout(() => {
            if (cancelled) return
            setCells(full)
            setPhase('solved')
          }, 60))
          push(window.setTimeout(startCycle, REDUCED_MOTION_HOLD_MS))
          return
        }

        // Animate the blanks filling in a scrambled order for an "solving" feel.
        const order = shuffle(blanks)
        order.forEach((idx, k) => {
          push(
            window.setTimeout(() => {
              setCell(idx, solution[idx], false)
              if (k === order.length - 1) {
                push(window.setTimeout(() => setPhase('solved'), 220))
                push(window.setTimeout(startCycle, SOLVED_HOLD_MS))
              }
            }, FILL_START_MS + k * STAGGER_MS)
          )
        })
      }, 120))
    }

    startCycle()
    return () => {
      cancelled = true
      timers.forEach((t) => clearTimeout(t))
    }
  }, [inView])

  return (
    <BoardWrap ref={wrapRef}>
      <PhaseBadge $phase={phase} role="status" aria-live="polite">
        {phase === 'solving' ? 'Solving' : phase === 'solved' ? 'Solved' : 'Sudoku'}
      </PhaseBadge>
      <Board aria-hidden="true" aria-label="Decorative sudoku board filling itself with numbers">
        {cells.map((c, i) => {
          const row = (i / 9) | 0
          const col = i % 9
          return (
            <Cell
              key={i}
              $row={row}
              $col={col}
              $filled={c.filled}
              $given={c.given}
            >
              {c.filled ? c.value : ''}
            </Cell>
          )
        })}
      </Board>
    </BoardWrap>
  )
}

export default AnimatedSudokuBoard
