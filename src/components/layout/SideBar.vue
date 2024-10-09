<script setup lang="ts"></script>

<template>
  <div>
    <slot />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/style/colors.scss';
@import '@/assets/style/mixins.scss';

div {
  background-color: $grey-10;

  @include flexbox(column, unset, unset);
}
</style>
