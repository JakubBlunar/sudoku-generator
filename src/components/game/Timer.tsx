import { useState, useEffect } from 'react'
import { useSudokuContext } from '../../context/SudokuContext'
import moment from 'moment'
import styled from 'styled-components'
import { themeColor } from '../../theme'
import { isSSR } from '../../utils'

const TimeBox = styled.div`
  position: relative;
  top: 20px;
  left: 10px;
  text-align: center;
  font-family: 'Teko', sans-serif;
  font-size: 30px;
  line-height: 1.5;
  letter-spacing: 0.2em;
  background-color: ${themeColor('ternary')};
  color: ${themeColor('secondaryLight')};
  padding-top: 4px;
  margin: 0 30px;
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
