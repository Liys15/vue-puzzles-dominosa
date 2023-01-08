<script setup lang="ts">
import { Play } from '~/composables';

const play = new Play({orderNum: 2})

function handleClick(v: any) {
  play.changeDominosa(v as any)
}
</script>

<template>
  <div b-1 b-bottom-left-r b-gray-700 dark:b-black bg-gray-100 dark:bg-gray-600>
    <div v-for="(row, y) in play.board.value" :key="y" flex="~">
      <DominosaBlock
        v-for="(block, x) in row" :key="x"
        block-div :block="block"
        @change-domino="handleClick"
      />
    </div>
  </div>
</template>
