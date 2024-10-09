<script setup lang="ts">
interface Props {
  when: boolean
}

defineProps<Props>()
</script>

<template>
  <div :class="{ loading: when }">
    <div :class="{ invisible: when }"><slot /></div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/style/colors.scss';

.loading {
  animation: shine 1.2s infinite;
  background-color: $overlay-dark;
  background-image: linear-gradient(90deg, $overlay-dark 0%, $grey-90 20%, $overlay-dark 40%);
  background-size: 200%;
}

@keyframes shine {
  0% {
    background-position: 100%;
  }

  50%,
  100% {
    background-position: -100%;
  }
}
</style>
