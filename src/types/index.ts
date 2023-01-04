export type GameState = 'play' | 'won' | 'lost'

export type SettingType = {
  width: number
  height: number
  ballnums: number | { floor: number, ceil: number }
}
