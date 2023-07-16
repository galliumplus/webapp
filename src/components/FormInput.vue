<script setup lang="ts">
interface Props {
  type: string
  name: string
  label?: string
  placeholder?: string
  autocomplete?: string
  modelValue?: string
}

withDefaults(defineProps<Props>(), {
  autocomplete: 'off'
})

const emit = defineEmits(['update:modelValue'])

function updateModelValue(ev: Event) {
  emit('update:modelValue', (ev.target as HTMLInputElement).value)
}
</script>

<template>
  <div :class="type + ' input-group'">
    <label :for="name + '-input'">{{ label }}</label>
    <input
      :type="type"
      :name="name"
      :id="name + '-input'"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :value="modelValue"
      @input="updateModelValue"
    />
  </div>
</template>
