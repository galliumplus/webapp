<script setup lang="ts">
import Card from '@/components/cards/Card.vue'
import StyledButton from '@/components/basic/StyledButton.vue'
import ApplicationDetails from '@/components/modules/applications/ApplicationDetails.vue'
import { useApi, usePopUp } from '@/composables'
import { onMounted, ref } from 'vue'
import type { ClientSummary } from '@/business/clients/client'

const api = useApi()

const clientList = ref<ClientSummary[]>([])

onMounted(async () => {
  clientList.value = await api.clients.getAll()
})

function openDetails(client: ClientSummary) {
  usePopUp(ApplicationDetails, { title: `Application ${client.name}` }).openModal()
}
</script>

<template>
  <Card>
    <div class="g-row g-spacing-bottom">
      <h2 class="g-grow">Applications</h2>
      <StyledButton kind="raised-bright">nouvelle</StyledButton>
    </div>
    <table>
      <colgroup>
        <col class="g-w-75" />
        <col class="g-w-25" />
      </colgroup>
      <thead>
        <tr></tr>
      </thead>
      <tbody>
        <tr v-for="client in clientList">
          <td>
            {{ client.name }} <span v-if="!client.isEnabled" class="g-badge">désactivée</span>
          </td>
          <td class="g-right">
            <StyledButton kind="raised-bright" @click="openDetails(client)">détails</StyledButton>
          </td>
        </tr>
      </tbody>
    </table>
  </Card>
</template>

<style scoped lang="scss"></style>
