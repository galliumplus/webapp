<script setup lang="ts">
import ClockCard from '@/components/modules/dashboard/ClockCard.vue'
</script>

<template>
  <div class="layout"><ClockCard></ClockCard></div>
</template>

<style scoped lang="scss">
@use '@/assets/style/utils';

div.layout {
  box-sizing: border-box;
  @include utils.flexbox(column, flex-end, flex-start);
}
</style>
