<script setup lang="ts">
import CartIcon from './CartIcon.vue'
import ExitIcon from './ExitIcon.vue'
import HomeIcon from './HomeIcon.vue'
import { computed } from 'vue'

const icons = {
  cart: CartIcon,
  exit: ExitIcon,
  home: HomeIcon
}

export type IconName = keyof typeof icons

interface Props {
  name: IconName
}

const props = defineProps<Props>()
</script>

<template><component :is="icons[name]" /></template>

<style scoped lang="scss"></style>
