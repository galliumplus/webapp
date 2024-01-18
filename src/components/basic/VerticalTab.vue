<script setup lang="ts">
import Icon from '@/components/icons/Icon.vue'
import type { IconName } from '@/components/icons/Icon.vue'
import { computed } from 'vue'

interface Props {
  link: string
  label: string
  icon: IconName
}

const props = defineProps<Props>()

const iconUrl = computed(() => `@/assets/icons/${props.icon}.svg`)
</script>

<template>
  <RouterLink :to="link">
    <Icon :name="icon" />
    {{ label }}
  </RouterLink>
</template>

<style scoped lang="scss">
@import '@/assets/style/colors';
@import '@/assets/style/mixins';

$transition-duration: 0.2s;

a {
  @include flexbox(row, center, flex-start);
  padding: 6px 24px 6px 6px;
  height: 29px;
  margin: 12px 0px;
  overflow: hidden;

  color: $bright;
  border: none;
  text-decoration: none;
  text-align: left;
  white-space: nowrap;

  transition: $transition-duration color background-color;

  &:hover {
    background-color: $bright-overlay;
  }

  &:active {
    background-color: $bright-overlay;
    padding-bottom: 2px;
    border-top: 4px solid $more-dark;
  }

  &.router-link-exact-active {
    padding-bottom: 2px;
    border-top: 4px solid $more-dark;
    background-color: $bright;
    color: $dark;
  }
}

svg {
  display: inline-block;
  $icon-size: 29px;
  height: $icon-size;
  width: $icon-size;
  margin-right: 12px;
}
</style>
