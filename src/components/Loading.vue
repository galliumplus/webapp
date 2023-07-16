<script setup lang="ts">
interface Props {
  active: boolean
}

defineProps<Props>()
</script>

<template>
  <div :class="{ invisible: active }"><slot /></div>
  <svg
    :class="{ 'no-display': !active }"
    class="spinner"
    width="45px"
    height="45px"
    viewBox="0 0 46 46"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      class="path"
      fill="none"
      stroke-width="4"
      stroke-linecap="flat"
      cx="23"
      cy="23"
      r="20"
    ></circle>
  </svg>
</template>
