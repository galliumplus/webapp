<script setup lang="ts">
import { provide } from 'vue'
import { type PopUp, ThisPopUp } from '@/services/popups'

interface Props {
  popUp: PopUp
}

const props = defineProps<Props>()

provide(ThisPopUp, props.popUp)
</script>

<template>
  <div @click="$event.stopPropagation()">
    <Component :is="popUp.component"></Component>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/style/colors';
@use '@/assets/style/utils';

div {
  background: white;
  border: 2px solid #aaa;
  width: 820px;
  max-width: 100%;
  height: 580px;
  max-height: 100%;
  @include utils.animation-popup;
  @include utils.flexbox(column);

  :deep(main) {
    padding: 1rem;
    flex: 1 1;
    overflow-y: auto;
  }

  :deep(footer) {
    @include colors.context-dark;
    background: var(--surface);
    border-bottom: 4px solid var(--surface-shadow);
    padding: 0.5rem;
  }
}
</style>
