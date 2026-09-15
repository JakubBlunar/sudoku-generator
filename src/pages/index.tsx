import Link from 'next/link'
import type { ReactNode } from 'react'
import styled from 'styled-components'
import { Layout } from '../components/layout/Layout'
import { themeColor } from '../theme'
import { AnimatedSudokuBoard } from '../components/home/AnimatedSudokuBoard'

const Section = styled.div`
  position: relative;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 48px 20px 64px;

  &::before {
    content: '';
    position: absolute;
    inset: -40px -20% 0;
    pointer-events: none;
    background-image:
      linear-gradient(${themeColor('secondaryLightest')} 1px, transparent 1px),
      linear-gradient(90deg, ${themeColor('secondaryLightest')} 1px, transparent 1px);
    background-size: 44px 44px;
    mask-image: radial-gradient(60% 55% at 70% 20%, #000 0%, transparent 100%);
    -webkit-mask-image: radial-gradient(60% 55% at 70% 20%, #000 0%, transparent 100%);
    opacity: 0.55;
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`

const Hero = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  align-items: center;
  gap: 48px;
  margin-bottom: 64px;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
`

const HeroCopy = styled.div`
  @media (max-width: 880px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 600;
  color: ${themeColor('primaryDark')};
  background: ${themeColor('bgColor')};
  border: 1px solid ${themeColor('secondaryLightest')};
  border-radius: 999px;
  padding: 6px 14px;
  box-shadow: 0 1px 2px ${themeColor('shadow')};
`

const Title = styled.h1`
  font-size: clamp(36px, 5.4vw, 58px);
  line-height: 1.06;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: ${themeColor('secondary')};
  margin: 22px 0 18px;

  .accent {
    color: ${themeColor('primaryDark')};
  }
`

const Subtitle = styled.p`
  max-width: 540px;
  font-size: 17px;
  line-height: 1.65;
  color: ${themeColor('muted')};

  @media (max-width: 880px) {
    margin: 0 auto;
  }
`

const CtaRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin: 32px 0 26px;

  @media (max-width: 880px) {
    justify-content: center;
  }
`

const MetaRow = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 13.5px;
  font-weight: 500;
  color: ${themeColor('muted')};
`

const BoardFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`

const BoardCaption = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: ${themeColor('secondaryLight')};
`

const SectionHeading = styled.h2`
  font-size: clamp(24px, 3.4vw, 32px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${themeColor('secondary')};
  text-align: center;
  margin-bottom: 10px;
`

const SectionSub = styled.p`
  max-width: 520px;
  margin: 0 auto 34px;
  text-align: center;
  font-size: 15.5px;
  line-height: 1.6;
  color: ${themeColor('muted')};
`

/* --- "Three ways to play" ----------------------------------------------
 * Three full-width ledger rows in ONE surface, not three equal cards. The
 * rows stay put on hover: only the row's background tints and the arrow
 * nudges forward — no per-row lift. */

const WaysList = styled.nav`
  border: 1px solid ${themeColor('secondaryLightest')};
  border-radius: 18px;
  background: ${themeColor('bgColor')};
  box-shadow: 0 1px 2px ${themeColor('shadow')};
  overflow: hidden;
`

const WayRow = styled(Link)`
  display: grid;
  grid-template-columns: 64px 48px minmax(0, 1fr) auto auto;
  grid-template-areas: 'index icon copy thumb cta';
  align-items: center;
  gap: 8px 18px;
  padding: 24px 28px;
  color: ${themeColor('secondary')};
  text-decoration: none;
  transition: background-color 0.18s ease;

  &:not(:first-child) {
    border-top: 1px solid ${themeColor('secondaryLightest')};
  }

  &:hover {
    background: ${themeColor('bgSoft')};
  }

  :focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 3px ${themeColor('secondaryLighter')};
  }

  .way-index {
    grid-area: index;
    font-family: 'Space Grotesk Variable', sans-serif;
    font-size: 24px;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: ${themeColor('secondaryLighter')};
    font-variant-numeric: tabular-nums;
  }

  .way-icon {
    grid-area: icon;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 46px;
    border-radius: 13px;
    background: ${themeColor('secondaryLightest')};
    color: ${themeColor('primaryDark')};
    transition: background-color 0.18s ease, color 0.18s ease;
  }

  :hover .way-icon {
    background: ${themeColor('primary')};
    color: #fff;
  }

  .way-copy {
    grid-area: copy;
    min-width: 0;
  }

  .way-title {
    display: block;
    font-family: 'Space Grotesk Variable', sans-serif;
    font-size: 17px;
    font-weight: 600;
    color: ${themeColor('secondary')};
  }

  .way-desc {
    display: block;
    margin-top: 4px;
    font-size: 14.5px;
    line-height: 1.55;
    color: ${themeColor('muted')};
  }

  .way-thumb {
    grid-area: thumb;
  }

  .way-cta {
    grid-area: cta;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 13.5px;
    font-weight: 600;
    white-space: nowrap;
    color: ${themeColor('primaryDark')};
  }

  .way-cta svg {
    transition: transform 0.18s ease;
  }

  :hover .way-cta svg {
    transform: translateX(4px);
  }

  @media (max-width: 760px) {
    grid-template-columns: 48px minmax(0, 1fr) auto;
    grid-template-areas:
      'icon copy'
      'icon cta';
    gap: 10px 14px;
    padding: 22px 20px;

    .way-index,
    .way-thumb {
      display: none;
    }

    .way-cta {
      margin-top: 2px;
    }
  }
`

const CtaButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  outline: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  line-height: 46px;
  padding: 0 28px;
  border: 1px solid ${themeColor('primary')};
  background: ${themeColor('primary')};
  box-shadow: 0 1px 2px ${themeColor('shadow')};
  color: ${themeColor('bgColor')};
  transition: background-color 0.16s ease, border-color 0.16s ease, transform 0.16s ease;

  :hover {
    background: ${themeColor('primaryDark')};
    border-color: ${themeColor('primaryDark')};
    transform: translateY(-1px);
  }

  :focus-visible {
    box-shadow: 0 0 0 3px ${themeColor('secondaryLighter')};
  }
`

const GhostCtaButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  outline: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  line-height: 44px;
  padding: 0 26px;
  border: 1px solid ${themeColor('secondaryLighter')};
  background: ${themeColor('bgColor')};
  color: ${themeColor('secondary')};
  transition: border-color 0.16s ease, background-color 0.16s ease, color 0.16s ease, transform 0.16s ease;

  :hover {
    border-color: ${themeColor('primary')};
    color: ${themeColor('primaryDark')};
    transform: translateY(-1px);
  }

  :focus-visible {
    box-shadow: 0 0 0 3px ${themeColor('secondaryLighter')};
  }
`

/* On-brand row icons: 3x3 grid motifs matching the favicon. */
const PlayIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M9.33 4v16M14.67 4v16M4 9.33h16M4 14.67h16" />
    <rect x="9.9" y="9.9" width="4.2" height="4.2" fill="currentColor" stroke="none" rx="0.6" />
  </svg>
)

const LetterIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 19 12 5l5 14M8.8 14.5h6.4" />
  </svg>
)

const SheetIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden>
    <path d="M7 3.5h7.5L19 8v12.5H7z" />
    <path d="M14.5 3.5V8H19" />
    <path d="M10 12.5h6M10 15.5h6M10 18.5h4" />
  </svg>
)

const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

/* Small A4 thumbnail on the generator row — the product's output at a
 * glance (tall grids, like the real sheet). */
const WayThumb = () => {
  const cells: ReactNode[] = []
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const x = 4 + col * 12
      const y = 7.5 + row * 15
      cells.push(
        <g key={`${row}-${col}`} stroke="hsl(213, 30%, 35%)" fill="none">
          <rect x={x} y={y} width="10" height="13" strokeWidth="0.7" />
          <path d={`M${x + 3.33} ${y}v13M${x + 6.66} ${y}v13M${x} ${y + 4.33}h10M${x} ${y + 8.66}h10`} strokeWidth="0.35" />
        </g>
      )
    }
  }
  return (
    <svg width="42" height="58" viewBox="0 0 42 58" aria-hidden>
      <rect x="0.5" y="0.5" width="41" height="57" rx="2" fill="#fff" stroke="hsl(213, 30%, 88%)" />
      {cells}
    </svg>
  )
}

/* --- Bottom CTA band ------------------------------------------------------
 * Two columns: the flow, explained; and a real A4 sheet (SVG at the true
 * 210:297 ratio, same line weights the printer emits) so the "tear it out"
 * flow is visible, not just described. */

const CtaBand = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 40px;
  align-items: center;
  margin-top: 72px;
  padding: 44px 40px;
  border-radius: 20px;
  border: 1px solid ${themeColor('secondaryLightest')};
  background:
    radial-gradient(500px 220px at 88% 0%, ${themeColor('secondaryLightest')} 0%, transparent 70%),
    ${themeColor('bgColor')};
  box-shadow: 0 1px 2px ${themeColor('shadow')};

  h2 {
    font-size: clamp(22px, 3vw, 28px);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: ${themeColor('secondary')};
    margin-bottom: 10px;
  }

  p {
    max-width: 480px;
    margin: 0;
    margin-top: 15px;
    font-size: 15px;
    line-height: 1.6;
    color: ${themeColor('muted')};
  }

  ${CtaRow} {
    margin: 26px 0 0;
    justify-content: flex-start;
  }

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 40px 28px;

    p {
      margin: 15px auto;
    }

    ${CtaRow} {
      justify-content: center;
    }
  }
`

const SheetStack = styled.div`
  position: relative;
  width: 240px;
  justify-self: center;
  transform: rotate(2deg);

  .sheet-back {
    position: absolute;
    inset: 0;
    transform: translate(-14px, 10px) rotate(-4deg);
    background: #fff;
    border: 1px solid ${themeColor('secondaryLightest')};
    border-radius: 3px;
    box-shadow: 0 12px 28px -18px ${themeColor('shadowLg')};
  }

  svg.sheet-front {
    position: relative;
    display: block;
    width: 240px;
    height: auto;
    border-radius: 3px;
    border: 1px solid ${themeColor('secondaryLighter')};
    box-shadow: 0 24px 48px -24px ${themeColor('shadowLg')};
  }

  @media (max-width: 860px) {
    width: 200px;
    margin: 10px auto 0;

    svg.sheet-front {
      width: 200px;
    }
  }
`

const SheetCaption = styled.p`
  margin-top: 16px;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  color: ${themeColor('secondaryLight')};
`

const BandSheet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

/* A miniature of the real sheet, drawn in A4 millimetres. Board geometry
 * mirrors the print output: 8mm margins, 3mm gutters, tall 62.6 x 89.6mm
 * boards, 0.6mm frame/box lines, 0.2mm grid lines, Noto Sans digits. The
 * givens come from one fixed valid puzzle (each sheet shows a different
 * third of them) so the mock is stable across renders and hydration. */
const A4_W = 210
const A4_H = 297
const A4_M = 8
const A4_GAP = 3
const BW = (A4_W - 2 * A4_M - 2 * A4_GAP) / 3
const BH = 89.6
const PUZZLE = '5300700006001950000980000608000600034008030017000200060600000280000419005000080079'

const SheetBoard = ({ x, y, b }: { x: number; y: number; b: number }) => {
  const lines: ReactNode[] = []
  for (let i = 0; i <= 9; i++) {
    const heavy = i === 0 || i === 9 || i % 3 === 0
    const sw = heavy ? 0.6 : 0.2
    lines.push(<line key={`v${i}`} x1={x + (i * BW) / 9} y1={y} x2={x + (i * BW) / 9} y2={y + BH} stroke="#000" strokeWidth={sw} />)
    lines.push(<line key={`h${i}`} x1={x} y1={y + (i * BH) / 9} x2={x + BW} y2={y + (i * BH) / 9} stroke="#000" strokeWidth={sw} />)
  }
  const digits: ReactNode[] = []
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const idx = r * 9 + c
      const v = PUZZLE[idx]
      if (v === '0' || (idx + b) % 9 >= 3) continue
      digits.push(
        <text
          key={idx}
          x={x + (c + 0.5) * (BW / 9)}
          y={y + (r + 0.5) * (BH / 9) + 1.8}
          textAnchor="middle"
          fontSize="4.8"
          fontWeight="700"
          fill="#000"
          fontFamily="'Noto Sans', sans-serif"
        >
          {v}
        </text>
      )
    }
  }
  return (
    <g>
      {lines}
      {digits}
    </g>
  )
}

const SheetPreview = () => (
  <BandSheet>
    <SheetStack>
      <div className="sheet-back" aria-hidden />
      <svg
        className="sheet-front"
        viewBox={`0 0 ${A4_W} ${A4_H}`}
        role="img"
        aria-label="A4 sheet with nine sudoku puzzles, three per row"
      >
        <rect x="0" y="0" width={A4_W} height={A4_H} fill="#fff" />
        {[0, 1, 2].map(row =>
          [0, 1, 2].map(col => (
            <SheetBoard key={`${row}-${col}`} x={A4_M + col * (BW + A4_GAP)} y={A4_M + row * (BH + A4_GAP)} b={row * 3 + col} />
          ))
        )}
      </svg>
    </SheetStack>
    <SheetCaption>A4 portrait · 9 puzzles per sheet</SheetCaption>
  </BandSheet>
)

const IndexPage = () => (
  <Layout>
    <Section>
      <Hero>
        <HeroCopy>
          <Badge>Online and printable</Badge>
          <Title>
            Watch a sudoku <span className="accent">solve itself</span>, then solve one for real
          </Title>
          <Subtitle>
            Play in the browser, or generate crisp A4 sheets with 9 puzzles a page and tear them out of the sheet.
            Free, no sign-up.
          </Subtitle>
          <CtaRow>
            <CtaButton href="/game">Play sudoku</CtaButton>
            <GhostCtaButton href="/generator">Generate a print sheet</GhostCtaButton>
          </CtaRow>
          <MetaRow>
            <li>No sign-up</li>
            <li>Runs in your browser</li>
            <li>Prints on A4 or Letter</li>
          </MetaRow>
        </HeroCopy>
        <BoardFrame>
          <AnimatedSudokuBoard />
          <BoardCaption>Fresh puzzle, generated live</BoardCaption>
        </BoardFrame>
      </Hero>

      <SectionHeading>Three ways to play</SectionHeading>
      <SectionSub>Classic numbers, letters instead of digits, or a full sheet ready for the printer.</SectionSub>
      <WaysList aria-label="Ways to play">
        <WayRow href="/game">
          <span className="way-index" aria-hidden>
            01
          </span>
          <span className="way-icon" aria-hidden>
            <PlayIcon />
          </span>
          <span className="way-copy">
            <span className="way-title">Play sudoku</span>
            <span className="way-desc">
              Fill the grid with the number pad, undo, erase, take a hint, or switch on mistakes mode to only accept
              correct values.
            </span>
          </span>
          <span className="way-cta">
            Open the game <ArrowIcon />
          </span>
        </WayRow>
        <WayRow href="/alphabet-game">
          <span className="way-index" aria-hidden>
            02
          </span>
          <span className="way-icon" aria-hidden>
            <LetterIcon />
          </span>
          <span className="way-copy">
            <span className="way-title">Alphabet sudoku</span>
            <span className="way-desc">The same puzzle mechanics, with letters instead of digits.</span>
          </span>
          <span className="way-cta">
            Open the game <ArrowIcon />
          </span>
        </WayRow>
        <WayRow href="/generator">
          <span className="way-index" aria-hidden>
            03
          </span>
          <span className="way-icon" aria-hidden>
            <SheetIcon />
          </span>
          <span className="way-copy">
            <span className="way-title">Printable generator</span>
            <span className="way-desc">
              Pick the page count and the starting numbers, then print crisp A4 sheets with 9 puzzles each.
            </span>
          </span>
          <span className="way-thumb" aria-hidden>
            <WayThumb />
          </span>
          <span className="way-cta">
            Open the generator <ArrowIcon />
          </span>
        </WayRow>
      </WaysList>

      <CtaBand>
        <div>
          <h2>Nine puzzles on one sheet</h2>
          <p>
            Pick the page count and the starting numbers, print on A4, and tear each puzzle out along the grid frame.
            The digits are set big and black for easy reading.
          </p>
          <CtaRow>
            <CtaButton href="/game">Play sudoku</CtaButton>
            <GhostCtaButton href="/generator">Generate a print sheet</GhostCtaButton>
          </CtaRow>
        </div>
        <SheetPreview />
      </CtaBand>
    </Section>
  </Layout>
)

export default IndexPage
