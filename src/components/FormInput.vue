<script setup lang="ts">
interface Props {
  type: string
  name: string
  label?: string
  placeholder?: string
  autocomplete?: string
  disabled?: boolean
  modelValue?: string
}

withDefaults(defineProps<Props>(), {
  autocomplete: 'off',
  disabled: false
})

const emit = defineEmits(['update:modelValue'])

function updateModelValue(ev: Event) {
  emit('update:modelValue', (ev.target as HTMLInputElement).value)
}
</script>

<template>
  <div>
    <label :for="name + '-input'">{{ label }}</label>
    <input
      :type="type"
      :name="name"
      :id="name + '-input'"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :disabled="disabled"
      :value="modelValue"
      @input="updateModelValue"
    />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/style/colors.scss';
@import '@/assets/style/mixins.scss';

div {
  max-width: 500px;
  margin: 20px 0;
}
  
label {
  display: block;
  margin-bottom: 5px;

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