export const isSSR = () => typeof window === 'undefined'

/* m:ss (or h:mm:ss) elapsed between two epoch-millisecond timestamps.
 * Shared by the live Timer and the win overlay's final time. */
export const formatClock = (started: number, now: number): string => {
  const total = Math.max(0, Math.floor((now - started) / 1000))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  return `${h > 0 ? h + ':' : ''}${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export type CharacterMap = Record<string, string | number>

export const defaultCharacterMap: CharacterMap = {
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9
}
