import styled from 'styled-components'
import { Header } from './Header'

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Header />
    <div>{children}</div>
  </>
)

export const ContentWrapper = styled.div`
  margin: 30px;
`
