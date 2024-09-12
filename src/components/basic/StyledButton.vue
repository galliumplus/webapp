<script setup lang="ts">
export type ButtonStyle = 'raised-accented' | 'raised-bright' | 'sinking-dark' | 'link'

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

  &.raised-accented-style,
  &.raised-bright-style {
    display: inline-block;
    height: 41px;

    @include allcaps;
    font-size: 11pt;

    transition: background-color 0.2s;

    &:active,
    &:disabled {
      height: 39px;
      border-bottom-width: 2px;
      margin-top: 2px;
    }
  }

  &.raised-accented-style {
    background-color: $accent;
    border-bottom: 4px solid $dark-accent;
    color: $dark;
  }

  &.raised-bright-style {
    background-color: $bright;
    border-bottom: 4px solid $less-bright;
    color: $dark;
  }

  &.sinking-dark-style {
    display: inline-block;
    height: 41px;

    @include allcaps;
    font-size: 11pt;
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
    display: inline-block;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
