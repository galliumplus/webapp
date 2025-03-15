<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Problem } from '@/business/problem'

interface Props {
  group: string
  value: any
  label?: string
  problem?: Problem
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autocomplete: 'off',
  disabled: false
})

const model = defineModel()

const formattedProblem = ref<string>()

watch(
  () => props.problem,
  (pb) => {
    formattedProblem.value = pb === undefined ? undefined : ' – ' + pb.message
  }
)

const labelId = computed(() => props.group + '-input')

function modelChange(ev: Event): void {
  formattedProblem.value = undefined
  model.value = (ev.target as HTMLInputElement).checked
}
</script>

<template>
  <div class="input-group">
    <input
      type="radio"
      :name="group"
      :value="value"
      :id="labelId"
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
@use '@/assets/style/colors';
@use '@/assets/style/utils';

.input-group {
  @include utils.flexbox(row, center);
}

.input-label {
  flex-grow: 1;
}

input {
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-size: inherit;
  width: 1.2em;
  height: 1.2em;
  border: 2px solid colors.$secondary;
  background: none;
  margin: 0 0.75rem;
  padding: 2px;

  @include utils.ease(border-color);

  &::after {
    content: '';
    display: block;
    width: calc(1.2em - 8px);
    height: calc(1.2em - 8px);
    transform: scale(0.3);
    transform-origin: center;
    @include utils.ease(background-color, transform);
  }

  &:checked {
    border-color: colors.$primary;

    &::after {
      background-color: colors.$primary;
      transform: scale(1);
    }
  }
}
</style>
