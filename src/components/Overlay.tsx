import React from 'react'
import styled, { css } from 'styled-components'
import { themeColor } from '../theme'

const OverlayWrapper = styled.div<{ visible: boolean }>`
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  cursor: pointer;

  .text {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 50%;
    left: 50%;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 60px;
    font-weight: 600;
    color: ${themeColor('ternary')};
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.25);
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }

  ${({ visible }) =>
    visible &&
    css`
      display: block;
    `}
`

export const Overlay: React.FC<{ children: React.ReactNode; visible: boolean; onClick: () => void }> = ({
  children,
  visible,
  onClick
}) => (
  <OverlayWrapper visible={visible} onClick={onClick}>
    <h2 className="text">{children}</h2>
  </OverlayWrapper>
)
