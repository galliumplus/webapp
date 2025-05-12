<script setup lang="ts">
import CardTabs from '@/components/cards/CardTabs.vue'
import CartCard from '@/components/modules/checkout/CartCard.vue'
import CheckoutCategory from '@/components/modules/checkout/CheckoutCategory.vue'
import OrdersCard from '@/components/modules/checkout/OrdersCard.vue'
import PaymentCard from '@/components/modules/checkout/PaymentCard.vue'
</script>

<template>
  <div class="g-row g-min-height-0 g-height-full">
    <div class="g-grow main-column">
      <CheckoutCategory />
      <CheckoutCategory />
    </div>
    <div class="g-column g-no-gap side-column">
      <CardTabs class="g-grow" :tabs="['Panier', 'Commandes']">
        <template v-slot:tab-1><CartCard /></template>
        <template v-slot:tab-2><OrdersCard /></template>
      </CardTabs>
      <PaymentCard />
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-column {
  overflow-y: scroll;
}

.side-column {
  max-width: 400px;
  width: 25%;
  min-width: 300px;
}
</style>
