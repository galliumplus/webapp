<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import FormInput from '../components/FormInput.vue'

import '../assets/style/external.scss'

const username = ref('')
</script>

<template>
  <div class="external-box small">
    <h1>Réinitialisation du mot de passe</h1>
    <FormInput
      label="identifiant"
      name="username"
      type="text"
      autocomplete="username"
      v-model="username"
    />

    <p v-if="!username">Saisissez votre nom d'utilisateur Gallium+.</p>

    <ul class="help-box">
      <li><RouterLink to="/login" class="back">Retour à la page de connexion</RouterLink></li>
      <li><RouterLink to="/login/help" class="fwd">Besoin d'aide ?</RouterLink></li>
    </ul>
  </div>
</template>
