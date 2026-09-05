import { useState, useEffect } from 'react'
import { useSudokuContext } from '../../context/SudokuContext'
import moment from 'moment'
import styled from 'styled-components'
import { themeColor } from '../../theme'
import { isSSR } from '../../utils'

const TimeBox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-align: center;
  width: 104px;
  font-family: 'TEKO', sans-serif;
  font-size: 27px;
  line-height: 1.2;
  letter-spacing: 0.14em;
  height: 40px;
  font-variant-numeric: tabular-nums;
  color: ${themeColor('secondary')};
  background: linear-gradient(180deg, ${themeColor('secondaryLightest')} 0%, ${themeColor('ternary')} 100%);
  border: 1px solid ${themeColor('secondaryLighter')};
  border-radius: 12px;
  padding: 8px 16px 3px;
`

const useTimer = () => {
  let [currentTime, setCurrentTime] = useState(moment())
  let { timeGameStarted, won } = useSudokuContext()

  const tick = () => {
    setCurrentTime(moment())
  }

  useEffect(() => {
    if (isSSR()) return
    if (!won) setTimeout(() => tick(), 1000)
  })

  let secondsTotal = currentTime.diff(timeGameStarted, 'seconds')
  if (secondsTotal <= 0) return '00:00'
  let duration = moment.duration(secondsTotal, 'seconds')
  let hours = duration.hours()
  let minutes = duration.minutes()
  let seconds = duration.seconds()
  let stringTimer = ''

  stringTimer += hours ? '' + hours + ':' : ''
  stringTimer += minutes ? (minutes < 10 ? '0' : '') + minutes + ':' : '00:'
  stringTimer += seconds < 10 ? '0' + seconds : seconds

  return stringTimer
}

export const Timer = () => {
  const time = useTimer()
  return <TimeBox>{time}</TimeBox>
}
