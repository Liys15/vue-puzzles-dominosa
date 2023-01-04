<script setup lang="ts">
import {
  showHelp,
  showSettings
} from '~/state'

</script>

<template>
  <Modal v-model="showSettings" direction="top">
    <Settings/>
  </Modal>
  <Modal v-model="showHelp" direction="top">
    <InstructionPage />
  </Modal>
</template>
