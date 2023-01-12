export type GameState = 'play' | 'won' | 'lost'

export interface DominosaBlock {
  id: number
  x: number
  y:number
  isDominosa: boolean
  isRepeat: boolean
  genDirection?: Direction
  withDirection?: Direction
  getNeighbor: (d: Direction) => DominosaBlock | undefined
}

export type Direction = 'top' | 'bottom' | 'right' | 'left'

export type SettingType = {
  orderNum: 0 | 1| 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
}
