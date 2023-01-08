<script setup lang="ts">
import type { Direction, DominosaBlock } from '~/types';

const width = 6
const height = 5

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

const board = ref(Array.from(
  {length: height},
  (_, y) => Array.from(
    {length: width},
    (_,x) : DominosaBlock =>({
      id: Math.floor(Math.random()*10),
      x,
      y,
      isDominosa: false,
      withDirection: undefined
    })
  )
))

function getSiblings(b: DominosaBlock) {
  const siblings: (DominosaBlock | undefined)[] = []
  directionMap.forEach(([dx, dy]) => {
    const x = b.x + dx
    const y = b.y + dy
    if (x<0 || x>=width || y<0 || y>=height)
      siblings.push(undefined)
    else
      siblings.push(board.value[y][x])
  })
  return siblings
}

function getNeighbor(b: DominosaBlock, d: Direction) {
  const x = b.x + directionMap.get(d)![0]
  const y = b.y + directionMap.get(d)![1]
  if (x<0 || x>=width || y<0 || y>=height)
    return undefined
  else
    return board.value[y][x]
}

function handleClick({b, d} : {b:DominosaBlock, d:Direction}) {
  console.log('handle click: ', d);
  const bw = getNeighbor(b, d)
  if (!bw) return
  if (!b.isDominosa) {
    b.isDominosa = true
  } else {
    const e = getNeighbor(b, b.withDirection!)!
    e.isDominosa = false
    e.withDirection = undefined
  }
  b.withDirection = d
  if (!bw.isDominosa) {
    bw.isDominosa = true
  } else {
    const e = getNeighbor(bw, bw.withDirection!)!
    e.isDominosa = false
    e.withDirection = undefined
  }
  bw.withDirection = reverseDirection(d)
}
</script>

<template>
  <div b-1 b-bottom-left-r b-gray-700 dark:b-black bg-gray-100 dark:bg-gray-600>
    <div v-for="(row, y) in board" :key="y" flex="~">
      <DominosaBlock
        v-for="(block, x) in row" :key="x"
        block-div :block="block"
        @change-domino="handleClick"
      />
    </div>
  </div>
</template>
