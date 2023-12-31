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
  background-color: $dark;

  @include flexbox(column, unset, unset);
}
</style>
