export const isSSR = () => typeof window === 'undefined'

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
