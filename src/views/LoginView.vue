<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import LoginLogo from '../components/LoginLogo.vue'
import LoginForm from '../components/LoginForm.vue'
import Loading from '../components/Loading.vue'

import '../assets/style/external.scss'

const route = useRoute()

const serviceToken = route.query.service
let serviceName = ref('Gallium+')
let fetchingServiceInfo = ref(false)

if (serviceToken !== undefined) {
  fetchingServiceInfo.value = true
  // TODO
}
</script>

<template>
  <div class="external-bg">
    <div class="external-box small">
      <Loading :active="fetchingServiceInfo">
        <LoginLogo />
        <h1>Connectez-vous à {{ serviceName }}</h1>

        <LoginForm @submitted="console.log('login')" />

        <ul class="help-box">
          <li>
            <RouterLink to="/login/reset-password" class="fwd">Mot de passe oublié ?</RouterLink>
          </li>
          <li><RouterLink to="/login/help" class="fwd">Besoin d'aide ?</RouterLink></li>
        </ul>
      </Loading>
      <div class="about-box">
        <RouterLink to="/about">À propos</RouterLink>
      </div>
    </div>
  </div>
</template>
