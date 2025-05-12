<script setup lang="ts">
import { ref } from 'vue'
import TextInput from '@/components/basic/TextInput.vue'
import Card from '@/components/cards/Card.vue'

const customer = ref('')
</script>

<template>
  <Card class="g-column">
    <div>
      <h2>Client</h2>
      <TextInput name="customer-selector" v-model="customer" />
    </div>
    <div class="g-row g-small-gap">
      <h2 class="g-grow">Total</h2>
      <span class="customer-total">3,10&nbsp;€</span>
    </div>
    <div class="g-row g-small-gap">
      <button class="g-raised g-secondary payment-button">A</button>
      <button class="g-raised g-secondary payment-button">E<span class="favourite"></span></button>
      <button class="g-raised g-secondary payment-button">CB</button>
      <button class="g-raised g-secondary payment-button">PP</button>
    </div>
  </Card>
</template>

<style scoped lang="scss">
.customer-total {
  font-size: 14pt;
}

.payment-button {
  position: relative;
  flex: 1 1 0;

  .favourite {
    position: absolute;
    top: -9px;
    right: -7px;
    display: block;
    width: 26px;
    height: 26px;
    background-image: url('@/assets/images/heart.svg');
    background-size: contain;
  }

  &:active .favourite {
    top: -11px;
  }
}
</style>
