<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { RouterView } from 'vue-router'

onBeforeMount(() => {
  document.body.className = 'public'
})
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@import '@/assets/style/colors.scss';
@import '@/assets/style/mixins.scss';

main.public {
  color: $bright;
  background-color: $dark;
  font-size: 1.1rem;
  @include media-desktop {
    box-shadow: $dark-shadow 0 0 16px;
  }

  @include animation-popup;

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
