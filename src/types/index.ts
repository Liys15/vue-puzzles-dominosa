export type GameState = 'play' | 'won' | 'lost'

export interface DominosaBlock {
  id: number
  x: number
  y:number
  isDominosa: boolean
  correctDirection: Direction | undefined
  withDirection: Direction | undefined
  getNeighbor: (d: Direction) => DominosaBlock | undefined
}

export type Direction = 'top' | 'bottom' | 'right' | 'left'

export type SettingType = {
  orderNum: 0 | 1| 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
}
