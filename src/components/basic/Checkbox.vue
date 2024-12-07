<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Problem } from '@/business/problem'

interface Props {
  name: string
  label?: string
  problem?: Problem
  placeholder?: string
  autocomplete?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autocomplete: 'off',
  disabled: false
})

const model = defineModel<boolean>()

const formattedProblem = ref<string>()

watch(
  () => props.problem,
  (pb) => {
    formattedProblem.value = pb === undefined ? undefined : ' – ' + pb.message
  }
)

const labelId = computed(() => props.name + '-input')

function modelChange(ev: Event): void {
  formattedProblem.value = undefined
  model.value = (ev.target as HTMLInputElement).checked
}
</script>

<template>
  <div class="input-group">
    <input
      type="checkbox"
      :name="name"
      :id="labelId"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :disabled="disabled"
      v-model="model"
      @input="modelChange($event)"
    />
    <div class="input-label" :class="{ error: formattedProblem !== undefined }">
      <label :for="labelId">{{ label }}</label>
      <span>{{ formattedProblem }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/style/colors';
@import '@/assets/style/mixins';

.input-group {
  @include flexbox(row, center);
}

.input-label {
  flex-grow: 1;
}

input {
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 1.2em;
  height: 1.2em;
  border: 2px solid $secondary;
  background: none;
  margin: 0 0.75rem;

  @include ease(border-color);

  &:checked {
    border-color: $primary;
    background-color: $primary;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='butt' stroke-linejoin='miter' stroke-width='3' d='m 3,9 5,5 9,-9'/%3e%3c/svg%3e");
  }
}
</style>
