<script setup lang="ts">
import { inject } from 'vue'
import { useThisPopUp } from '@/composables/popups'
import Zincon from '@/components/basic/Zincon.vue'

const popUp = useThisPopUp()
</script>

<template>
  <header>
    <h1>
      <span class="popup-header-left"></span>
      <span>{{ popUp.title }}</span>
      <span class="popup-header-right">
        <button class="g-flat" @click="popUp.dismiss()"><Zincon of="cross" /></button>
      </span>
    </h1>
    <nav>
      <slot />
    </nav>
  </header>
</template>

<style scoped lang="scss">
@import '@/assets/style/colors';
@import '@/assets/style/mixins';

header {
  @include context-dark;
  color: var(--on-surface);
  background: var(--surface);
  border-bottom: 4px solid var(--surface-shadow);

  h1 {
    margin: 0;
    @include flexbox(row, center);
    font-size: 12pt;
  }

  nav {
    padding-left: 1rem;
    margin-top: 0.5rem;
    @include flexbox(row, flex-end, flex-start);
  }
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
