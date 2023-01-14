<script setup lang="ts">
import { setting } from '~/store';

</script>

<template>
  <div flex="~ col" w-full py-4 text-2xl bg-gray-3 dark:bg-gray-7>
    <p mb-4 font-700>Setting</p>
    <InputNumber v-model:orderNum="setting.orderNum"/>
  </div>
</template>
