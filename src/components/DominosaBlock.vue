<script setup lang="ts">

import { Direction, DominosaBlock } from '~/types';

const blockEl = ref()
const { x, y } = useMouse()

const props = defineProps<{
  block: DominosaBlock
}>()

const emit = defineEmits<{
  (e: 'changeDomino', {b, d}: {b: DominosaBlock, d: Direction}): void
}>()

function handleClick(x:number, y:number) {
  const el: HTMLDivElement = blockEl.value
  const x0 = el.getBoundingClientRect().x
  const y0 = el.getBoundingClientRect().y
  const w = el.getBoundingClientRect().width
  const h = el.getBoundingClientRect().height

  if ((y-y0)/h <= (x-x0)/w) {
    if ((y-y0)/h <= (x0+w-x)/w) {
      emit('changeDomino', { b: props.block, d: 'top'})
    }
    else {
      emit('changeDomino', { b: props.block, d: 'right'})
    }
  }
  else {
    if ((y-y0)/h <= (x0+w-x)/w) {
      emit('changeDomino', { b: props.block, d: 'left'})
    }
    else {
      emit('changeDomino', { b: props.block, d: 'bottom'})
    }
  }
}

function getClass() {
  if (!props.block.isDominosa)
    return
  const baseCss = 'w-10 h-10 bg-black'
  let varCss = 'left-1 top-1'
  switch (props.block.withDirection) {
    case 'top':
      varCss = 'top-0 left-1 b-bl-r-5 b-br-r-5'
      break;
    case 'bottom':
      varCss = 'bottom-0 left-1 b-tl-r-5 b-tr-r-5'
      break;
    case 'left':
      varCss = 'left-0 top-1 b-tr-r-5 b-br-r-5'
      break;
    case 'right':
      varCss = 'right-0 top-1 b-tl-r-5 b-bl-r-5'
      break;
  }
  return `${baseCss} ${varCss}`
}

</script>

<template>
  <div relative>
    <div
      absolute
      :class="getClass()"
    />
    <div
      ref="blockEl"
      absolute w-full h-full top-0 left-0 z-10
      @click="handleClick(x,y)"
    />
    <NumIcon :num="props.block.id" />
  </div>
</template>

<style scoped>
.num-icon {
  width: 70%;
  height: 70%;
  margin: 15%;
}
</style>
