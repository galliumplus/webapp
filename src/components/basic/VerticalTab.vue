<script setup lang="ts">
import type { IconName } from '@/components/basic/Zincon.vue'
import Zincon from '@/components/basic/Zincon.vue'

interface Props {
  link: string
  label: string
  icon: IconName
}

const props = defineProps<Props>()
</script>

<template>
  <RouterLink :to="link">
    <Zincon :of="icon" class="icon" />
    {{ label }}
  </RouterLink>
</template>

<style scoped lang="scss">
@import '@/assets/style/colors';
@import '@/assets/style/mixins';

a {
  @include flexbox(row, center, flex-start);
  padding: 6px 24px 6px 0.5rem;
  height: 29px;
  margin: 12px 0;
  overflow: hidden;

  color: var(--on-surface);
  border: none;
  text-decoration: none;
  text-align: left;
  white-space: nowrap;

  @include ease(color background-color);

  &:hover {
    background-color: var(--surface-container);
  }

  &:active {
    background-color: var(--surface-container);
    padding-bottom: 2px;
    border-top: 4px solid var(--surface-shadow);
  }

  &.router-link-exact-active {
    padding-bottom: 2px;
    border-top: 4px solid var(--surface-shadow);
    background-color: $--bright-surface-container;
    color: $--bright-on-surface-container;
  }
}

.icon {
  margin-right: 12px;
}
</style>
