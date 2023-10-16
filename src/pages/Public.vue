<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { RouterView } from 'vue-router'

onBeforeMount(() => {
  document.body.className = 'public';
})
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@import '@/assets/style/colors.scss';
@import '@/assets/style/mixins.scss';

main.public {
  padding: 26px;

  color: $bright;
  background-color: $dark;
  font-size: 1.1rem;

  animation: 0.15s ease-out forwards popup;

  &.small {
    width: 400px;
  }

  &.large {
    width: 750px;
  }

  input {
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
    margin-top: 30px;

    text-align: center;
  }
}

@keyframes popup {
  from {
    transform: scale(0.9);
  }
  to {
    transform: none;
  }
}
</style>
