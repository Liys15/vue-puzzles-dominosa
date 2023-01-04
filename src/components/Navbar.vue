<script setup lang="ts">
import { isDark, showHelp, showSettings } from '~/state'

const toggleDark = useToggle(isDark)
const toggleSettings = useToggle(showSettings)

function openHelp() {
  showHelp.value = true
}
</script>

<template>
  <nav border="b" w="95%" relative>
    <div
      absolute text-2xl tracking-0.5
      w-full h-full ma py2 px2 text-center
    >
      Puzzle Name
    </div>
    <div flex items-center justify-between text-xl ma py2 pt4 px2>
      <div flex items-center>
        <button icon-btn mx2 @click="openHelp()">
          <div i-carbon-help />
        </button>
      </div>

      <div flex items-center>
        <button icon-btn mx2 @click="toggleSettings()">
          <div i-carbon-settings />
        </button>
        <button icon-btn mx2 @click="toggleDark()">
          <div i-carbon-sun dark:i-carbon-moon />
        </button>
      </div>
    </div>
  </nav>
</template>
