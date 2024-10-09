<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useApi } from '@/composables'
import FormInput from '@/components/basic/FormInput.vue'
import StyledButton from '@/components/basic/StyledButton.vue'
import { Problem } from '@/business/problem'
import Zincon from '@/components/basic/Zincon.vue'
import NavLink from '@/components/basic/NavLink.vue'

const route = useRoute()
const api = useApi()

const userId = ref('')
const userIdProblem = ref<Problem>()

const canResetPassword = ref<boolean | null>(null)

async function continuer() {
  if (userId.value.trim() == '') {
    userIdProblem.value = new Problem('Veuillez saisir votre identifiant')
  } else {
    try {
      const result = await api.users.canResetPassword(userId.value)
      if (result) await api.users.askForPasswordReset(userId.value)
      canResetPassword.value = result
    } catch (e) {
      console.error(e)
      userIdProblem.value = new Problem('Identifiant inconnu')
    }
  }
}
</script>

<template>
  <main class="public small">
    <div class="content">
      <h1>Mot de passe oublié</h1>

      <template v-if="canResetPassword === null">
        <FormInput
          name="username"
          v-model="userId"
          type="text"
          label="Identifiant"
          :problem="userIdProblem"
        />

        <StyledButton kind="raised-accented" type="submit" @click="continuer()"
          >Continuer
        </StyledButton>
      </template>

      <template v-if="canResetPassword === true">
        <p class="g-center">
          Un mail contenant un lien pour réinitialiser votre mot de passe vient de vous être envoyé.
          <br />
          <Zincon of="mail-fast" size="huge" />
        </p>
      </template>

      <template v-if="canResetPassword === false">
        <p class="g-center">
          Votre compte est actif, mais nous ne pouvons pas vous envoyer un mail pour confirmer votre
          identité. Veuillez vous présenter au local de l'association pour récupérer votre compte.
        </p>
      </template>

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
