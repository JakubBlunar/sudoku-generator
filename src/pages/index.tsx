import Link from 'next/link'
import styled from 'styled-components'
import { Layout } from '../components/layout/Layout'
import { themeColor } from '../theme'

const ContentWrapper = styled.div`
  margin: 10px 30px;

  p {
    margin: 10px 0;
    color: ${themeColor('text')};
    font-size: 18px;
    font-weight: 400;
  }

  h2 {
    margin-top: 20px;
  }
`

const IndexPage = () => (
  <Layout>
    <ContentWrapper>
      <h1>Sudoku game and printable sudoku generator</h1>
      <p>
        This webpage is small web app I have created for printing sudoku games for my grandpa. You can also play sudoku
        directly <Link href="/game">here</Link>.
      </p>

      <h2>Generating printable sudoku</h2>
      <p>
        Following this <Link href="/generator">link</Link> you can configure generator for generating printable sudoku
        games. You can specify how many fields should be prefilled and how many sudoku games do you want. Page will
        generate your games for printable A4 format. Each page can contain up to 6 sudoku games.
      </p>
    </ContentWrapper>
  </Layout>
)

export default IndexPage
