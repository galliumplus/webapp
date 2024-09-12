<script setup lang="ts"></script>

<template>
  <div>
    <slot />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/style/mixins';

div {
  background-color: white;
  border-bottom: 4px solid #ccc;
  padding: 20px;
  margin: 10px 0 6px 0;
}

:deep(h2) {
  @include allcaps;
  font-size: 13pt;
  margin: 0 0 6px 0;
}
</style>
