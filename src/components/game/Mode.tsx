import styled from 'styled-components'
import { themeColor } from '../../theme'

const MistakeModeWrapper = styled.div`
  text-align: center;
  position: relative;
  width: 60%;

  & .switch {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    top: 16px;
    display: inline-block;
    width: 46px;
    height: 26px;

    input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: ${themeColor('secondaryLighter')};
      border-radius: 26px;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

    .slider:before {
      position: absolute;
      content: '';
      height: 20px;
      width: 20px;
      left: 3px;
      bottom: 3px;
      background-color: ${themeColor('bgColor')};
      border-radius: 50%;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

    input:checked + .slider {
      background-color: ${themeColor('primary')};
    }

    input:focus + .slider {
      box-shadow: 0 0 1px ${themeColor('primary')};
    }

    input:checked + .slider:before {
      -webkit-transform: translateX(20px);
      -ms-transform: translateX(20px);
      transform: translateX(20px);
    }
  }

  & .text {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.2;
    padding-top: 50px;
  }
`

type ModeProps = {
  onClickMode: () => void
}

export const MistakeMode = (props: ModeProps) => (
  <MistakeModeWrapper>
    <label className="switch">
      <input type="checkbox" />
      <span className="slider" onClick={props.onClickMode}></span>
    </label>
    <p className="text">{'Mistakes Mode'}</p>
  </MistakeModeWrapper>
)
