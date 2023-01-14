<script setup lang="ts">
import { isDev, isPassed } from '~/state';
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

function getClass(b: DominosaBlock) {
  if (!b.isDominosa)
    return
  let baseCss
  if (isPassed.value) {
    baseCss = 'bg-green-500/60'
  } else {
    baseCss = 'bg-gray-4'
  }
  let varCss = ['left-1, top-1']
  const condition = isDev.value?props.block.genDirection:props.block.withDirection
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
      absolute w-14 h-14
      :class="getClass(props.block)"
    />
    <NumIcon :num="props.block.id" />
    <div
      ref="blockEl"
      absolute w-full h-full top-0 left-0 z-10
      @click="handleClick(x,y)"
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
</style>
