import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { themeColor } from '../../theme'

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid ${themeColor('secondaryLightest')};
  box-shadow: 0 1px 0 ${themeColor('shadow')};

  .logo {
    display: inline-flex;
    align-items: baseline;
    font-size: 27px;
    font-weight: 750;
    letter-spacing: -0.015em;
    line-height: 1;
    text-decoration: none;

    .g1 {
      color: ${themeColor('secondary')};
    }

    .g2 {
      color: ${themeColor('primary')};
      transition: color 0.16s ease;
    }

    .g3 {
      color: ${themeColor('secondaryLight')};
    }

    &:hover .g2 {
      color: ${themeColor('primaryDark')};
    }
  }

  nav {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-left: auto;

    a + a {
      margin-left: 4px;
    }
  }

  .btn {
    display: inline-block;
    outline: none;
    cursor: pointer;
    padding: 0 14px;
    background-color: transparent;
    border-radius: 10px;
    border: 1px solid transparent;
    color: ${themeColor('muted')};
    font-size: 13.5px;
    line-height: 38px;
    font-weight: 500;
    text-align: center;
    text-decoration: none;
    transition: background-color 0.16s ease, border-color 0.16s ease, color 0.16s ease;

    &:hover {
      background-color: ${themeColor('secondaryLightest')};
      color: ${themeColor('secondary')};
    }

    &:focus-visible {
      box-shadow: 0 0 0 3px ${themeColor('secondaryLighter')};
    }

    &[aria-current='page'] {
      background-color: ${themeColor('secondary')};
      border-color: ${themeColor('secondary')};
      color: ${themeColor('bgColor')};

      &:hover {
        background-color: ${themeColor('secondary')};
        color: ${themeColor('bgColor')};
      }
    }
  }

  @media (max-width: 720px) {
    padding: 10px 16px;

    .logo {
      order: 1;
      font-size: 24px;
    }

    nav {
      order: 2;
      margin-left: 0;
      flex: 1 1 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      gap: 4px;
      padding-bottom: 2px;
      scrollbar-width: thin;

      a + a {
        margin-left: 4px;
      }
    }

    .btn {
      white-space: nowrap;
      font-size: 12.5px;
      line-height: 34px;
      padding: 0 12px;
    }
  }

  @media (max-width: 480px) {
    .btn {
      font-size: 12px;
      padding: 0 10px;
      line-height: 32px;
    }
  }
`

const NAV = [
  { href: '/game', label: 'Play sudoku', path: '/game' },
  { href: '/alphabet-game', label: 'Alphabet sudoku', path: '/alphabet-game' },
  { href: '/generator', label: 'Generator', path: '/generator' }
]

export const Header = () => {
  const { asPath } = useRouter()
  const path = asPath.split('?')[0]

  return (
    <HeaderWrapper className="header">
      <Link href="/" className="logo">
        <span className="g1">Su</span>
        <span className="g2">do</span>
        <span className="g3">ku</span>
      </Link>
      <nav>
        {NAV.map(({ href, label, path: activePath }) => (
          <Link
            key={href}
            href={href}
            className="btn"
            aria-current={path === activePath ? 'page' : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>
    </HeaderWrapper>
  )
}
