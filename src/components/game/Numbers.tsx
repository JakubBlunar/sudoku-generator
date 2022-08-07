import _ from 'lodash'
import styled from 'styled-components'

const NumbersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  position: relative;
  top: 40px;
  left: 10px;
`

const StatusNumber = styled.div`
  text-align: center;
  font-family: 'Noto Sans', sans-serif;
  font-size: 26px;
  padding: 12px 0;
  cursor: pointer;
`

type NumbersProps = {
  onClickNumber: (number: string) => void
}

export const Numbers = ({ onClickNumber }: NumbersProps) => (
  <NumbersWrapper>
    {_.times(9, n => {
      const number = n + 1

      return (
        <StatusNumber key={number} onClick={() => onClickNumber(number.toString())}>
          {number}
        </StatusNumber>
      )
    })}
  </NumbersWrapper>
)
