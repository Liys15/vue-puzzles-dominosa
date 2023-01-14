<script setup lang="ts">
import { setting } from '~/store';

</script>

<template>
  <div flex="~ col" w-full py-8 bg-gray-3 dark:bg-gray-9>
    <p>Setting</p>
    <TheCounter v-model:orderNum="setting.orderNum"/>
  </div>
</template>
