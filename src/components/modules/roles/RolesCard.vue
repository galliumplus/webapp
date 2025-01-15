<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Card from '@/components/cards/Card.vue'
import RoleDetails from '@/components/modules/roles/RoleDetails.vue'
import type { Role } from '@/business/users'
import { useApi, usePopUp } from '@/composables'
import { deleteFirst, DismissReason, updateFirst } from '@/helpers'

const api = useApi()

const roleList = ref<Role[]>([])

onMounted(async () => {
  roleList.value = await api.roles.getAll()
})

async function openCreationHelper() {
  const popup = usePopUp(RoleDetails, { title: `Nouveau rôle` })
  popup.openModal()
  const newRole = await popup.result
  roleList.value.push(newRole)
}

async function openDetails(role: Role) {
  const popup = usePopUp(RoleDetails, { title: `Rôle ${role.name}`, data: role })
  popup.openModal()
  try {
    role = await popup.result
    updateFirst(roleList.value, (r) => r.id === role.id, role)
  } catch (reason) {
    if (reason === DismissReason.Deleted) {
      deleteFirst(roleList.value, (r) => r.id === role.id)
    }
  }
}
</script>

<template>
  <Card>
    <div class="g-row g-spacing-bottom">
      <h2 class="g-grow">Rôles</h2>
      <button class="g-raised g-secondary" @click="openCreationHelper()">Nouveau</button>
    </div>
    <hr class="g-flush-bottom" />
    <ul class="g-list g-flush">
      <li v-for="role in roleList">
        <button @click="openDetails(role)" class="g-list-item">
          {{ role.name }}
        </button>
      </li>
    </ul>
  </Card>
</template>

<style scoped lang="scss"></style>
