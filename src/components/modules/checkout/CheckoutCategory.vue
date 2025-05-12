<script setup lang="ts">
import Card from '@/components/cards/Card.vue'
import CheckoutItem from '@/components/modules/checkout/CheckoutItem.vue'

const items = new Array(40)
</script>

<template>
  <Card>
    <div class="item-grid">
      <CheckoutItem v-for="item in items"></CheckoutItem>
    </div>
  </Card>
</template>

<style scoped lang="scss">
.item-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  row-gap: 1rem;
}
</style>
