<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Problem } from '@/business/problem'

interface Props {
  name: string
  label?: string
  labelSize?: 'narrow' | 'medium' | 'wide'
  problem?: Problem
  placeholder?: string
  autocomplete?: string
  disabled?: boolean
  blurred?: boolean | string
}

const props = withDefaults(defineProps<Props>(), {
  autocomplete: 'off',
  disabled: false,
  labelSize: 'medium'
})

const model = defineModel<string>({ required: true })

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
  model.value = (ev.target as HTMLInputElement).value
}
</script>

<template>
  <div class="input-group">
    <div
      v-if="label !== undefined"
      :class="{ error: formattedProblem !== undefined, ['input-label-' + labelSize]: true }"
    >
      <label :for="labelId">{{ label }}</label>
      <span>{{ formattedProblem }}</span>
    </div>
    <div v-if="blurred" class="readonly-blurred-input">
      <div>{{ model }}</div>
      <div class="overlay">{{ typeof blurred === 'string' ? blurred : '' }}</div>
    </div>
    <input
      v-else
      type="text"
      :name="name"
      :id="labelId"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :disabled="disabled"
      v-model="model"
      @input="modelChange($event)"
    />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/style/colors';
@import '@/assets/style/mixins';

.input-group {
  @include flexbox(row, center);
}

.input-label-narrow {
  width: 6rem;
}

.input-label-medium {
  width: 9rem;
}

.input-label-wide {
  width: 12rem;
}

input,
.readonly-blurred-input {
  flex: 1;

  border-width: 0 0 2px 0;
  border-style: solid;
  border-color: $secondary;
  background-color: var(--surface-container);
}

input {
  outline: none;
  @include ease(border-color);

  &:focus {
    border-color: $primary;
  }
}

.readonly-blurred-input {
  position: relative;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  opacity: 0.6;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(0.4rem);
    text-align: center;
    padding: 0.375rem 0.75rem;
    line-height: 1.5;
    font-style: italic;
  }
}
</style>
