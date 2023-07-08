<script setup>
defineProps({
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String
  },
  placeholder: {
    type: String
  },
  autocomplete: {
    type: String,
    default: 'off'
  },
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

function updateModelValue(ev) {
  emit('update:modelValue', ev.target.value)
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
