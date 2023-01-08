import { Ref } from "vue"
import { Direction, DominosaBlock, SettingType } from "~/types"

const directionMap = new Map([
  ['top', [0,-1]],
  ['bottom', [0,1]],
  ['left', [-1,0]],
  ['right', [1,0]],
])

function reverseDirection(from: Direction): Direction {
  switch(from) {
    case 'top':
      return 'bottom'
    case 'bottom':
      return 'top'
    case 'left':
      return 'right'
    case 'right':
      return 'left'
  }
}

export class Play {
  width: number
  height: number
  board: Ref<DominosaBlock[][]>

  constructor(setting: SettingType) {
    const n = setting.orderNum
    this.width = n+2
    this.height = n+1
    this.board = ref(Array.from(
      {length: this.height},
      (_, y) => Array.from(
        {length: this.width},
        (_,x) : DominosaBlock =>({
          id: Math.floor(Math.random()*10),
          x,
          y,
          isDominosa: false,
          withDirection: undefined
        })
      )
    ))
  }

  getNeighbor(b: DominosaBlock, d: Direction) {
    const x = b.x + directionMap.get(d)![0]
    const y = b.y + directionMap.get(d)![1]
    if (x<0 || x>=this.width || y<0 || y>=this.height)
      return undefined
    else
      return this.board.value[y][x]
  }

  changeDominosa({b, d} : {b:DominosaBlock, d:Direction}) {
    const bw = this.getNeighbor(b, d)
    if (!bw) return
    if (!b.isDominosa) {
      b.isDominosa = true
    } else {
      const e = this.getNeighbor(b, b.withDirection!)!
      e.isDominosa = false
      e.withDirection = undefined
    }
    b.withDirection = d
    if (!bw.isDominosa) {
      bw.isDominosa = true
    } else {
      const e = this.getNeighbor(bw, bw.withDirection!)!
      e.isDominosa = false
      e.withDirection = undefined
    }
    bw.withDirection = reverseDirection(d)
  }
}
