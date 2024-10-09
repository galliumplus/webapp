<script setup lang="ts">
import Zincon from '@/components/basic/Zincon.vue'
import StyledButton from '@/components/basic/StyledButton.vue'
import type { IconName } from '@/components/basic/Zincon.vue'
import type { ButtonStyle } from '@/components/basic/StyledButton.vue'

interface Props {
  icon: IconName
  kind: ButtonStyle
  disabled?: boolean
}

withDefaults(defineProps<Props>(), { disabled: false })
</script>

<template>
  <StyledButton :kind="kind" :disabled="disabled"><Zincon :of="icon" /></StyledButton>
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
