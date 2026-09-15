import { useState, useEffect } from 'react'
import { useSudokuContext } from '../../context/SudokuContext'
import styled from 'styled-components'
import { themeColor } from '../../theme'
import { formatClock, isSSR } from '../../utils'

const TimeBox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-align: center;
  width: 104px;
  font-family: 'Figtree Variable', sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0.04em;
  height: 40px;
  font-variant-numeric: tabular-nums;
  color: ${themeColor('secondary')};
  background: ${themeColor('secondaryLightest')};
  border: 1px solid ${themeColor('secondaryLighter')};
  border-radius: 12px;
  padding: 4px 16px 3px;
`

const useTimer = () => {
  const [now, setNow] = useState(Date.now())
  const { timeGameStarted, won } = useSudokuContext()

  // One interval, cleared on unmount / win. The old version scheduled a
  // fresh setTimeout on *every render* with no deps or cleanup, so the
  // tickers stacked and the clock ran fast.
  useEffect(() => {
    if (isSSR() || won) return
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [won])

  return formatClock(timeGameStarted, now)
}

export const Timer = () => {
  const time = useTimer()
  return <TimeBox>{time}</TimeBox>
}
