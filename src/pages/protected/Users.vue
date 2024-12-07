<script setup lang="ts">
import ToolsCard from '@/components/cards/ToolsCard.vue'
import TableCard from '@/components/cards/TableCard.vue'
import UserCard from '@/components/modules/users/UserCard.vue'
import { useApi } from '@/composables'
import { onMounted, ref } from 'vue'
import { User } from '@/business/users'

const api = useApi()

const userList = ref<User[]>([])
const activeUser = ref(-1)

onMounted(async () => {
  userList.value = await api.users.getAll()
  userList.value.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
  for (let i = 0; i < 100; i++) {
    userList.value.push(
      new User({
        id: String(9000 + i),
        deposit: null,
        email: 'joe@biden.net',
        firstName: 'Joe',
        lastName: 'Biden',
        role: 0,
        isMember: false,
        year: 'JOE BIDEN'
      })
    )
  }
})

function selectUser(i: number): void {
  activeUser.value = i
}
</script>

<template>
  <div class="g-column g-no-gap full-height">
    <div class="g-row">
      <ToolsCard class="g-grow">
        <button class="g-raised g-secondary">Nouvelle adhésion</button>
        <button class="g-raised g-secondary">Créer un utilisateur</button>
      </ToolsCard>
    </div>
    <div class="g-row g-grow g-min-height-0">
      <TableCard
        class="g-grow"
        title="liste des utilisateurs"
        :columns="[
          ['Identifiant', 'left', ''],
          ['Prénom NOM', 'left', '']
        ]"
      >
        <tr
          v-for="(user, i) in userList"
          @click="selectUser(i)"
          :class="[activeUser === i ? 'highlight' : '']"
        >
          <td>{{ user.id }}</td>
          <td :class="{ em: !user.hasName }">
            {{ user.hasName ? user.longDisplayName : 'Inconnu' }}
          </td>
        </tr>
      </TableCard>
      <UserCard :user="userList[activeUser] as User"></UserCard>
    </div>
  </div>
</template>

<style scoped lang="scss">
tr.highlight {
  background-color: #fdd4c9;
}

.full-height {
  height: 100%;
}
</style>
