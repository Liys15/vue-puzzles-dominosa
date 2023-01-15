<script setup lang="ts">
</script>

<template>
  <div flex="~ col nowrap" w-full py-4 bg-gray-3 dark:bg-gray-7 >
    <p my-2 text-2xl font-700>Insturction</p>
    <p mb-2 text-4 italic>
      Tile the rectangle with a full set of dominoes.
    </p>
    <div px-8 flex="~ col" items-start text-left>
      <p text-4 lh-4 py-6>Tile the rectangle with dominoes (1×2 rectangles) so that every possible domino appears exactly once (that is, every possible pair of numbers, including doubles).</p>
      <div class="line">
        <div class="icon mouse-left-click"/>
        <p>Click between two adjacent numbers to place or remove a domino.</p>
      </div>
      <div class="line">
        <div class="icon mouse-right-click"/>
        <p>Right-Click to place a line between numbers if you think a domino definitely cannot go there.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line {
  display: flex;
  font-size: 1rem;
  line-height: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.icon {
  align-self: flex-start;
  min-width: 18px;
  min-height: 18px;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  background-size: contain;
  background-repeat: no-repeat;
}

.mouse-left-click {
  background-image: url('~/assets/mouse-left-button.svg');
}

.mouse-right-click {
  background-image: url('~/assets/mouse-right-button.svg');
}
</style>
