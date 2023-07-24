<script setup lang="ts">
interface Props {
  when: boolean
}

defineProps<Props>()
</script>

<template>
  <div :class="{ invisible: when }"><slot /></div>
  <svg
    :class="{ 'no-display': !when }"
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

<style scoped lang="scss">
@import "@/assets/style/colors.scss";

svg {
  stroke: $bright;
  position: absolute;
  left: calc(50% - 23px);
  top: calc(50% - 23px);
}

$offset: 120;
$duration: 1.4s;

svg {
  animation: rotation $duration linear infinite;

  .path {
    stroke-dasharray: $offset;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: dash $duration ease-in-out infinite;
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: $offset;
  }
  50% {
    stroke-dashoffset: calc($offset / 4);
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: $offset;
    transform: rotate(450deg);
  }
}
</style>