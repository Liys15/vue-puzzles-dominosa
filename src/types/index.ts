export type GameState = 'play' | 'won' | 'lost'

export interface DominosaBlock {
  id: number
  x: number
  y:number
  isDominosa: boolean
  withDirection: Direction | undefined
}

export type Direction = 'top' | 'bottom' | 'right' | 'left'

export type SettingType = {
  orderNum: 0 | 3 | 4 | 5 | 6 | 7 | 8 | 9
}
