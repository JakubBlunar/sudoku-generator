import styled from 'styled-components'
import { themeColor } from '../../theme'

const MistakeModeWrapper = styled.div<{ $active: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${({ $active }) => ($active ? themeColor('primary') : themeColor('secondaryLightest'))};
  background: ${({ $active }) => ($active ? themeColor('secondaryLightest') : '#fff')};
  border-radius: 12px;
  cursor: pointer;
  user-select: none;
  transition: border-color 0.14s ease, background-color 0.14s ease;

  & .label {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-width: 0;

    .title {
      font-size: 14px;
      font-weight: 600;
      line-height: 1.2;
      color: ${themeColor('secondary')};
    }

    .desc {
      font-size: 12px;
      font-weight: 400;
      line-height: 1.3;
      color: ${themeColor('muted')};
    }
  }

  & .switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 22px;
    flex: 0 0 auto;

    input {
      opacity: 0;
      position: absolute;
      inset: 0;
      margin: 0;
      pointer-events: none;
    }

    .slider {
      position: absolute;
      inset: 0;
      background-color: ${themeColor('secondaryLighter')};
      border-radius: 22px;
      transition: background-color 0.22s ease, box-shadow 0.22s ease;
      pointer-events: none;
    }

    .slider:before {
      position: absolute;
      content: '';
      height: 18px;
      width: 18px;
      left: 2px;
      top: 2px;
      background-color: ${themeColor('bgColor')};
      border-radius: 50%;
      box-shadow: 0 1px 2px ${themeColor('shadow')};
      transition: transform 0.22s cubic-bezier(0.4, 0, 0.2, 1);
    }

    input:checked ~ .slider {
      background-color: ${themeColor('primary')};
    }

    input:checked ~ .slider:before {
      transform: translateX(18px);
    }

    input:focus-visible ~ .slider {
      box-shadow: 0 0 0 3px ${themeColor('secondaryLighter')};
    }
  }
`

type ModeProps = {
  active: boolean
  onClickMode: () => void
}

export const MistakeMode = (props: ModeProps) => (
  <MistakeModeWrapper $active={props.active} onClick={props.onClickMode}>
    <div className="label">
      <span className="title">Mistakes mode</span>
      <span className="desc">Only accept correct values</span>
    </div>
    <label className="switch" onClick={e => e.preventDefault()}>
      <input type="checkbox" checked={props.active} readOnly />
      <span className="slider" aria-hidden="true"></span>
    </label>
  </MistakeModeWrapper>
)
