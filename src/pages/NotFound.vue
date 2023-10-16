<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
      <h1>Erreur 404 : La page demandée n'existe pas.</h1>

      <p><RouterLink to="/">Retour à l'accueil</RouterLink></p>
  </main>
</template>

<style scoped lang="scss">
main {
  min-height: 80vh;
  min-height: 80svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1, p {
  text-align: center;
}

p {
  font-size: 14pt;
}
</style>