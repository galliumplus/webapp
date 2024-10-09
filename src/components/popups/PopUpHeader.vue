<script setup lang="ts">
import { inject } from 'vue'
import { ThisPopUp } from '@/services/popups'
import IconButton from '@/components/basic/IconButton.vue'

const popUp = inject(ThisPopUp)
</script>

<template>
  <header v-if="popUp !== undefined">
    <h1>
      <span class="g-grow"></span>
      <span>{{ popUp.title }}</span>
      <span class="g-grow g-right">
        <IconButton kind="flat-dark" icon="arrow-box-out" />
        <IconButton kind="flat-dark" icon="cross" @click="popUp.dismiss()" />
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
  color: $grey-90;
  background: $grey-10;
  border-bottom: 4px solid $grey-05;

  h1 {
    margin: 0;
    @include flexbox(row, center);
    font-size: 12pt;
  }

  nav {
    padding-left: 1rem;
    @include flexbox(row, flex-end, flex-start);
  }
}
</style>
