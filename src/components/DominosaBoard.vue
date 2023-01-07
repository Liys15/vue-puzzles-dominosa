<script setup lang="ts">
import type { Direction, DominosaBlock } from '~/types';

const width = 6
const height = 5

const board = ref(Array.from(
  {length: height},
  (_, y) => Array.from(
    {length: width},
    (_,x) : DominosaBlock =>({
      num: Math.floor(Math.random()*10),
      isDominosa: false,
      withDirection: undefined
    })
  )
))

function handleClick(witdirection: Direction) {
  console.log('handle click: ', witdirection);
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
