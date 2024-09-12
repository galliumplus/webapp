<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { onBeforeMount } from 'vue'

onBeforeMount(() => {
  document.body.className = 'public'
})
</script>

<template>
  <main class="public">
    <h1>Erreur 404 : La page demandée n'existe pas.</h1>

    <p><RouterLink to="/">Retour à l'accueil</RouterLink></p>
  </main>
</template>

<style scoped lang="scss">
@import '@/assets/style/colors.scss';
@import '@/assets/style/mixins.scss';

main.public {
  padding: 26px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  color: $bright;
  background-color: $dark;
  font-size: 1.1rem;
  @include media-desktop {
    box-shadow: $dark-shadow 0 0 16px;
  }

  @include animation-popup;
}

h1,
p {
  text-align: center;
}

p {
  font-size: 14pt;
}
</style>
