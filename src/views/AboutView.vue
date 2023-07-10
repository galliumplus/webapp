<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import store from '../store'

import LoginLogo from '../components/LoginLogo.vue'
import FormInput from '../components/FormInput.vue'
import NavLink from '../components/NavLink.vue'

import '../assets/style/external.scss'

const username = ref('')
</script>

<template>
  <div class="external-bg">
    <div class="external-box large">
      <h1>À propos de Gallium+</h1>

      <p>
        Gallium+ est le progiciel de gestion intégré de <a href="https://etiq-dijon.fr">l'ETIQ</a>,
        l'association des étudiants et anciens étudiants du département informatique de
        <a href="https://iutdijon.u-bourgogne.fr/www/">l'IUT de Dijon</a>. Cette application web est
        destinée à tous les adhérents afin de leur permettre de consulter et gérer leurs
        informations.
      </p>

      <ul class="help-box">
        <li><NavLink to="/login" target="login">la page de connexion</NavLink></li>
      </ul>
    </div>
  </div>
</template>
