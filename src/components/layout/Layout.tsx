import styled from 'styled-components'
import { Header } from './Header'

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Header />
    <main
      style={{
        width: '100%',
        minHeight: 'calc(100vh - 70px)'
      }}
    >
      {children}
    </main>
  </>
)

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 32px auto;
  padding: 0 20px;
`
