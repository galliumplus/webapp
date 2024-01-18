<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import PasswordModificationForm from '@/components/PasswordModificationForm.vue'
import NavLink from '@/components/NavLink.vue'
import { Query } from '@/helpers'
import { useApi } from '@/composables'

const route = useRoute()
const router = useRouter()
const api = useApi()

const user = Query.firstOrDefault(route.query.user, '')
const pprt = Query.firstOrDefault(route.query.pprt, '')

async function resetPassword(passwords: { newPassword: string }) {
  console.log(api)
  await api.users.changePassword(user, { newPassword: passwords.newPassword, resetToken: pprt })

  await router.push({ name: 'password-reset-success' })
}
</script>

<template>
  <main class="public small">
    <h1>Réinitialisation du mot de passe</h1>

    <PasswordModificationForm :current-password-needed="false" @submit="resetPassword" />

    <ul class="no-bullet">
      <li><NavLink to="/login" target="login">la page de connexion</NavLink></li>
      <li><RouterLink to="/login/help" class="fwd">Besoin d'aide ?</RouterLink></li>
    </ul>
  </main>
</template>
