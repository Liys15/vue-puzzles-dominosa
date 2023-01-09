import { Ref } from "vue"
import { Direction, DominosaBlock, SettingType } from "~/types"

const directionMap: Map<Direction, [number,number]> = new Map([
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

function pickOne<T>(arr: T[]) {
  const idx = Math.floor(Math.random()*arr.length)
  return arr.splice(idx, 1)[0]
}

export class Play {
  width: number = 0
  height: number = 0
  dominosaCards: [number, number][] = []
  board: Ref<DominosaBlock[][]> = ref([])

  constructor(setting: SettingType) {
    this.reset(setting)
  }

  reset(setting: SettingType) {
    const n = setting.orderNum
    this.width = n+2
    this.height = n+1
    this.dominosaCards = []
    for (let i=0; i<=n; i++)
      for (let j=i; j<=n; j++)
        this.dominosaCards.push([i, j])
    this.dominosaCards.sort(() => Math.random()-0.5)
    this.board.value = this.initBoard()
    this.generateGame()
  }

  private initBoard() {
    const board =  Array.from({length: this.height},
      (_, y): DominosaBlock[] => Array.from({length: this.width},
        (_,x): DominosaBlock => ({
          id: 0,
          x,
          y,
          isDominosa: false,
          correctDirection: undefined,
          withDirection: undefined,
          getNeighbor: (d:Direction) => {
            const x1 = x + directionMap.get(d)![0]
            const y1 = y + directionMap.get(d)![1]
            if (x1<0 || x1>=this.width || y1<0 || y1>=this.height)
              return undefined
            else
              return board[y1][x1]
          }
        })
      )
    )
    return board
  }

  private getAvaiableDirection(b: DominosaBlock) {
    const siblingPaths: Direction[] = []
    directionMap.forEach((_, d) => {
      const bn = b.getNeighbor(d)
      if (!bn || bn.isDominosa) return
      siblingPaths.push(d)
    })
    return siblingPaths
  }

  private getNextBlock():DominosaBlock | undefined {
    const flatBoard = this.board.value.flat()
    return flatBoard.find((b) => !b.isDominosa)
  }

  private generateGame() {
    const dominoNums = this.dominosaCards.length
    const dominoLeap: [DominosaBlock, DominosaBlock][] = []
    const pathsLeap: Direction[][] = []
    let cardidx = 0
    while (cardidx<dominoNums) {
      let curBlock = this.getNextBlock()!
      const paths = this.getAvaiableDirection(curBlock)
      if (paths.length===0) {
        while (!pathsLeap.at(-1)!.length) {
          pathsLeap.pop()
          const domino = dominoLeap.pop()!
          domino.forEach((b) => {
            b.isDominosa = false
            b.withDirection = undefined
          })
          cardidx = cardidx - 1
        }
        const anotherPath = pickOne(pathsLeap.at(-1)!)
        let [b, bw] = dominoLeap.pop()!
        b.withDirection = anotherPath
        bw.isDominosa = false
        bw = b.getNeighbor(anotherPath)!
        bw.isDominosa = true
        bw.withDirection = reverseDirection(anotherPath)
        dominoLeap.push([b, bw])
      } else {
        const pickPath = pickOne(paths)
        pathsLeap.push(paths)
        const bw = curBlock.getNeighbor(pickPath)!
        curBlock.isDominosa = true
        bw.isDominosa = true
        curBlock.withDirection = pickPath
        bw.withDirection = reverseDirection(pickPath)
        curBlock.id = this.dominosaCards[cardidx][0]
        bw.id = this.dominosaCards[cardidx][1]
        dominoLeap.push([curBlock, bw])
        cardidx = cardidx + 1
      }
    }
  }

  changeDominosa({b, d} : {b:DominosaBlock, d:Direction}) {
    const bw = b.getNeighbor(d)
    if (!bw) return
    if (!b.isDominosa) {
      b.isDominosa = true
    } else {
      const e = b.getNeighbor(b.withDirection!)!
      e.isDominosa = false
      e.withDirection = undefined
    }
    b.withDirection = d
    if (!bw.isDominosa) {
      bw.isDominosa = true
    } else {
      const e = bw.getNeighbor(bw.withDirection!)!
      e.isDominosa = false
      e.withDirection = undefined
    }
    bw.withDirection = reverseDirection(d)
  }
}
