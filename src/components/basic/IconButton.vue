<script setup lang="ts">
import Icon from '@/components/icons/Icon.vue'
import StyledButton from '@/components/basic/StyledButton.vue'
import type { IconName } from '@/components/icons/Icon.vue'
import type { ButtonStyle } from '@/components/basic/StyledButton.vue'

interface Props {
  icon: IconName
  kind: ButtonStyle
  disabled?: boolean
}

withDefaults(defineProps<Props>(), { disabled: false })
</script>

<template>
  <StyledButton :kind="kind" :disabled="disabled"><Icon :name="icon" /></StyledButton>
</template>

<style scoped lang="scss">
button {
  padding: 6px;
  width: 41px;
}

svg {
  $icon-size: 29px;
  width: $icon-size;
  height: $icon-size;
}
</style>
