<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Problem } from '@/business/problem'

interface Props {
  type: string
  name: string
  label?: string
  problem?: Problem
  placeholder?: string
  autocomplete?: string
  disabled?: boolean
  modelValue: unknown
}

const props = withDefaults(defineProps<Props>(), {
  autocomplete: 'off',
  disabled: false
})

const emit = defineEmits(['update:modelValue'])

const formattedProblem = ref<string>()

watch(
  () => props.problem,
  (pb) => {
    formattedProblem.value = pb === undefined ? undefined : ' – ' + pb.message
  }
)

const labelId = computed(() => props.name + '-input')

function modelValueChange(ev: Event): void {
  formattedProblem.value = undefined
  emit('update:modelValue', (ev.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="input-box">
    <div class="input-label" :class="{ error: formattedProblem !== undefined }">
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
      :value="modelValue"
      @input="modelValueChange($event)"
    />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/style/colors';
@import '@/assets/style/mixins';

div {
  &.input-box {
    max-width: 500px;
    margin: 1rem 0;
  }

  &.input-label {
    margin-bottom: 5px;
  }

  &.error {
    color: $danger;
  }
}

label {
  @include all-caps;
  font-size: 11pt;
}

input {
  outline: none;

  &[type='text'],
  &[type='password'] {
    background: none;
    border: solid $grey-90;
    border-width: 0 0 2px 0;

    &:focus {
      background-color: $overlay-bright;
    }
  }

  &[type='password'] {
    letter-spacing: 0.5ch;
  }
}
</style>
