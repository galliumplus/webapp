<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useApi } from '@/composables'
import store from "@/store"

import Problem from '@/logic/problem'

import LoginLogo from '@/components/LoginLogo.vue'
import LoginForm from '@/components/LoginForm.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorBox from '@/components/ErrorBox.vue'

const route = useRoute()
const router = useRouter()
const api = useApi()

const serviceName = ref('Gallium+')
const fetchingServiceInfo = ref(false)
const loggingIn = ref(false)
const problem = ref<Problem|undefined>() 

onMounted(() => {
  const serviceToken = route.query.service
  if (serviceToken !== undefined) {
    fetchingServiceInfo.value = true
    // TODO
  }
})

function checkInputs(username: string, password: string): boolean {
  if (username.length == 0)
  {
    problem.value = new Problem("Veuillez saisir votre nom d'utilisateur.")
    return false;
  }

  if (password.length == 0)
  {
    problem.value = new Problem("Veuillez saisir votre mot de passe.")
    return false;
  }

  return true;
}

async function logIn(username: string, password: string) {
  if (!checkInputs(username, password)) {
    return;
  }

  loggingIn.value = true

  try
  {
    store.session = await api.login(username, password)
    router.push({ name: 'dashboard' })
  }
  catch (err)
  {
    loggingIn.value = false
    problem.value = Problem.handle(err)
  }
}
</script>

<template>
  <main class="public small">
    <LoadingSpinner :when="fetchingServiceInfo">
      <LoginLogo />
      <h1>Connectez-vous à {{ serviceName }}</h1>

      <ErrorBox v-model="problem"/>

      <LoginForm @submit="logIn" :disabled="loggingIn"/>

      <ul class="no-bullet">
        <li><RouterLink to="/login/reset-password" class="fwd">Mot de passe oublié ?</RouterLink></li>
        <li><RouterLink to="/login/help" class="fwd">Besoin d'aide ?</RouterLink></li>
      </ul>
    </LoadingSpinner>

    <div id="about">
      <RouterLink to="/about">À propos</RouterLink>
    </div>
  </main>
</template>