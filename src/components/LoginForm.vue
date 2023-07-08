<script setup>
import FormInput from './FormInput.vue'
</script>

<template>
  <form @submit.prevent="$emit('submitted')">
    <FormInput label="identifiant" name="username" type="text" autocomplete="username" />
    <FormInput
      label="mot de passe"
      name="password"
      type="password"
      autocomplete="current-password"
    />

    <input class="login-submit-button" type="submit" value="connexion" />
  </form>
</template>
