<script setup lang="ts"></script>

<template>
  <div>
    <slot />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/style/utils';

div {
  background-color: var(--surface);
  border-bottom: 4px solid var(--surface-shadow);
  padding: 1rem;
  margin: 0.5rem 0 6px 0;
}

:deep(h2) {
  font-size: 13pt;
  margin: 0 0 6px 0;
}
</style>
