<script setup lang="ts">

import { DominosaBlock } from '~/types';

const blockcontrol = ref()
const { x, y } = useMouse()

const props = defineProps<{
  block: DominosaBlock
}>()

function handleClick(x:number, y:number) {
  const el: HTMLDivElement = blockcontrol.value
  const x0 = el.getBoundingClientRect().x
  const y0 = el.getBoundingClientRect().y
  const w = el.getBoundingClientRect().width
  const h = el.getBoundingClientRect().height

  if ((y-y0)/h <= (x-x0)/w) {
    if ((y-y0)/h <= (x0+w-x)/w) {
      console.log('top');
      props.block.isDominosa = true
      props.block.withDirection = 'top'
    }
    else {
      console.log('right');
      props.block.isDominosa = true
      props.block.withDirection = 'right'
    }
  }
  else {
    if ((y-y0)/h <= (x0+w-x)/w) {
      console.log('left');
      props.block.isDominosa = true
      props.block.withDirection = 'left'
    }
    else {
      console.log('bottom');
      props.block.isDominosa = true
      props.block.withDirection = 'bottom'
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
      varCss = 'top-0 left-1'
      break;
    case 'bottom':
      varCss = 'bottom-0 left-1'
      break;
    case 'left':
      varCss = 'left-0 top-1'
      break;
    case 'right':
      varCss = 'right-0 top-1'
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
      ref="blockcontrol"
      absolute w-full h-full top-0 left-0 z-10
      @click="handleClick(x,y)"
    />
    <NumIcon :num="props.block.num" />
  </div>
</template>

<style scoped>
.num-icon {
  width: 70%;
  height: 70%;
  margin: 15%;
}

.right {
  background-color: black;
  color: white;
}
</style>
