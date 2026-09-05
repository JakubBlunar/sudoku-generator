import Link from 'next/link'
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
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${themeColor('primaryDark')};
  background: ${themeColor('bgColor')};
  border: 1px solid ${themeColor('secondaryLightest')};
  border-radius: 999px;
  padding: 7px 15px;
  box-shadow: 0 1px 2px ${themeColor('shadow')};
`

const BadgeDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${themeColor('primary')};
  box-shadow: 0 0 0 3px ${themeColor('secondaryLightest')};
`

const Title = styled.h1`
  font-size: clamp(36px, 5.4vw, 58px);
  line-height: 1.06;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: ${themeColor('secondary')};
  margin: 22px 0 18px;

  .accent {
    background: linear-gradient(92deg, ${themeColor('primary')} 0%, ${themeColor('primaryDark')} 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
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
  font-weight: 600;
  color: ${themeColor('muted')};

  li {
    display: inline-flex;
    align-items: center;
    gap: 7px;
  }

  li::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${themeColor('primary')};
    opacity: 0.7;
  }
`

const BoardFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`

const BoardCaption = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px 16px;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${themeColor('secondaryLight')};

  .legend {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
  }

  .dot-ink {
    background: ${themeColor('ink')};
  }

  .dot-blue {
    background: ${themeColor('primaryDark')};
  }
`

const SectionHeading = styled.h2`
  font-size: clamp(24px, 3.4vw, 32px);
  font-weight: 800;
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

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  text-align: left;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 26px 24px;
  border: 1px solid ${themeColor('secondaryLightest')};
  border-radius: 18px;
  background: linear-gradient(180deg, ${themeColor('bgColor')} 0%, ${themeColor('bgSoft')} 100%);
  box-shadow: 0 1px 2px ${themeColor('shadow')};
  color: ${themeColor('secondary')};
  text-decoration: none;
  transform: translateY(0);
  transition:
    transform 0.22s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.22s ease,
    box-shadow 0.22s ease;

  :hover {
    transform: translateY(-4px);
    border-color: ${themeColor('secondaryLighter')};
    box-shadow: 0 18px 34px -20px ${themeColor('shadowLg')}, 0 2px 6px ${themeColor('shadow')};
  }

  :focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${themeColor('secondaryLighter')};
  }

  .card-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 46px;
    border-radius: 13px;
    background: ${themeColor('secondaryLightest')};
    color: ${themeColor('primaryDark')};
    font-size: 22px;
    margin-bottom: 8px;
    box-shadow: inset 0 0 0 1px ${themeColor('secondaryLighter')};
  }

  .card-title {
    font-size: 17px;
    font-weight: 700;
    color: ${themeColor('secondary')};
  }

  .card-desc {
    font-size: 14.5px;
    line-height: 1.55;
    color: ${themeColor('muted')};
  }

  .card-cta {
    margin-top: 12px;
    font-size: 13.5px;
    font-weight: 600;
    color: ${themeColor('primaryDark')};
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
  border: 1px solid ${themeColor('primaryDark')};
  background: linear-gradient(180deg, ${themeColor('primary')} 0%, ${themeColor('primaryDark')} 100%);
  box-shadow: 0 1px 2px ${themeColor('shadow')}, inset 0 1px 0 rgba(255, 255, 255, 0.28);
  color: #fff;
  transition: border-color 0.16s ease, filter 0.16s ease, transform 0.16s ease;

  :hover {
    border-color: ${themeColor('secondary')};
    filter: brightness(0.96);
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

const CtaBand = styled.div`
  position: relative;
  margin-top: 72px;
  padding: 44px 32px;
  border-radius: 20px;
  border: 1px solid ${themeColor('secondaryLightest')};
  background:
    radial-gradient(500px 200px at 85% 0%, ${themeColor('secondaryLightest')} 0%, transparent 70%),
    ${themeColor('bgColor')};
  text-align: center;
  box-shadow: 0 1px 2px ${themeColor('shadow')};

  h2 {
    font-size: clamp(22px, 3vw, 28px);
    font-weight: 800;
    letter-spacing: -0.02em;
    color: ${themeColor('secondary')};
    margin-bottom: 10px;
  }

  p {
    max-width: 460px;
    margin: 0 auto 24px;
    font-size: 15px;
    line-height: 1.6;
    color: ${themeColor('muted')};
  }

  > div {
    justify-content: center;
    margin: 0 auto 0;
  }
`

const IndexPage = () => (
  <Layout>
    <Section>
      <Hero>          
        <HeroCopy>
          <Badge>
            <BadgeDot />
            Sudoku · online + printable
          </Badge>
          <Title>
            Watch a sudoku <span className="accent">solve itself</span>, then solve one for real
          </Title>
          <Subtitle>
            A little web app for playing sudoku in the browser and for generating crisp, print-ready A4 sheets of
            puzzles — up to six games per page, cut along the lines. Free, no sign-up, straight from the grid.
          </Subtitle>
          <CtaRow>
            <CtaButton href="/game">Play sudoku</CtaButton>
            <GhostCtaButton href="/generator">Generate a print sheet</GhostCtaButton>
          </CtaRow>
          <MetaRow>
            <li>No sign-up</li>
            <li>Runs in your browser</li>
            <li>Prints on A4 / Letter</li>
          </MetaRow>
        </HeroCopy>
        <BoardFrame>
          <AnimatedSudokuBoard />
          <BoardCaption>Fresh puzzle, generated live</BoardCaption>
        </BoardFrame>
      </Hero>

      <SectionHeading>Three ways to play</SectionHeading>
      <SectionSub>
        Classic numbers, letters instead of digits, or a full sheet ready for the printer.
      </SectionSub>
      <Cards>
        <CardLink href="/game">
          <span className="card-icon" aria-hidden>🎯</span>
          <span className="card-title">Play sudoku</span>
          <span className="card-desc">
            Fill the grid with the number pad, undo, erase, get a hint, or switch on mistakes mode to only accept
            correct values.
          </span>
          <span className="card-cta">Open the game →</span>
        </CardLink>
        <CardLink href="/alphabet-game">
          <span className="card-icon" aria-hidden>🔤</span>
          <span className="card-title">Alphabet sudoku</span>
          <span className="card-desc">
            The same puzzle mechanics, with letters instead of numbers — a different grid to solve in the browser.
          </span>
          <span className="card-cta">Open the game →</span>
        </CardLink>
        <CardLink href="/generator">
          <span className="card-icon" aria-hidden>🖨️</span>
          <span className="card-title">Printable generator</span>
          <span className="card-desc">
            Choose how many games and how many starting cells. The sheet prints on A4/Letter with up to six games per
            page.
          </span>
          <span className="card-cta">Open the generator →</span>
        </CardLink>
      </Cards>

      <CtaBand>
        <h2>Ready for a fresh puzzle?</h2>
        <p>Every game is generated with a unique solution, and the sheets are ready to print in seconds.</p>
        <CtaRow>
          <CtaButton href="/game">Start playing</CtaButton>
          <GhostCtaButton href="/generator">Make a print sheet</GhostCtaButton>
        </CtaRow>
      </CtaBand>
    </Section>
  </Layout>
)

export default IndexPage
