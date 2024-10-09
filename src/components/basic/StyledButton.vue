<script setup lang="ts">
export type ButtonStyle =
  | 'raised-accented'
  | 'raised-bright'
  | 'sinking-dark'
  | 'flat-dark'
  | 'link'

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

    @include all-caps;
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
    border-bottom: 4px solid $accent-dark;
    color: $grey-10;
  }

  &.raised-bright-style {
    background-color: $grey-90;
    border-bottom: 4px solid $grey-70;
    color: $grey-10;
  }

  &.sinking-dark-style {
    display: inline-block;
    height: 41px;

    @include all-caps;
    font-size: 11pt;
    background: none;
    border-top: 0 solid $grey-05;
    color: $grey-90;

    transition: background-color 0.2s;

    &:hover {
      background-color: $overlay-bright;
    }

    &:active {
      border-top-width: 4px;
    }
  }

  &.flat-dark-style {
    display: inline-block;
    height: 41px;

    @include all-caps;
    font-size: 11pt;
    background: none;
    color: $grey-90;

    transition: background-color 0.2s;

    &:hover {
      background-color: $overlay-bright;
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
