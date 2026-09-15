import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { themeColor } from '../theme'

const overlayFade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const cardRise = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -46%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`

/* The overlay sits above the sticky header (z-index 50). */
const OverlayWrapper = styled.div<{ visible: boolean }>`
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 100;
  cursor: pointer;

  ${({ visible }) =>
    visible &&
    css`
      display: block;
      animation: overlayFade 0.25s ease-out;
    `}
`

const Card = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-align: center;
  background: ${themeColor('bgColor')};
  border: 1px solid ${themeColor('secondaryLightest')};
  border-radius: 20px;
  padding: 30px 44px 26px;
  box-shadow:
    0 1px 2px ${themeColor('shadow')},
    0 24px 64px -24px ${themeColor('shadowLg')};
  animation: ${cardRise} 0.3s cubic-bezier(0.22, 1, 0.36, 1);

  h2 {
    font-size: clamp(28px, 6vw, 44px);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: ${themeColor('secondary')};
    line-height: 1.15;
  }

  .overlay-time {
    font-size: 15px;
    font-weight: 500;
    color: ${themeColor('muted')};
    font-variant-numeric: tabular-nums;
  }

  .overlay-hint {
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid ${themeColor('secondaryLightest')};
    font-size: 13px;
    font-weight: 500;
    color: ${themeColor('secondaryLight')};
  }
`

export const Overlay: React.FC<{ children: React.ReactNode; visible: boolean; onClick: () => void }> = ({
  children,
  visible,
  onClick
}) => (
  <OverlayWrapper visible={visible} onClick={onClick}>
    <Card>{children}</Card>
  </OverlayWrapper>
)
