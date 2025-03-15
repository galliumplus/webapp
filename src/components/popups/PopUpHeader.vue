<script setup lang="ts">
import Zincon from '@/components/basic/Zincon.vue'
import { useThisPopUp } from '@/composables'
import { Reason } from '@/helpers'

interface Props {
  showCloseButton?: boolean
}

const popUp = useThisPopUp()

withDefaults(defineProps<Props>(), {
  showCloseButton: true
})
</script>

<template>
  <header>
    <h1>
      <span class="popup-header-left"></span>
      <span class="popup-header-title">{{ popUp.title }}</span>
      <span class="popup-header-right">
        <button v-if="showCloseButton" class="g-flat" @click="popUp.dismiss(Reason.Cancelled)">
          <Zincon of="cross" />
        </button>
      </span>
    </h1>
    <nav>
      <slot />
    </nav>
  </header>
</template>

<style scoped lang="scss">
@use '@/assets/style/colors';
@use '@/assets/style/utils';

header {
  @include colors.context-dark;
  color: var(--on-surface);
  background: var(--surface);
  border-bottom: 4px solid var(--surface-shadow);
  padding: 0.5rem 0.5rem 0 0.5rem;

  h1 {
    margin: 0;
    @include utils.flexbox(row, center);
    font-size: 12pt;
  }

  nav {
    padding-left: 0.5rem;
    margin-top: 0.5rem;
    @include utils.flexbox(row, flex-end, flex-start);
  }
}

.popup-header-title {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  line-height: 1.5;
}

.popup-header-left,
.popup-header-right {
  flex: 1 1;
}

.popup-header-left {
  text-align: left;
}

.popup-header-right {
  text-align: right;
}
</style>
