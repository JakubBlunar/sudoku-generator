import Link from 'next/link'
import styled from 'styled-components'
import { themeColor } from '../../theme'
import { Button } from '../common/Button'

const HeaderWrapper = styled.header`
  position: relative;
  border-bottom: 2px solid ${themeColor('secondary')};
  padding: 15px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;

  h1,
  button {
    margin-inline-end: 20px;
  }

  h1 {
    font-size: 24px;
    font-weight: 600;
    color: ${themeColor('secondary')};

    cursor: pointer;
  }

  .g1 {
    color: ${themeColor('primary')};
  }

  .g2 {
    color: ${themeColor('secondaryLight')};
  }
`

export const Header = () => {
  return (
    <HeaderWrapper className="header">
      <Link href="/">
        <h1>
          Su<span className="g1">do</span>
          <span className="g2">ku</span>
        </h1>
      </Link>
      <Link href="/game">
        <Button>Play sudoku</Button>
      </Link>
      <Link href="/alphabet-game">
        <Button>Play Alphabet sudoku</Button>
      </Link>
      <Link href="/generator">
        <Button>Generator</Button>
      </Link>
    </HeaderWrapper>
  )
}
