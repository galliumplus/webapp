<script setup lang="ts">
import ApplicationsCard from '@/components/modules/applications/ApplicationsCard.vue'
</script>

<template>
  <div class="layout"><ApplicationsCard class="g-w-50"></ApplicationsCard></div>
</template>

<style scoped lang="scss">
@import '@/assets/style/mixins';

div.layout {
  box-sizing: border-box;
  @include flexbox(column, flex-start, flex-start);
}
</style>
