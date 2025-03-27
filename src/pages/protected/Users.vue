<script setup lang="ts">
import _ from 'lodash'
import { onMounted, shallowRef } from 'vue'
import { onBeforeRouteUpdate, type RouteLocation, useRoute } from 'vue-router'
import TableCard from '@/components/cards/TableCard.vue'
import ToolsCard from '@/components/cards/ToolsCard.vue'
import UserCard from '@/components/modules/users/UserCard.vue'
import { User } from '@/business/users'
import { useApi } from '@/composables/api'
import { first } from '@/helpers'
import router from '@/router'

const route = useRoute()
const api = useApi()

const userList = shallowRef<User[]>([])
const selectedUser = shallowRef<User | undefined>()

function selectUser(id: string): void {
  router.replace({ name: 'users', params: { id } })
}

function updateSelectedUser(route: RouteLocation) {
  const id = first(route.params.id)
  if (id === null) {
    selectedUser.value = undefined
  } else {
    selectedUser.value = userList.value.find((user) => user.id === id)
  }
}

onMounted(async () => {
  const allUsers = await api.users.getAll()
  userList.value = _.sortBy(allUsers, 'id')
  updateSelectedUser(route)
})

onBeforeRouteUpdate(updateSelectedUser)
</script>

<template>
  <div class="g-column g-no-gap g-height-full">
    <div class="g-row">
      <ToolsCard class="g-width-full">
        <button class="g-raised g-secondary">Nouvelle adhésion</button>
        <button class="g-raised g-secondary">Créer un utilisateur</button>
      </ToolsCard>
    </div>
    <div class="g-row g-grow g-min-height-0">
      <TableCard class="g-grow" title="Liste des utilisateurs">
        <template v-slot:header>
          <th>Identifiant</th>
          <th>Prénom NOM</th>
        </template>
        <template v-slot:rows>
          <tr
            v-for="user in userList"
            @click="selectUser(user.id)"
            :class="{ 'g-active': user.id === selectedUser?.id }"
          >
            <td>{{ user.id }}</td>
            <td :class="{ em: !user.hasName }">
              {{ user.hasName ? user.longDisplayName : 'Inconnu' }}
            </td>
          </tr>
        </template>
      </TableCard>
      <UserCard :user="selectedUser"></UserCard>
    </div>
  </div>
</template>
