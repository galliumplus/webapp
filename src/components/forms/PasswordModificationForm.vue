<script setup lang="ts">
import { ref } from 'vue'
import FormInput from '../basic/FormInput.vue'
import { TextInputValue } from '@/logic/components'

interface Props {
  currentPasswordNeeded: boolean
  disabled?: boolean
}

withDefaults(defineProps<Props>(), { disabled: false })

const emit = defineEmits<{
  submit: [{ newPassword: string; currentPassword: string }]
}>()

const currentPassword = new TextInputValue('')
const newPassword = new TextInputValue('')
const newPasswordAgain = new TextInputValue('')

function submit() {
  if (newPassword.value !== newPasswordAgain.value) {
    alert('Les mots de passe ne correspondent pas')
    return
  }
  emit('submit', { newPassword: newPassword.value, currentPassword: currentPassword.value })
}
</script>

<template>
  <form @submit.prevent="submit">
    <FormInput
      v-if="currentPasswordNeeded"
      label="votre mot de passe actuel"
      name="current-password"
      :value="currentPassword"
      type="password"
      autocomplete="current-password"
      :disabled="disabled"
    />

    <FormInput
      label="nouveau mot de passe"
      name="new-password"
      :value="newPassword"
      type="password"
      autocomplete="new-password"
      :disabled="disabled"
    />
    <FormInput
      label="répétez le mot de passe"
      name="new-password"
      :value="newPasswordAgain"
      type="password"
      autocomplete="new-password"
      :disabled="disabled"
    />

    <input type="submit" value="continuer" :disabled="disabled" />
  </form>
</template>

<style lang="scss">
@import '@/assets/style/colors';
@import '@/assets/style/mixins';

input[type='submit'] {
  margin: 10px 0;

  @include allcaps;
  background: none;
  border: 2px solid $accent;
  color: $accent;

  &:hover,
  &:focus {
    color: $dark;
    background-color: $accent;
    cursor: pointer;
  }
}
</style>
