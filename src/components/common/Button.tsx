import styled from 'styled-components'
import { themeColor } from '../../theme'

export const Button = styled.button`
  display: inline-block;
  outline: none;
  cursor: pointer;
  padding: 0 16px;
  background-color: ${themeColor('secondary')};
  border-radius: 0.25rem;
  border: 1px solid ${themeColor('secondary')};
  color: ${themeColor('bgColor')};
  font-size: 13px;
  line-height: 30px;
  font-weight: 400;
  text-align: center;
  :hover {
    background-color: ${themeColor('secondaryLight')};
    border-color: ${themeColor('secondaryLight')};
  }
`
