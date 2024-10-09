<script setup lang="ts">
interface Props {
  value: string
  label: string
}

const props = defineProps<Props>()
const model = defineModel()
</script>

<template>
  <button :class="{ selected: model == value }" @click="model = value">
    {{ label }}
  </button>
</template>

<style scoped lang="scss">
@import '@/assets/style/colors';
@import '@/assets/style/mixins';

$transition-duration: 0.2s;

button {
  padding: 6px 0.6rem 6px 0.6rem;
  margin: 0 0.4rem -4px 0.4rem;

  background: none;
  text-decoration: none;
  text-align: left;
  white-space: nowrap;
  border: 0 solid $grey-05;
  border-bottom-width: 4px;

  transition: $transition-duration color background-color;

  &:hover {
    background-color: $grey-25;
  }

  &:active {
    background-color: $grey-25;
    border-top-width: 4px;
    border-bottom-width: 0;
  }

  &.selected {
    background-color: white;
    border-top-width: 4px;
    border-bottom-width: 0;
    color: black;
  }
}
</style>
