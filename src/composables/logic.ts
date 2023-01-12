import { GameState, Direction, DominosaBlock, SettingType } from "~/types"

type State = {
  gameState: GameState,
  board: DominosaBlock[][]
}

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
  state = ref({} as State)
  orderNum = 0
  width = 0
  height = 0
  dominosaCards: [DominosaBlock, DominosaBlock][] = []
  repeatPairs: [DominosaBlock, DominosaBlock][] = []

  constructor(setting: SettingType) {
    this.reset(setting)
  }

  reset(setting: SettingType) {
    this.orderNum = setting.orderNum
    this.width = this.orderNum+2
    this.height = this.orderNum+1
    this.state.value.gameState = 'play'
    this.initBoard()
    this.generateGame()
    this.dominosaCards = []
  }

  private initBoard() {
    this.state.value.board =  Array.from({length: this.height},
      (_, y): DominosaBlock[] => Array.from({length: this.width},
        (_,x): DominosaBlock => ({
          id: 0,
          x,
          y,
          isDominosa: false,
          isRepeat: false,
          genDirection: undefined,
          withDirection: undefined,
          getNeighbor: (d:Direction) => {
            const x1 = x + directionMap.get(d)![0]
            const y1 = y + directionMap.get(d)![1]
            if (x1<0 || x1>=this.width || y1<0 || y1>=this.height)
              return undefined
            else
              return this.state.value.board[y1][x1]
          }
        })
      )
    )
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
    const flatBoard = this.state.value.board.flat()
    return flatBoard.find((b) => !b.isDominosa)
  }

  private generateGame() {
    const numPairs = []
    for (let i=0; i<=this.orderNum; i++)
      for (let j=i; j<=this.orderNum; j++)
        numPairs.push([i, j])
    numPairs.sort(() => Math.random()-0.5)
    const dominoNums = numPairs.length
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
            b.genDirection = undefined
          })
          cardidx = cardidx - 1
        }
        const anotherPath = pickOne(pathsLeap.at(-1)!)
        let [b, bw] = dominoLeap.pop()!
        b.genDirection = anotherPath
        bw.isDominosa = false
        bw = b.getNeighbor(anotherPath)!
        bw.isDominosa = true
        bw.genDirection = reverseDirection(anotherPath)
        dominoLeap.push([b, bw])
      } else {
        const pickPath = pickOne(paths)
        pathsLeap.push(paths)
        const bw = curBlock.getNeighbor(pickPath)!
        curBlock.isDominosa = true
        bw.isDominosa = true
        curBlock.genDirection = pickPath
        bw.genDirection = reverseDirection(pickPath)
        curBlock.id = numPairs[cardidx][0]
        bw.id = numPairs[cardidx][1]
        dominoLeap.push([curBlock, bw])
        cardidx = cardidx + 1
      }
    }
    this.state.value.board.flat().forEach((b)=>b.isDominosa=false)
  }

  private isSameIdDomino(a:[DominosaBlock, DominosaBlock], b:[DominosaBlock, DominosaBlock]) {
    return (a[0].id===b[0].id&&a[1].id===b[1].id) || (a[0].id===b[1].id&&a[1].id===b[0].id)
  }

  private isSameDomino(a:[DominosaBlock, DominosaBlock], b:[DominosaBlock, DominosaBlock]) {
    return (a[0].x===b[0].x&&a[0].y===b[0].y&&a[1].x===b[1].x&&a[1].y===b[1].y) || (a[0].x===b[1].x&&a[0].y===b[1].y&&a[1].x===b[0].x&&a[1].y===b[0].y)
  }

  private handleRepeatDomino() {
    this.repeatPairs = []
    const n = this.dominosaCards.length
    for (let i=0; i<n-1; i++) {
      const ci = this.dominosaCards[i]
      for (let j=i+1; j<n; j++) {
        const cj = this.dominosaCards[j]
        if (this.isSameIdDomino(ci, cj))
          this.repeatPairs.push(ci)
      }
    }
    for (let k=0; k<n; k++) {
      const ck = this.dominosaCards[k]
      if (this.repeatPairs.some(p => this.isSameIdDomino(p, ck)))
        ck.forEach(b => b.isRepeat=true)
      else
        ck.forEach(b => b.isRepeat=false)
    }
  }

  changeDominosa({b, d}: {b:DominosaBlock, d:Direction}) {
    const bw = b.getNeighbor(d)
    let isClickExistDomino = false
    if (!bw) return
    if (!b.isDominosa) {
      b.isDominosa = true
    } else if (d !== b.withDirection) {
      const e = b.getNeighbor(b.withDirection!)!
      e.isDominosa = false
      e.isRepeat = false
      e.withDirection = undefined
      const firstIdx = this.dominosaCards.findIndex(v => this.isSameDomino(v, [b, e]))
      this.dominosaCards.splice(firstIdx, 1)
    } else isClickExistDomino = true
    b.withDirection = d
    b.isRepeat = false
    if (!bw.isDominosa) {
      bw.isDominosa = true
    } else if (d !== reverseDirection(bw.withDirection!)) {
      const e = bw.getNeighbor(bw.withDirection!)!
      e.isDominosa = false
      e.isRepeat = false
      e.withDirection = undefined
      const firstIdx = this.dominosaCards.findIndex(v => this.isSameDomino(v, [bw, e]))
      this.dominosaCards.splice(firstIdx, 1)
    } else isClickExistDomino = true
    bw.withDirection = reverseDirection(d)
    bw.isRepeat = false
    if (isClickExistDomino) {
      b.isDominosa = false
      b.isRepeat = false
      b.withDirection = undefined
      bw.isDominosa = false
      bw.isRepeat = false
      bw.withDirection = undefined
      const idx = this.dominosaCards.findIndex(p => this.isSameDomino(p, [b,bw]))
      this.dominosaCards.splice(idx, 1)
    } else {
      this.dominosaCards.push([b, bw])
    }
    this.handleRepeatDomino()
    this.checkGameState()
  }

  checkGameState() {
    console.log(this.dominosaCards.length, this.repeatPairs.length);
    if (this.dominosaCards.length===this.width*this.height/2 && !this.repeatPairs.length) {
      this.state.value.gameState = 'won'
    }
  }
}
