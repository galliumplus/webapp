<script setup lang="ts">
import { RouterLink } from 'vue-router'
import NavLink from '@/components/NavLink.vue'
</script>

<template>
  <main class="public small">
    <h1>Votre mot de passe a bien été réinitialisé !</h1>

    <ul class="no-bullet">
      <li><NavLink to="/login" target="login">la page de connexion</NavLink></li>
      <li><RouterLink to="/login/help" class="fwd">Besoin d'aide ?</RouterLink></li>
    </ul>
  </main>
</template>
