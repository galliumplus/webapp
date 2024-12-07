<script setup lang="ts">
import Card from '@/components/cards/Card.vue'
import ApplicationDetails from '@/components/modules/applications/ApplicationDetails.vue'
import { useApi, usePopUp } from '@/composables'
import { onMounted, ref } from 'vue'
import type { ClientInit } from '@/business/clients'

const api = useApi()

const clientList = ref<ClientInit[]>([])

onMounted(async () => {
  clientList.value = await api.clients.getAll()
})

function openCreationHelper() {
  usePopUp(ApplicationDetails, { title: `Nouvelle application` }).openModal()
}

function openDetails(client: ClientInit) {
  usePopUp(ApplicationDetails, { title: `Application ${client.name}`, data: client }).openModal()
}
</script>

<template>
  <Card>
    <div class="g-row g-spacing-bottom">
      <h2 class="g-grow">Applications</h2>
      <button class="g-raised g-secondary" @click="openCreationHelper()">Nouvelle</button>
    </div>
    <hr class="g-flush-bottom" />
    <ul class="g-list g-flush">
      <li v-for="client in clientList">
        <button @click="openDetails(client)" class="g-list-item">
          {{ client.name }} <span v-if="!client.isEnabled" class="g-badge">Désactivée</span>
          <span v-if="client.hasAppAccess" class="g-badge g-variant-a">Automatisée</span>
          <span v-if="client.sameSignOn !== null" class="g-badge g-variant-b">Same Sign-On</span>
        </button>
      </li>
    </ul>
  </Card>
</template>

<style scoped lang="scss"></style>
