import React from 'react'
import { Difficulty } from '../game/Difficulty'
import { Timer } from '../game/Timer'
import { Numbers } from '../game/Numbers'
import { Action } from '../game/Action'
import { MistakeMode } from '../game/Mode'
import styled from 'styled-components'

const StatusSectionWrapper = styled.section`
  width: 30%;
`

const StatusActionsWrapper = styled.div`
  position: relative;
  top: 45px;
  left: 10px;
  display: flex;
  flex-wrap: wrap;
`

type StatusSectionProps = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onClickNumber: (number: string) => void
  onClickUndo: () => void
  onClickErase: () => void
  onClickHint: () => void
  onClickMistakesMode: () => void
  newGame: () => void
}

export const StatusSection = (props: StatusSectionProps) => (
  <StatusSectionWrapper>
    <div>
      <Difficulty onChange={props.onChange} newGame={props.newGame} />
      <Timer />
      <Numbers onClickNumber={number => props.onClickNumber(number)} />
      <StatusActionsWrapper>
        <Action action="undo" onClickAction={props.onClickUndo} />
        <Action action="erase" onClickAction={props.onClickErase} />
        <Action action="hint" onClickAction={props.onClickHint} />
        <MistakeMode onClickMode={props.onClickMistakesMode} />
      </StatusActionsWrapper>
    </div>
  </StatusSectionWrapper>
)
