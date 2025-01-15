<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { RouterView } from 'vue-router'

onBeforeMount(() => {
  document.body.className = 'g-public'
})
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@use '@/assets/style/colors.scss';
@use '@/assets/style/utils';

main.public {
  color: var(--on-surface);
  background-color: var(--surface);

  @include utils.animation-popup;
  @include colors.context-dark;

  @include utils.media-desktop {
    box-shadow: colors.$shadow-dark 0 0 16px;
  }

  &.small {
    width: 452px;
  }

  &.large {
    width: 852px;
  }

  .content {
    padding: 26px;
  }

  input,
  button[type='submit'] {
    width: 100%;
    box-sizing: border-box;
  }

  h1 {
    font-size: 2rem;
    text-align: center;
    margin: 1rem 0 2rem 0;
  }

  h2 {
    font-size: 1.5rem;
    text-align: left;
    margin: 0.5rem 0 1rem 0;
  }

  #about {
    padding-top: 0;
    text-align: center;
  }
}
</style>
