<script setup lang="ts">
import Card from '@/components/cards/Card.vue'
import { User } from '@/business/users'
import { ref, watch } from 'vue'
import StyledButton from '@/components/basic/StyledButton.vue'
import { useCurrentSchoolYear } from '@/composables'

interface Props {
  user: User | undefined
}

const props = defineProps<Props>()
const emailShown = ref(false)
const currentSchoolYear = useCurrentSchoolYear()

watch(
  () => props.user,
  () => {
    emailShown.value = false
  }
)
</script>

<template>
  <Card>
    <h2>fiche utilisateur</h2>
    <hr />
    <div v-if="user === undefined" class="g-em sheet-content">Aucun utilisateur sélectionné</div>
    <div v-else class="sheet-content">
      <p>
        <span :class="{ 'g-em': !user.hasName }">{{
          user.hasName ? user.longDisplayName : 'Nom inconnu'
        }}</span>
        ({{ user.id }})
      </p>
      <p>Promotion: {{ user.year }}</p>
      <p>
        Adresse mail:
        <a v-if="emailShown" :href="'mailto:' + user.email">{{ user.email }}</a>
        <StyledButton v-else @click="emailShown = true" kind="link">
          cliquez pour afficher
        </StyledButton>
      </p>
      <p>Rôle: {{ user.role }}</p>
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
