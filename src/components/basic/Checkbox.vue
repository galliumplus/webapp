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
  text-align: center;
  line-height: 0.8em;

  @include utils.ease(border-color);

  &:checked {
    border-color: colors.$primary;
    background-color: colors.$primary;

    &::after {
      content: '\E033';
      font-family: 'Zincons', system-ui;
      font-size: 0.8em;
    }
  }
}
</style>
