import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { Layout } from '../components/layout/Layout'
import { Button } from '../components/common/Button'
import { SudokuBoard, Puzzle } from '../components/generator/SudokuBoard'
import { getUniqueSudoku } from '../solver/UniqueSudoku'
import { themeColor } from '../theme'

const PUZZLES_PER_PAGE = 9
const MIN_PAGES = 1
const MAX_PAGES = 40
const MIN_GIVENS = 20
const MAX_GIVENS = 40

type Sheet = Puzzle[]

/**
 * One printable puzzle with exactly `givens` starting numbers.
 * Returns `initArray` directly: '0' = blank, '1'..'9' = given —
 * exactly what `SudokuBoard` renders.
 */
const generatePuzzle = (givens: number): Puzzle => {
  const [initPuzzle] = getUniqueSudoku('Easy', givens)
  return initPuzzle
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  padding: 8px 0 40px;
`

const ControlBar = styled.section`
  display: flex;
  align-items: flex-end;
  gap: 22px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 18px 22px;
  background: ${themeColor('bgColor')};
  border: 1px solid ${themeColor('secondaryLightest')};
  border-radius: 14px;
  box-shadow: 0 12px 30px -22px ${themeColor('shadowLg')};
`

const Field = styled.label`
  display: flex;
  flex-direction: column;
  min-width: 190px;
  flex: 1 1 220px;
  max-width: 340px;

  .field-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
  }

  .field-name {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: ${themeColor('muted')};
  }

  output {
    font-size: 15px;
    font-weight: 700;
    color: ${themeColor('ink')};
    font-variant-numeric: tabular-nums;
  }

  input[type='range'] {
    width: 100%;
    margin: 8px 0 2px;
    accent-color: ${themeColor('primary')};
    cursor: pointer;
  }
`

const ActionCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 6px;
  min-width: 150px;
`

const Hint = styled.small`
  color: ${themeColor('muted')};
  font-size: 12px;
  text-align: center;
  white-space: nowrap;
`

const StatusLine = styled.p`
  font-size: 13px;
  color: ${themeColor('muted')};
`

/**
 * On-A4 geometry (print). Cell height is fixed in SudokuBoard (9.46mm); this
 * component's padding + gap set the cell width and the overall fit:
 *   width:  (210 − 2·8 − 2·6) / 3 = 60.67mm boards → ~6.3mm wide cells
 *   height: 3·89.6 + 2·6 + 2·8 = 296.8mm  (≤ 297 A4, no clipping) ✓
 * Lean 8mm margins (word-search style) keep the 3 × 3 boards large-print.
 * Captions are hidden on paper; on screen everything scales to the viewport.
 */
const Sheet = styled.div`
  width: 100%;
  max-width: min(74vh, 760px);
  background: #fff;
  border: 1px solid ${themeColor('secondaryLightest')};
  border-radius: 12px;
  box-shadow: 0 22px 45px -34px ${themeColor('shadowLg')};
  padding: 22px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  align-content: start;

  @media print {
    width: 210mm;
    max-width: none;
    border: none;
    border-radius: 0;
    box-shadow: none;
    padding: 8mm;
    padding-bottom: 0;
    gap: 3mm;
    page-break-after: always;
    break-after: page;

    &:last-of-type {
      page-break-after: auto;
      break-after: auto;
    }
  }
`

const PuzzleSlot = styled.figure`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  page-break-inside: avoid;

  figcaption {
    font-size: 13px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: ${themeColor('muted')};

    /* Hidden on paper — the grid fills the page and the numbers are already
    large enough to know which puzzle a line of work belongs to. */
    @media print {
      display: none;
    }
  }
`

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`

const GenerateButton = styled(Button)`
  white-space: nowrap;
  padding: 0 26px;
`

const SecondaryButton = styled(Button)`
  border: 1px solid ${themeColor('secondaryLighter')};
  background: ${themeColor('bgColor')};
  color: ${themeColor('ink')};

  :hover {
    background: ${themeColor('secondaryLightest')};
    border-color: ${themeColor('secondaryLighter')};
    box-shadow: 0 6px 18px ${themeColor('shadowLg')};
  }
`

const RegenerateIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
  </svg>
)

const PrintIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v7H6z" />
  </svg>
)

export default function Generator() {
  const [pages, setPages] = useState(3)
  const [givens, setGivens] = useState(30)
  const [sheets, setSheets] = useState<Sheet[]>([])
  const [doneSheets, setDoneSheets] = useState(0)
  const [generating, setGenerating] = useState(true)
  // Bumped by the Regenerate button: same settings, freshly shuffled batch.
  const [generation, setGeneration] = useState(0)
  // Monotonic job counter: only the latest trigger may keep generating.
  const jobRef = useRef(0)

  // Scope the print-only CSS to this page so /game, /alphabet-game, etc.
  // print normally. The class is set on <body> before first paint.
  useEffect(() => {
    document.body.classList.add('print-sheet-page')
    return () => document.body.classList.remove('print-sheet-page')
  }, [])

  // (Re)generate when either slider settles. Debounced so dragging a slider
  // doesn't recompute on every tick, and each sheet's 9 puzzles are built
  // in a batch so the preview streams in without blocking the UI.
  useEffect(() => {
    let cancelled = false
    const job = ++jobRef.current
    setSheets([])
    setDoneSheets(0)
    setGenerating(true)

    const clamped = Math.max(MIN_PAGES, Math.min(MAX_PAGES, pages))
    const run = (sheetIdx: number) => {
      if (cancelled || jobRef.current !== job) return
      if (sheetIdx >= clamped) {
        setGenerating(false)
        return
      }
      const sheet: Sheet = new Array(PUZZLES_PER_PAGE)
      for (let i = 0; i < PUZZLES_PER_PAGE; i++) sheet[i] = generatePuzzle(givens)
      if (cancelled || jobRef.current !== job) return
      setSheets((prev) => [...prev, sheet])
      setDoneSheets(sheetIdx + 1)
      // Yield to React so each sheet paints before the next one is built.
      window.setTimeout(() => run(sheetIdx + 1), 0)
    }

    const t = window.setTimeout(() => run(0), 250)
    return () => {
      cancelled = true
      window.clearTimeout(t)
    }
  }, [pages, givens, generation])

  const totalPuzzles = Math.min(MAX_PAGES, pages) * PUZZLES_PER_PAGE

  return (
    <Layout>
      <Head>
        <title>Sudoku generator — printable A4 sheets</title>
        <meta name="description" content="Generate free printable sudoku games on A4 sheets" />
      </Head>
      <Page className="print-root">
        <ControlBar className="no-print" aria-label="Print options">
          <Field>
            <span className="field-head">
              <span className="field-name" id="pages-label">Pages to print</span>
              <output aria-live="polite">
                {pages}
              </output>
            </span>
            <input
              id="pages"
              type="range"
              min={MIN_PAGES}
              max={MAX_PAGES}
              step={1}
              value={pages}
              aria-labelledby="pages-label"
              onChange={(e) => setPages(Number(e.target.value))}
            />
          </Field>
          <Field>
            <span className="field-head">
              <span className="field-name" id="givens-label">Starting numbers</span>
              <output aria-live="polite">
                {givens}
              </output>
            </span>
            <input
              id="givens"
              type="range"
              min={MIN_GIVENS}
              max={MAX_GIVENS}
              step={1}
              value={givens}
              aria-labelledby="givens-label"
              onChange={(e) => setGivens(Number(e.target.value))}
            />
          </Field>
          <ActionCol>
            <ActionButtons>
              <SecondaryButton
                type="button"
                onClick={() => setGeneration((g) => g + 1)}
                disabled={generating}
              >
                <RegenerateIcon /> Regenerate
              </SecondaryButton>
              <GenerateButton type="button" onClick={() => window.print()} disabled={generating || sheets.length === 0}>
                <PrintIcon /> Print
              </GenerateButton>
            </ActionButtons>
            <Hint aria-live="polite">
              {generating
                ? `Generating… ${doneSheets}/${Math.min(MAX_PAGES, pages)} pages`
                : `${totalPuzzles} puzzles, A4 portrait`}
            </Hint>
          </ActionCol>
        </ControlBar>

        {generating && sheets.length === 0 && <StatusLine className="no-print">Shuffling a fresh sheet…</StatusLine>}

        {sheets.map((sheet, si) => (
          /* className merges with the styled component's generated class */
          <Sheet key={si} className="print-sheet" aria-label={`Sheet ${si + 1} of ${Math.min(MAX_PAGES, pages)}`}>
            {sheet.map((puzzle, pi) => {
              const n = si * PUZZLES_PER_PAGE + pi + 1
              return (
                <PuzzleSlot key={pi}>
                  <SudokuBoard puzzle={puzzle} />
                  <figcaption>{n}</figcaption>
                </PuzzleSlot>
              )
            })}
          </Sheet>
        ))}
      </Page>
    </Layout>
  )
}
