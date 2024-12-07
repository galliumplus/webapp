<script setup lang="ts">
import { ref } from 'vue'
import FormInput from '../basic/FormInput.vue'

interface Props {
  currentPasswordNeeded: boolean
  disabled?: boolean
}

withDefaults(defineProps<Props>(), { disabled: false })

const emit = defineEmits<{
  submit: [{ newPassword: string; currentPassword: string }]
}>()

const currentPassword = ref('')
const newPassword = ref('')
const newPasswordAgain = ref('')

function submit() {
  if (newPassword.value !== newPasswordAgain.value) {
    alert('Les mots de passe ne correspondent pas')
    return
  }
  emit('submit', { newPassword: newPassword.value, currentPassword: currentPassword.value })
}
</script>

<template>
  <form @submit.prevent="submit" class="g-column">
    <FormInput
      v-if="currentPasswordNeeded"
      label="Votre mot de passe actuel"
      name="current-password"
      v-model="currentPassword"
      type="password"
      autocomplete="current-password"
      :disabled="disabled"
    />

    <FormInput
      label="Nouveau mot de passe"
      name="new-password"
      v-model="newPassword"
      type="password"
      autocomplete="new-password"
      :disabled="disabled"
    />
    <FormInput
      label="Répétez le mot de passe"
      name="new-password"
      v-model="newPasswordAgain"
      type="password"
      autocomplete="new-password"
      :disabled="disabled"
    />

    <input class="g-raised g-primary" :disabled="disabled" type="submit" value="Continuer" />
  </form>
</template>
