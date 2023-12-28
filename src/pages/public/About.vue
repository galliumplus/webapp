<script setup lang="ts">
import NavLink from '@/components/NavLink.vue'
</script>

<template>
  <main class="public large">
    <h1>À propos de Gallium+</h1>

    <p>
      Gallium+ est le progiciel de gestion intégré de <a href="https://etiq-dijon.fr">l'ETIQ</a>,
      l'association des étudiants et anciens étudiants du département informatique de
      <a href="https://iutdijon.u-bourgogne.fr/www/">l'IUT de Dijon</a>. Cette application web est
      destinée à tous les adhérents afin de leur permettre de consulter et gérer leurs informations.
    </p>

    <h2>Confidentialité</h2>

    <p>[WIP]</p>

    <h2>Crédits</h2>

    <p>
      Louis DEVIE (<a href="mailto:louisdevie.contact@gmail.com">louisdevie.contact@gmail.com</a>),
      Ashot MANUKYAN, Lucas PIRES
    </p>

    <ul class="no-bullet">
      <li><NavLink to="/login" target="login">la page de connexion</NavLink></li>
    </ul>
  </main>
</template>
