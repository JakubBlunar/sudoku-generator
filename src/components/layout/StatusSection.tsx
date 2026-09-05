import React from 'react'
import { Difficulty } from '../game/Difficulty'
import { Timer } from '../game/Timer'
import { Numbers } from '../game/Numbers'
import { Action } from '../game/Action'
import { MistakeMode } from '../game/Mode'
import styled from 'styled-components'
import { CharacterMap } from '../../utils'
import { themeColor } from '../../theme'
import { Button } from '../common/Button'

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
`

const TimerRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: end;
  gap: 12px;
`

const ActionsRow = styled.div`
  display: flex;
  gap: 8px;
`

type StatusSectionProps = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onClickNumber: (number: string) => void
  onClickUndo: () => void
  onClickErase: () => void
  onClickHint: () => void
  onClickMistakesMode: () => void
  mistakesMode: boolean
  newGame: () => void
  characterMap: CharacterMap
}

export const StatusSection = (props: StatusSectionProps) => (
  <Panel>
    <Button onClick={props.newGame} type="button">
      New Game
    </Button>

    <TimerRow>
      <Timer />
      <Difficulty onChange={props.onChange} />
    </TimerRow>

    <Numbers characterMap={props.characterMap} onClickNumber={number => props.onClickNumber(number)} />

    <ActionsRow>
      <Action action="undo" onClickAction={props.onClickUndo} />
      <Action action="erase" onClickAction={props.onClickErase} />
      <Action action="hint" onClickAction={props.onClickHint} />
    </ActionsRow>

    <MistakeMode active={props.mistakesMode} onClickMode={props.onClickMistakesMode} />
  </Panel>
)
