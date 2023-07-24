<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { RouterView } from 'vue-router'
import TabNav from '@/components/TabNav.vue'
import Tab from '@/components/Tab.vue'

import pabloUrl from '@/assets/images/pablo.png'
import pablitaUrl from '@/assets/images/pablita.png'

onBeforeMount(() => {
  document.body.className = 'dashboard';
})
</script>

<template>
  <main class="dashboard">
    <RouterView />
  </main>

  <TabNav>
    <Tab link="/dashboard/my-account" label="Mon compte" :icon="pablitaUrl"/>
    <Tab link="/dashboard" label="Accueil" :icon="pabloUrl"/>
    <Tab link="/dashboard/details" label="Historique" :icon="pablitaUrl"/>
    <!--Tab link="/dashboard/details" label="Admin" :icon="pablitaUrl"/-->
  </TabNav>
</template>

<style lang="scss">
main.dashboard {
  flex-grow: 1;
  overflow-y: scroll;
}
</style>
