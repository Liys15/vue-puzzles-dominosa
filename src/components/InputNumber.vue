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
  <div h-full mxa my-1 flex text-xl items-center>
    <span mx-6 text-xl>Order Number: </span>
    <div inline-flex b="1 black" rd>
      <button px-4 @click="dec()">
        -
      </button>
      <div b="x black" px-8 bg-gray-2 dark:text-black>
        {{ count }}
      </div>
      <button px-4 @click="inc()">
        +
      </button>
    </div>
  </div>
</template>
