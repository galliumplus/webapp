<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { RouterView } from 'vue-router'

onBeforeMount(() => {
  document.body.className = 'dashboard';
})
</script>

<template>
  <header>
    <!--HeaderLogo/-->
    Gallium+
  </header>

  <main>
    <RouterView />
  </main>

  <nav>
    <RouterLink to="/dashboard">Maître</RouterLink>
    <RouterLink to="/dashboard/details">Détails</RouterLink>
  </nav>
</template>

<style type="text/scss"></style>
