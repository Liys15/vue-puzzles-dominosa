<script setup lang="ts">
import { isDev, isPassed, showSettings } from '~/state';
import { Play } from '~/composables';
import { setting } from '~/store';
import type { Direction, DominosaBlock, SettingType } from '~/types';

const defaultSetting:SettingType = setting.value.orderNum?setting.value:{orderNum:3}

const play = new Play(defaultSetting)

watch(
  () => play.state.value.gameState,
  (newValue) => {
    if (newValue==='won') {
      isPassed.value = true
    } else {
      isPassed.value = false
    }
  }
)

watch(isDev, (newValue) => {
  play.dominosaCards = []
  if (newValue) {
    play.state.value.board.forEach(row => {
      row.forEach(block => {
        block.isDominosa = true
        block.isRepeat = false
      })
    })
  } else {
    play.state.value.board.forEach(row => {
      row.forEach(block => {
        block.isDominosa = false
        block.isRepeat = false
      })
    })
  }
})

watch(
  showSettings,
  (newValue) => {
    if (!newValue && setting.value.orderNum) {
      play.reset(setting.value)
    }
  }
)

function handleClick(v: {b: DominosaBlock, d: Direction}) {
  play.changeDominosa(v)
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
  <div h-full flex="~ col" items-center>
    <div id="menu" flex justify-center gap-2 mt-6>
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
    <div class="game-board" h="80%" flex items-center>
      <div m-4 b="2 gray-500/50" rd>
        <div v-for="(row, y) in play.state.value.board" :key="y" flex="~">
          <DominosaBlock
            v-for="(b, x) in row" :key="x"
            block-div :block="b"
            @change-domino="handleClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>
