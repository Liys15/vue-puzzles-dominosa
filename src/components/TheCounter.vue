<script setup lang="ts">
const props = withDefaults(defineProps<{
  orderNum?: number
}>(), {
  orderNum: 3
})

const emit = defineEmits<{
  (e:'update:orderNum', orderNum: number): void
}>()

const { count } = useCounter(props.orderNum)

function dec() {
  if (count.value <= 1)
    return
  count.value -= 1
  emit('update:orderNum', count.value)
}

function inc() {
  if (count.value >= 9)
    return
  count.value += 1
  emit('update:orderNum', count.value)
}
</script>

<template>
  <div>
    <button btn @click="dec()">
      -
    </button>
    <span mx-4>{{ count }}</span>
    <button btn @click="inc()">
      +
    </button>
  </div>
</template>
