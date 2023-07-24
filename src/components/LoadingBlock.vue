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
@import "@/assets/style/colors.scss";

.loading {
animation: shine 1.2s infinite;
  background-color: $dark-overlay;
  background-image: linear-gradient(90deg, $dark-overlay 0%, $bright 20%, $dark-overlay 40%);
  background-size: 200%;
}

@keyframes shine {
  0% {
    background-position: 100%;
  }

  50%, 100% {
    background-position: -100%;
  }
}
</style>