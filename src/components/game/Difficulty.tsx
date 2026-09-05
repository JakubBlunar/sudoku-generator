import React from 'react'
import styled from 'styled-components'
import { useSudokuContext } from '../../context/SudokuContext'
import { themeColor } from '../../theme'

const DifficultyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  & .label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${themeColor('muted')};
  }

  & .select {
    position: relative;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    width: 100%;
    border: 1px solid ${themeColor('secondaryLighter')};
    border-radius: 10px;
    padding: 0 36px 0 12px;
    font-size: 14px;
    font-weight: 600;
    line-height: 38px;
    height: 40px;
    font-family: inherit;
    color: ${themeColor('secondary')};
    background-color: #fff;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%20viewBox%3D%220%200%20292.4%20292.4%22%3E%3Cpath%20fill%3D%22hsl(213%2C%2030%25%2C%2029%25)%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205.4%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 15px auto;
    cursor: pointer;
    transition: border-color 0.14s ease, box-shadow 0.14s ease;

    &:focus-visible {
      outline: none;
      border-color: ${themeColor('primary')};
      box-shadow: 0 0 0 3px ${themeColor('secondaryLighter')};
    }
  }
`

type DifficultyProps = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const Difficulty = (props: DifficultyProps) => {
  const { difficulty } = useSudokuContext()

  return (
    <DifficultyWrapper>
      <span className="label">Difficulty</span>
      <select name="difficulty" className="select" defaultValue={difficulty} onChange={props.onChange}>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
    </DifficultyWrapper>
  )
}
