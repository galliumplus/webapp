<script setup lang="ts">
import type { InputValue } from '@/logic/components/input-value'
import { computed } from 'vue'

interface Props {
  type: string
  name: string
  label?: string
  placeholder?: string
  autocomplete?: string
  disabled?: boolean
  value: InputValue
}

const props = withDefaults(defineProps<Props>(), {
  autocomplete: 'off',
  disabled: false
})

const formattedProblem = computed(() => {
  let problem = null
  if (props.value.problem.value !== null) {
    problem = ' – ' + props.value.problem.value.message
  }
  return problem
})

const labelId = computed(() => props.name + '-input')
</script>

<template>
  <div class="input-box">
    <div class="input-label" :class="{ error: formattedProblem }">
      <label :for="labelId">{{ label }}</label>
      <span>{{ formattedProblem }}</span>
    </div>
    <input
      :type="type"
      :name="name"
      :id="labelId"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :disabled="disabled"
      v-model="value.ref.value"
    />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/style/colors';
@import '@/assets/style/mixins';

div {
  &.input-box {
    max-width: 500px;
    margin: 20px 0;
  }

  &.input-label {
    margin-bottom: 5px;
  }

  &.error {
    color: $red;
  }
}

label {
  @include allcaps;
  font-size: 0.9rem;
}

input {
  outline: none;

  &[type='text'],
  &[type='password'] {
    background: none;
    border: solid $bright;
    border-width: 0 0 2px 0;

    &:focus {
      background-color: $bright-overlay;
    }
  }

  &[type='password'] {
    letter-spacing: 0.5ch;
  }
}
</style>
