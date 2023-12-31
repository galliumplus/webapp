<script setup lang="ts">
export type ButtonStyle = 'raised-accented' | 'sinking-dark' | 'link'

interface Props {
  kind: ButtonStyle
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

  &.raised-accented-style {
    display: inline-block;
    margin: 10px 0;
    height: 41px;

    @include allcaps;
    background-color: $accent;
    border-bottom: 4px solid $dark-accent;
    color: $dark;

    transition: background-color 0.2s;

    &:active,
    &:disabled {
      height: 39px;
      border-bottom-width: 2px;
      margin-top: 12px;
    }
  }

  &.sinking-dark-style {
    display: inline-block;
    margin: 10px 0;
    height: 41px;

    @include allcaps;
    background: none;
    border-top: 0 solid $more-dark;
    color: $bright;

    transition: background-color 0.2s;

    &:hover {
      background-color: $bright-overlay;
    }

    &:active {
      border-top-width: 4px;
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
