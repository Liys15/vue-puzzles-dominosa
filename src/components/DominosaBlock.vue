<script setup lang="ts">
import { isCheating, isPassed } from '~/state';
import { Direction, DominosaBlock } from '~/types';

const blockEl = ref()
const { x, y } = useMouse()

const props = defineProps<{
  block: DominosaBlock
}>()

const emit = defineEmits<{
  (e: 'changeDomino', {b, d}: {b: DominosaBlock, d: Direction}): void
  (e: 'spiltLine', {b, d}: {b: DominosaBlock, d: Direction}): void
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

function handleRightClick(x:number, y:number) {
  const el: HTMLDivElement = blockEl.value
  const x0 = el.getBoundingClientRect().x
  const y0 = el.getBoundingClientRect().y
  const w = el.getBoundingClientRect().width
  const h = el.getBoundingClientRect().height
  const b = props.block
  if ((y-y0)/h <= (x-x0)/w) {
    if ((y-y0)/h <= (x0+w-x)/w) {
      emit('spiltLine', { b, d: 'top'})
      // b.spiltLine.top = !b.spiltLine.top
    }
    else {
      emit('spiltLine', { b, d: 'right'})
      // b.spiltLine.right = !b.spiltLine.right
    }
  }
  else {
    if ((y-y0)/h <= (x0+w-x)/w) {
      emit('spiltLine', { b, d: 'left'})
      // b.spiltLine.left = !b.spiltLine.left
    }
    else {
      emit('spiltLine', { b, d: 'bottom'})
      // b.spiltLine.bottom = !b.spiltLine.bottom
    }
  }
}

function getClass(b: DominosaBlock) {
  if (!b.isDominosa)
    return
  let baseCss
  if (isPassed.value) {
    baseCss = 'bg-green-500/60'
  } else if (b.isRepeat) {
    baseCss = 'bg-red'
  } else {
    baseCss = 'bg-gray-4'
  }
  let varCss = ['left-1, top-1']
  const condition = isCheating.value?props.block.genDirection:props.block.withDirection
  switch (condition) {
    case 'top':
      varCss = ['top-0', 'left-0.5', 'b-bl-r-5', 'b-br-r-5']
      break;
    case 'bottom':
      varCss = ['bottom-0', 'left-0.5', 'b-tl-r-5', 'b-tr-r-5']
      break;
    case 'left':
      varCss = ['left-0', 'top-0.5', 'b-tr-r-5', 'b-br-r-5']
      break;
    case 'right':
      varCss = ['right-0', 'top-0.5', 'b-tl-r-5', 'b-bl-r-5']
      break;
  }
  if (isPassed.value) {
    varCss.push(b.withDirection==='left'||b.withDirection==='right'?'filp-X':'filp-Y')
  }
  return `${baseCss} ${varCss.join(' ')}`
}

</script>

<template>
  <div relative>
    <div
      id="block" absolute w-14 h-14
      :class="getClass(props.block)"
    />
    <template v-if="props.block.spiltLine.top">
      <div class="spilt-line top" left-1 top-0 w-13 b-t="0.1rem" />
    </template>
    <template v-if="props.block.spiltLine.bottom">
      <div class="spilt-line bottom" left-1 bottom-0 w-13 b-b="0.1rem" />
    </template>
    <template v-if="props.block.spiltLine.right">
      <div class="spilt-line right" top-1 right-0 h-13 b-r="0.1rem" />
    </template>
    <template v-if="props.block.spiltLine.left">
      <div class="spilt-line left" top-1 left-0 h-13 b-l="0.1rem" />
    </template>
    <NumIcon :num="props.block.id" />
    <div
      ref="blockEl"
      absolute w-full h-full top-0 left-0 z-10
      @click="handleClick(x,y)"
      @contextmenu.prevent="handleRightClick(x, y)"
    />
  </div>
</template>

<style>
.num-icon {
  width: 70%;
  height: 70%;
  margin: 15%;
}

.bg-black + div {
  color: white
}

.filp-X {
  transition: transform 1s;
  transform-style: preserve-3d;
  transform: rotateX(360deg);
}

.filp-Y {
  transition: transform 1s;
  transform-style: preserve-3d;
  transform: rotateY(360deg);
}

.spilt-line {
  position: absolute;
  border-color: rgb(107, 114, 128)
}
</style>
