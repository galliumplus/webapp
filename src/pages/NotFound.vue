<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { RouterLink } from 'vue-router'

onBeforeMount(() => {
  document.body.className = 'g-public'
})
</script>

<template>
  <main class="public">
    <h1>Erreur 404 : La page demandée n'existe pas.</h1>

    <p><RouterLink to="/">Retour à l'accueil</RouterLink></p>
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/style/colors.scss';
@use '@/assets/style/utils';

main.public {
  padding: 26px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  color: var(--on-surface);
  background-color: var(--surface);
  font-size: 1.1rem;

  @include utils.animation-popup;

  @include utils.media-desktop {
    box-shadow: colors.$shadow-dark 0 0 16px;
  }
}

h1,
p {
  text-align: center;
}

p {
  font-size: 14pt;
}
</style>
