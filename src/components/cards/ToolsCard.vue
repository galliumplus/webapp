<script setup lang="ts">
import Card from '@/components/cards/Card.vue'
</script>

<template>
  <Card>
    <h2>Outils</h2>
    <div class="g-row">
      <slot />
    </div>
  </Card>
</template>

<style scoped lang="scss"></style>
