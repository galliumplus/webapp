<script setup lang="ts">
import FormInput from '../basic/FormInput.vue'
import { onMounted } from 'vue'
import { LoginCredentials } from '@/business/access'

interface Props {
  disabled?: boolean
}

withDefaults(defineProps<Props>(), { disabled: false })

const emit = defineEmits<{
  submit: [credentials: LoginCredentials]
}>()

const credentials = new LoginCredentials()

function submit() {
  emit('submit', credentials)
}

onMounted(() => {
  credentials.reset()
})
</script>

<template>
  <form @submit.prevent="submit" class="g-column">
    <FormInput
      label="Identifiant"
      name="username"
      v-model="credentials.username"
      type="text"
      autocomplete="username"
      :disabled="disabled"
    />
    <FormInput
      label="Mot de passe"
      name="password"
      v-model="credentials.password"
      type="password"
      autocomplete="current-password"
      :disabled="disabled"
    />

    <input type="submit" :disabled="disabled" value="Connexion" class="g-raised g-primary" />
  </form>
</template>
