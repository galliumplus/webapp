<script setup lang="ts">
import { onMounted, ref } from 'vue'
import FormInput from '../basic/FormInput.vue'
import LoginCredentials from '@/logic/users/login-credentials'
import GButton from '@/components/basic/StyledButton.vue'

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
      :value="credentials.usernameInputValue"
      type="text"
      autocomplete="username"
      :disabled="disabled"
    />
    <FormInput
      label="mot de passe"
      name="password"
      :value="credentials.passwordInputValue"
      type="password"
      autocomplete="current-password"
      :disabled="disabled"
    />

    <GButton kind="raised-accented" :disabled="disabled" submit>connexion</GButton>
  </form>
</template>
