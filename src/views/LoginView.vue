<script setup>
import { RouterLink } from 'vue-router'

import LoginLogo from '../components/LoginLogo.vue'
import LoginForm from '../components/LoginForm.vue'

import '../assets/style/login.scss'

const targetName = "Gallium+";

</script>

<template>
  <div class="login-bg">
    <div class="login-box">
      <LoginLogo/>
      <h1>Connectez-vous à {{targetName}}</h1>
      <LoginForm @submitted="console.log('FEUR')"/>

    </div>
  </div>
</template>
