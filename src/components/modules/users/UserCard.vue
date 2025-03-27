<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Card from '@/components/cards/Card.vue'
import { type Role, User } from '@/business/users'
import { useCurrentSchoolYear } from '@/composables'

interface Props {
  user?: User
}

const role = ref<Role | undefined>(undefined)

const props = defineProps<Props>()
const currentSchoolYear = useCurrentSchoolYear()
watch(
  () => props.user,
  async () => {
    role.value = undefined
    role.value = await props.user?.role.get()
  }
)
</script>

<template>
  <Card>
    <h2>Fiche utilisateur</h2>
    <hr />
    <div v-if="user === undefined" class="g-dim sheet-content">Aucun utilisateur sélectionné</div>
    <div v-else class="sheet-content">
      <p>
        <span :class="{ 'g-dim': !user.hasName }">{{
          user.hasName ? user.longDisplayName : 'Nom inconnu'
        }}</span>
        ({{ user.id }})
      </p>
      <p>Promotion: {{ user.year }}</p>
      <p>
        Adresse mail:
        <a :href="'mailto:' + user.email">{{ user.email }}</a>
      </p>
      <p>Rôle: {{ role?.name }}</p>
      <p v-if="user.isMember">
        Adhérent pour l'année <span class="g-nowrap">{{ currentSchoolYear }}</span>
      </p>
      <p v-else>Non adhérent</p>
    </div>
  </Card>
</template>

<style scoped lang="scss">
.sheet-content {
  width: 30vw;
}
</style>
