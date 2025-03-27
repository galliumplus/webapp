<script setup lang="ts">
import PopUpWindow from '@/components/popups/PopUpWindow.vue'
import { PopUpService } from '@/services/popups/service'

const openModals = PopUpService.instance.openModals
</script>

<template>
  <div class="modal-overlay" v-for="modal in openModals" @click="modal.minimize()">
    <PopUpWindow :popUp="modal" />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/style/utils';

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100lvw;
  height: 100lvh;
  @include utils.flexbox(column, center, center);
  background: repeating-linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.25) 0 14px,
    rgba(30, 30, 30, 0.25) 14px 18px
  );
  animation: fadeIn 0.2s;
  padding: 2rem;
  box-sizing: border-box;
}
</style>
