<script setup lang="ts">
type ButtonKind = 'accented' | 'link'

interface Props {
  kind: ButtonKind
  submit?: boolean
  disabled?: boolean
}

withDefaults(defineProps<Props>(), { submit: false, disabled: false })
</script>

<template>
  <button :type="submit ? 'submit' : undefined" :class="kind + '-style'" :disabled="disabled">
    <slot />
  </button>
</template>

<style scoped lang="scss">
@import '@/assets/style/colors';
@import '@/assets/style/mixins';

button {
  border: none;

  &:hover {
    cursor: pointer;
  }

  &.accented-style {
    display: inline-block;
    margin: 10px 0;

    @include allcaps;
    background-color: $orange;
    border-bottom: 4px solid $dark-orange;
    color: $dark;

    transition: background-color 0.2s;

    &:active,
    &:disabled {
      border-bottom-width: 2px;
      margin-top: 12px;
    }
  }

  &.link-style {
    padding: 0;

    color: inherit;
    background: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
