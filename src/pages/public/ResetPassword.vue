<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import PasswordModificationForm from '@/components/forms/PasswordModificationForm.vue'
import { Query } from '@/helpers'
import { useApi } from '@/composables'
import NavLink from '@/components/basic/NavLink.vue'

const route = useRoute()
const api = useApi()

const user = Query.firstOrDefault(route.query.user, '')
const pprt = Query.firstOrDefault(route.query.pprt, '')
const done = ref(false)

async function resetPassword(passwords: { newPassword: string }) {
  console.log(api)
  await api.users.changePassword(user, { newPassword: passwords.newPassword, resetToken: pprt })
  done.value = true
}
</script>

<template>
  <main class="public small">
    <div class="content">
      <h1>Réinitialisation du mot de passe</h1>

      <p v-if="done">Votre mot de passe a bien été réinitialisé !</p>

      <PasswordModificationForm :current-password-needed="false" @submit="resetPassword" v-else />

      <ul class="no-bullet">
        <li>
          <NavLink to="/login" target="login">la page de connexion</NavLink>
        </li>
        <li>
          <RouterLink to="/login/help" class="fwd">Besoin d'aide ?</RouterLink>
        </li>
      </ul>
    </div>
  </main>
</template>
