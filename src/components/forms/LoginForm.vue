<script setup lang="ts">
import { onMounted, ref } from 'vue'
import FormInput from '../basic/FormInput.vue'
import StyledButton from '@/components/basic/StyledButton.vue'
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
  <form @submit.prevent="submit">
    <FormInput
      label="identifiant"
      name="username"
      v-model="credentials.username"
      type="text"
      autocomplete="username"
      :disabled="disabled"
    />
    <FormInput
      label="mot de passe"
      name="password"
      v-model="credentials.password"
      type="password"
      autocomplete="current-password"
      :disabled="disabled"
    />

    <StyledButton kind="raised-accented" :disabled="disabled" submit>connexion</StyledButton>
  </form>
</template>
