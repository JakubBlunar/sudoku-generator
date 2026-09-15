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

  // Poll the wall clock every 200ms and derive the display from
  // (now - timeGameStarted). The old 1000ms setInterval skipped a
  // displayed second whenever a tick was delayed by a frame (the clock
  // appeared to pause, then jump two). formatClock returns the same
  // string for up to 5 consecutive polls, so React re-renders only once
  // per displayed second.
  useEffect(() => {
    if (isSSR() || won) return
    setNow(Date.now())
    const id = setInterval(() => {
      setNow(prev => {
        const next = Date.now()
        // Same displayed second -> keep the identical state value so
        // React bails out of the re-render.
        return formatClock(timeGameStarted, next) === formatClock(timeGameStarted, prev) ? prev : next
      })
    }, 200)
    return () => clearInterval(id)
  }, [won, timeGameStarted])

  return formatClock(timeGameStarted, now)
}

export const Timer = () => {
  const time = useTimer()
  return <TimeBox>{time}</TimeBox>
}
