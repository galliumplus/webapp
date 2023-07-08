<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import LoginLogo from '../components/LoginLogo.vue'
import FormInput from '../components/FormInput.vue'

import '../assets/style/external.scss'
</script>

<template>
  <div class="external-bg">
    <div class="external-box large">

      <h1>Erreur 404 : La page demandée n'existe pas.</h1>

      <p class="redirect-404">
        <RouterLink to="/">Retour à l'accueil</RouterLink>
      </p>
    
    </div>
  </div>
</template>
