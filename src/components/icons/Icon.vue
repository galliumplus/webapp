<script setup lang="ts">
import CartIcon from './CartIcon.vue'
import ExitIcon from './ExitIcon.vue'
import HomeIcon from './HomeIcon.vue'
import MailFastIcon from './MailFastIcon.vue'
import UserGroupIcon from './UserGroupIcon.vue'
import UserIcon from './UserIcon.vue'
import { computed } from 'vue'

const icons = {
  cart: CartIcon,
  exit: ExitIcon,
  home: HomeIcon,
  'mail-fast': MailFastIcon,
  'user-group': UserGroupIcon,
  user: UserIcon
}

export type IconName = keyof typeof icons

interface Props {
  of: IconName
  size?: 'small' | 'medium' | 'large' | 'huge'
}

const props = withDefaults(defineProps<Props>(), { size: 'small' })
</script>

<template>
  <component :is="icons[of]" :class="'icon-' + size" />
</template>

<style scoped lang="scss">
$sizes: (
  'small': 29px,
  'medium': 58px,
  'large': 87px,
  'huge': 116px
);

@each $name, $size in $sizes {
  .icon-#{$name} {
    width: $size;
    height: $size;
  }
}
</style>
