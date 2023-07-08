<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import LoginLogo from '../components/LoginLogo.vue'
import LoginForm from '../components/LoginForm.vue'

import '../assets/style/external.scss'

const route = useRoute();

const serviceToken = route.query.service;
let serviceName = ref('Gallium+');
let fetchingServiceInfo = ref(false);

if (serviceToken !== undefined) {
  // TODO
}

</script>

<template>
  <div class="external-bg">
    <div class="external-box small">

      <template v-if="!fetchingServiceInfo">

        <LoginLogo />
        <h1>Connectez-vous à {{ serviceName }}</h1>

        <LoginForm @submitted="console.log('login')" />

        <ul class="help-box">
          <li><RouterLink to="/login/reset-password" class="fwd">Mot de passe oublié ?</RouterLink></li>
          <li><RouterLink to="/login/help" class="fwd">Besoin d'aide ?</RouterLink></li>
        </ul>

      </template>

    </div>
  </div>
</template>
