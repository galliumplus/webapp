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

$transition-duration: 0.2s;

a {
  @include flexbox(row, center, flex-start);
  padding: 6px 24px 6px 0.5rem;
  height: 29px;
  margin: 12px 0;
  overflow: hidden;

  color: $grey-90;
  border: none;
  text-decoration: none;
  text-align: left;
  white-space: nowrap;

  transition: $transition-duration color background-color;

  &:hover {
    background-color: $overlay-bright;
  }

  &:active {
    background-color: $overlay-bright;
    padding-bottom: 2px;
    border-top: 4px solid $grey-05;
  }

  &.router-link-exact-active {
    padding-bottom: 2px;
    border-top: 4px solid $grey-05;
    background-color: $grey-90;
    color: $grey-10;
  }
}

.icon {
  margin-right: 12px;
}
</style>
