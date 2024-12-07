<script setup lang="ts">
import { PopUpService } from '@/services/popups/service'
import PopUpWindow from '@/components/popups/PopUpWindow.vue'
const openModals = PopUpService.instance.openModals
</script>

<template>
  <div class="modal-overlay" v-for="modal in openModals" @click="modal.dismiss()">
    <PopUpWindow :popUp="modal" />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/style/mixins.scss';

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100lvw;
  height: 100lvh;
  @include flexbox(column, center, center);
  background: repeating-linear-gradient(135deg, #0004 0 14px, #3334 14px 18px);
  animation: fadeIn 0.2s;
  padding: 2rem;
  box-sizing: border-box;
}
</style>
