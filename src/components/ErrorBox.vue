<script setup lang="ts">
import Problem from '@/logic/problem'

interface Props {
  modelValue: Problem | undefined
}

defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

function updateModelValue(ev: Event) {
  emit('update:modelValue', (ev.target as HTMLInputElement).value)
}
</script>

<template>
  <div v-if="modelValue">{{ modelValue.message }}</div>
</template>

<style scoped lang="scss">
div {
  padding: 5px;

  background-color: #ff000070;
  border: 2px solid #ff000086;
  text-align: center;
}
</style>
