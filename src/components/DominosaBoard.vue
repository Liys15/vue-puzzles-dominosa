<script setup lang="ts">
import type { DominosaBlock } from '~/types';

const board = ref(Array.from(
  {length: 5},
  () => Array.from(
    {length: 6},
    () : DominosaBlock =>({
      num: Math.floor(Math.random()*10),
      isDominosa: false,
      withDirection: undefined
    })
  )
))
</script>

<template>
  <div b-1 b-bottom-left-r b-gray-700 dark:b-black bg-gray-100 dark:bg-gray-600>
    <div v-for="(row, y) in board" :key="y" flex="~">
      <DominosaBlock
        v-for="(block, x) in row" :key="x"
        block-div :block="block"
      />
    </div>
  </div>
</template>
