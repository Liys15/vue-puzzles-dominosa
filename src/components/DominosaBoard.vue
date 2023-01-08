<script setup lang="ts">
import { showSettings } from '~/state';
import { Play } from '~/composables';
import { setting } from '~/store';

const play = new Play({orderNum: 3})

function handleClick(v: any) {
  play.changeDominosa(v as any)
}

function handleCustomize() {
  const orderNum = setting.value.orderNum
  if (!orderNum)
    showSettings.value = true
  else
    play.reset(setting.value)
}
</script>

<template>
  <div flex="~ col" items-center>
    <div id="menu" flex justify-center gap-2 pt-2>
      <button btn @click="play.reset({orderNum: 3})">
        Easy
      </button>
      <button btn @click="play.reset({orderNum: 5})">
        Medium
      </button>
      <button btn @click="play.reset({orderNum: 7})">
        Hard
      </button>
      <button btn @click="handleCustomize()">
        Customize
      </button>
    </div>
    <div
      m-4 b=" gray-700" b-bottom-left-r
    dark:b-black bg-gray-100 dark:bg-gray-600
    >
      <div v-for="(row, y) in play.board.value" :key="y" flex="~">
        <DominosaBlock
          v-for="(b, x) in row" :key="x"
          block-div :block="b"
          @change-domino="handleClick"
        />
      </div>
    </div>
  </div>
</template>
