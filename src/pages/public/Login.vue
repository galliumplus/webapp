<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  onBeforeRouteUpdate,
  type RouteLocationNormalized,
  RouterLink,
  useRoute,
  useRouter
} from 'vue-router'
import { useApi, useParams, useStore } from '@/composables'
import { Problem } from '@/business/problem'
import LoginLogo from '@/components/misc/LoginLogo.vue'
import LoginForm from '@/components/forms/LoginForm.vue'
import LoadingBar from '@/components/loading/LoadingBar.vue'
import { Done, Indeterminate, type Progress } from '@/business/progress'
import StyledButton from '@/components/basic/StyledButton.vue'
import { type LoginClient, SelfLoginClient, SsoLoginClient } from '@/business/clients'
import type { LoginCredentials } from '@/business/access'

const router = useRouter()
const api = useApi()
const store = useStore()

const client = ref<LoginClient | null>(null)
const progress = ref<Progress>(Done)
const ssoError = ref<Problem>()
let ssoApiKey: string | null = null

const mainContentHidden = computed(() => client.value === null && progress.value !== Done)

async function loadLoginClientInfo(route: RouteLocationNormalized) {
  const params = useParams(route)
  ssoApiKey = params.service.asString

  if (ssoApiKey === null) {
    client.value = new SelfLoginClient()
  } else {
    client.value = null
    progress.value = Indeterminate

    try {
      client.value = new SsoLoginClient(await api.clients.getPublicInfoSso(ssoApiKey))
    } catch (err) {
      ssoError.value = Problem.handle(err)
    } finally {
      progress.value = Done
    }
  }
}

onMounted(() => loadLoginClientInfo(useRoute()))
onBeforeRouteUpdate(loadLoginClientInfo)

async function logIn(credentials: LoginCredentials) {
  progress.value = Indeterminate

  try {
    if (client.value?.isSelf) {
      store.session = await api.logIn(credentials)
      await router.push({ name: 'dashboard' })
    } else if (ssoApiKey !== null) {
      window.location.href = await api.ssoLogIn(ssoApiKey, credentials)
    } else {
      console.error("la clé d'api est nulle")
    }
  } catch (err) {
    progress.value = Done
    // credentials.report(Problem.handle(err))
  }
}

function goBack() {
  if (window.history.length > 1) {
    window.history.back()
  } else {
    window.close()
  }
}
</script>

<template>
  <main class="public small">
    <LoadingBar :progress="progress" />
    <div class="content" :class="{ invisible: mainContentHidden }">
      <LoginLogo :client="client" />

      <template v-if="client === null">
        <h1>Erreur</h1>

        <p class="centered">
          Nous n'avons pas pu trouver l'application à laquelle vous essayez de vous connecter.
        </p>

        <details>
          <summary>Détails...</summary>
          <p>
            Erreur: {{ ssoError?.message }} <br />
            (code {{ ssoError?.errorCode }})
          </p>
        </details>

        <ul class="no-bullet">
          <li>
            <StyledButton kind="link" class="back" @click="goBack">Retour</StyledButton>
          </li>
          <li>
            <RouterLink to="/login" class="fwd">Se connecter à Gallium+</RouterLink>
          </li>
        </ul>
      </template>
      <template v-else>
        <h1>Connectez-vous à {{ client?.name }}</h1>

        <LoginForm @submit="logIn" :disabled="progress !== Done" />

        <ul class="no-bullet">
          <li>
            <RouterLink to="/login/forgot-password" class="fwd"> Mot de passe oublié ? </RouterLink>
          </li>
          <li>
            <RouterLink to="/login/help" class="fwd">Besoin d'aide ?</RouterLink>
          </li>
        </ul>
      </template>
    </div>
  </main>
</template>
