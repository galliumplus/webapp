<script setup lang="ts">
import Card from '@/components/cards/Card.vue'
import ToolsCard from '@/components/cards/generic/ToolsCard.vue'
import StyledButton from '@/components/basic/StyledButton.vue'
import TableCard from '@/components/cards/generic/TableCard.vue'
import { useApi } from '@/composables'
import { onMounted, ref } from 'vue'
import { User } from '@/business/users'
import UserCard from '@/components/cards/users/UserCard.vue'

const api = useApi()

const userList = ref<User[]>([])
const activeUser = ref(-1)

onMounted(async () => {
  userList.value = await api.users.getAll()
  userList.value.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
  console.log(userList.value)
})

function selectUser(i: number): void {
  activeUser.value = i
}
</script>

<template>
  <div class="g-column g-no-gap">
    <div class="g-row">
      <ToolsCard class="g-grow">
        <StyledButton kind="raised-bright">nouvelle adhésion</StyledButton>
        <StyledButton kind="raised-bright">créer un utilisateur</StyledButton>
      </ToolsCard>
    </div>
    <div class="g-row g-grow">
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
      <UserCard :user="userList[activeUser]"></UserCard>
    </div>
  </div>
</template>

<style scoped lang="scss">
tr.highlight {
  background-color: #fdd4c9;
}
</style>
