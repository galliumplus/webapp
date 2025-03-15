<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import Tooltip from '@/components/basic/Tooltip.vue'
import Zincon from '@/components/basic/Zincon.vue'

interface Props {
  textToCopy: string
}

const props = defineProps<Props>()

const copied = ref(false)
const copyFailed = ref(false)
const button = useTemplateRef<HTMLButtonElement>('button')
let copiedTimeout: number | undefined

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(props.textToCopy)
    copied.value = true
  } catch (error) {
    console.error(error)
    copyFailed.value = true
  }
  if (copiedTimeout) window.clearTimeout(copiedTimeout)
  copiedTimeout = window.setTimeout(clearCopyStatus, 5000)
}

function clearCopyStatus() {
  copied.value = false
  copyFailed.value = false
}
</script>

<template>
  <button
    class="g-raised g-secondary"
    ref="button"
    @click="copyToClipboard()"
    @blur="clearCopyStatus()"
  >
    <Zincon :of="copied ? 'check' : 'copy'" />
  </button>
  <Tooltip
    :message="
      copyFailed ? 'Le presse-papier n\'est pas accessible' : 'Copié dans le presse-papier !'
    "
    :shown="copied || copyFailed"
    :attached-to="button"
    placement="top"
    :color="copyFailed ? 'error' : 'secondary'"
  />
</template>

<style scoped lang="scss"></style>
