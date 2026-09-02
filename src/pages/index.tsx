import Link from 'next/link'
import styled from 'styled-components'
import { Layout } from '../components/layout/Layout'
import { themeColor } from '../theme'

const Section = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 56px 20px 72px;
  text-align: center;
`

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${themeColor('primaryDark')};
  background: ${themeColor('secondaryLightest')};
  border-radius: 999px;
  padding: 6px 14px;
`

const Title = styled.h1`
  font-size: clamp(34px, 6vw, 56px);
  line-height: 1.08;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${themeColor('secondary')};
  margin: 20px 0 16px;

  .accent {
    background: linear-gradient(92deg, ${themeColor('primary')} 0%, ${themeColor('primaryDark')} 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`

const Subtitle = styled.p`
  max-width: 640px;
  margin: 0 auto 36px;
  font-size: 17px;
  line-height: 1.65;
  color: ${themeColor('muted')};
`

const CtaRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 56px;
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
  padding: 24px;
  border: 1px solid ${themeColor('secondaryLightest')};
  border-radius: 16px;
  background: ${themeColor('bgColor')};
  box-shadow: 0 1px 2px ${themeColor('shadow')};
  color: ${themeColor('secondary')};
  text-decoration: none;
  transition: border-color 0.16s ease, box-shadow 0.16s ease;

  :hover {
    border-color: ${themeColor('secondaryLighter')};
  }

  :focus-visible {
    box-shadow: 0 0 0 3px ${themeColor('secondaryLighter')};
  }

  .card-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: ${themeColor('secondaryLightest')};
    color: ${themeColor('primaryDark')};
    font-size: 22px;
    margin-bottom: 6px;
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
    margin-top: 10px;
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
  transition: border-color 0.16s ease, filter 0.16s ease;

  :hover {
    border-color: ${themeColor('secondary')};
    filter: brightness(0.96);
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
  transition: border-color 0.16s ease, background-color 0.16s ease, color 0.16s ease;

  :hover {
    border-color: ${themeColor('primary')};
    color: ${themeColor('primaryDark')};
  }

  :focus-visible {
    box-shadow: 0 0 0 3px ${themeColor('secondaryLighter')};
  }
`

const IndexPage = () => (
  <Layout>
    <Section>
      <Badge>Sudoku · online + printable</Badge>
      <Title>
        Play sudoku, or print it on <span className="accent">A4</span>
      </Title>
      <Subtitle>
        A little web app for playing sudoku in the browser and for generating crisp, print-ready A4 sheets of puzzles —
        up to six games per page, cut along the lines.
      </Subtitle>
      <CtaRow>
        <CtaButton href="/game">Play sudoku</CtaButton>
        <GhostCtaButton href="/generator">Generate a print sheet</GhostCtaButton>
      </CtaRow>
      <Cards>
        <CardLink href="/game">
          <span className="card-icon">🎯</span>
          <span className="card-title">Play sudoku</span>
          <span className="card-desc">
            Fill the grid with the number pad, undo, erase, get a hint, or switch on mistakes mode to only accept
            correct values.
          </span>
          <span className="card-cta">Open the game →</span>
        </CardLink>
        <CardLink href="/alphabet-game">
          <span className="card-icon">🔤</span>
          <span className="card-title">Alphabet sudoku</span>
          <span className="card-desc">
            The same puzzle mechanics, with letters instead of numbers — a different grid to solve in the browser.
          </span>
          <span className="card-cta">Open the game →</span>
        </CardLink>
        <CardLink href="/generator">
          <span className="card-icon">🖨️</span>
          <span className="card-title">Printable generator</span>
          <span className="card-desc">
            Choose how many games and how many starting cells. The sheet prints on A4/Letter with up to six games per
            page.
          </span>
          <span className="card-cta">Open the generator →</span>
        </CardLink>
      </Cards>
    </Section>
  </Layout>
)

export default IndexPage
