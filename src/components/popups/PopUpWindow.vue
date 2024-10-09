<script setup lang="ts">
import { type PopUp, ThisPopUp } from '@/services/popups'
import { provide } from 'vue'

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
@import '@/assets/style/colors';
@import '@/assets/style/mixins';

div {
  background: white;
  border: 2px solid $grey-70;
  width: 820px;
  max-width: calc(100% - 2rem);

  :deep(main) {
    padding: 1rem;
  }

  :deep(footer) {
  }
}
</style>
