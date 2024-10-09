<script setup lang="ts">
import ClockCard from '@/components/modules/dashboard/ClockCard.vue'
</script>

<template>
  <div class="layout"><ClockCard></ClockCard></div>
</template>

<style scoped lang="scss">
@import '@/assets/style/mixins';

div.layout {
  box-sizing: border-box;
  @include flexbox(column, flex-end, flex-start);
}
</style>
