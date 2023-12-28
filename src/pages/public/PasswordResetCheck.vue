<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import FormInput from '@/components/basic/FormInput.vue'
import NavLink from '@/components/NavLink.vue'

const username = ref('')
</script>

<template>
  <main class="public small">
    <h1>Réinitialisation du mot de passe</h1>
    <FormInput
      label="identifiant"
      name="username"
      type="text"
      autocomplete="username"
      v-model="username"
    />

    <p v-if="!username">Saisissez votre nom d'utilisateur Gallium+.</p>

    <ul class="no-bullet">
      <li><NavLink to="/login" target="login">la page de connexion</NavLink></li>
      <li><RouterLink to="/login/help" class="fwd">Besoin d'aide ?</RouterLink></li>
    </ul>
  </main>
</template>
