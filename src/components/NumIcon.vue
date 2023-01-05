<script setup lang="ts">

defineProps<{
  num: number
}>()

</script>

<template>
  <div w-full h-full text-2xl flex items-center justify-center>
    <template v-if="num === 0">
      <div i-carbon-number-0 />
    </template>
    <template v-else-if="num === 1">
      <div i-carbon-number-1 />
    </template>
    <template v-else-if="num === 2">
      <div i-carbon-number-2 />
    </template>
    <template v-else-if="num === 3">
      <div i-carbon-number-3 />
    </template>
    <template v-else-if="num === 4">
      <div i-carbon-number-4 />
    </template>
    <template v-else-if="num === 5">
      <div i-carbon-number-5 />
    </template>
    <template v-else-if="num === 6">
      <div i-carbon-number-6 />
    </template>
    <template v-else-if="num === 7">
      <div i-carbon-number-7 />
    </template>
    <template v-else-if="num === 8">
      <div i-carbon-number-8 />
    </template>
    <template v-else-if="num === 9">
      <div i-carbon-number-9 />
    </template>
  </div>
</template>
