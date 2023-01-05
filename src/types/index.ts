export type GameState = 'play' | 'won' | 'lost'

export interface DominosaBlock {
  num: number
  isDominosa: boolean
  withDirection: Direction | undefined
}

export type Direction = 'top' | 'bottom' | 'right' | 'left'

export type SettingType = {
  width: number
  height: number
  ballnums: number | { floor: number, ceil: number }
}
