import styled, { css } from 'styled-components'
import { themeColor } from '../../theme'

const base = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  outline: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  border-radius: 10px;
  font-weight: 600;
  font-family: inherit;
  transition: background-color 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease, color 0.16s ease;
  &:focus-visible {
    box-shadow: 0 0 0 3px ${themeColor('secondaryLighter')};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const Button = styled.button`
  ${base}
  padding: 0 18px;
  border: 1px solid ${themeColor('primaryDark')};
  background: linear-gradient(180deg, ${themeColor('primary')} 0%, ${themeColor('primaryDark')} 100%);
  box-shadow: 0 1px 2px ${themeColor('shadow')}, inset 0 1px 0 rgba(255, 255, 255, 0.28);
  color: #fff;
  font-size: 14px;
  line-height: 38px;

  :hover {
    box-shadow: 0 6px 18px ${themeColor('shadowLg')}, inset 0 1px 0 rgba(255, 255, 255, 0.28);
  }
`
