<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  message: string
}

const props = defineProps<Props>()

const help = ref(null)
const tooltip = ref(null)
const tooltipShown = ref(false)
const tooltipFading = ref(false)
const tooltipStyle = ref({ left: '0', top: '0' })

let showTimeout: number | undefined
let hideTimeout: number | undefined

function showTooltip() {
  tooltipShown.value = true
  tooltipFading.value = true

  if (showTimeout) window.clearTimeout(showTimeout)
  if (hideTimeout) window.clearTimeout(hideTimeout)

  showTimeout = window.setTimeout(() => {
    tooltipFading.value = false
  }, 0)
}

function hideTooltip() {
  tooltipFading.value = true

  if (showTimeout) window.clearTimeout(showTimeout)
  if (hideTimeout) window.clearTimeout(hideTimeout)

  hideTimeout = window.setTimeout(() => {
    tooltipShown.value = false
    tooltipFading.value = false
  }, 200)
}

function moveTooltip(event: MouseEvent) {
  const left = event.offsetX + (event.target as HTMLElement).offsetLeft + 10
  const top = event.offsetY + (event.target as HTMLElement).offsetTop + 10
  tooltipStyle.value = {
    left: `${left}px`,
    top: `${top}px`
  }
}
</script>

<template>
  <span
    class="help"
    ref="help"
    @mouseenter="showTooltip()"
    @mouseleave="hideTooltip()"
    @mousemove="moveTooltip($event)"
  >
    ?
  </span>
  <span
    class="tooltip"
    :class="{ shown: tooltipShown, fading: tooltipFading }"
    ref="tooltip"
    role="tooltip"
    :style="tooltipStyle"
  >
    {{ message }}
  </span>
</template>

<style scoped lang="scss">
@use '@/assets/style/colors.scss';

.help {
  display: inline-block;
  text-align: center;
  color: colors.$on-tertiary;
  background-color: colors.$tertiary-e;
  user-select: none;
  width: 1.1rem;
  height: 1.1rem;
  line-height: calc(1.1rem - 1px);
  font-weight: bold;
}

.tooltip {
  display: none;
  background-color: colors.$secondary;
  color: colors.$on-secondary;
  padding: 0.25rem 0.5rem;
  transition: opacity 0.2s;
  box-shadow: 0 0.1rem 0.3rem #0004;
  position: fixed;
  white-space: nowrap;

  &.shown {
    display: block;
    opacity: 1;
  }

  &.fading {
    display: block;
    opacity: 0;
  }

  &.shown.fading {
    opacity: 0;
  }

  .arrow {
    position: absolute;
    background-color: colors.$secondary;
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
  }
}
</style>
