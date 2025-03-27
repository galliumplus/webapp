<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
  label?: string
  labelSize?: 'narrow' | 'medium' | 'wide'
  isInvalid?: boolean
  placeholder?: string
  autocomplete?: string
  disabled?: boolean
  blurred?: boolean | string
}

const props = withDefaults(defineProps<Props>(), {
  autocomplete: 'off',
  disabled: false,
  labelSize: 'medium',
  isInvalid: false
})

const model = defineModel<string>({ required: true })

const labelId = computed(() => props.name + '-input')

function modelChange(ev: Event): void {
  model.value = (ev.target as HTMLInputElement).value
}
</script>

<template>
  <div class="input-group">
    <div v-if="label !== undefined" :class="{ ['input-label-' + labelSize]: true }">
      <label :for="labelId">{{ label }}</label>
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
      :class="{ 'is-invalid': isInvalid }"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/style/colors';
@use '@/assets/style/utils';

.input-group {
  @include utils.flexbox(row, center);
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
  border-color: colors.$secondary;
  background-color: var(--surface-container);
}

input {
  outline: none;
  @include utils.ease(border-color, background-color);

  &:focus {
    border-color: colors.$primary;
  }

  &.is-invalid {
    background-color: var(--error-container);
    border-color: colors.$error;
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
