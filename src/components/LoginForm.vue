<script setup lang="ts">
import { ref } from "vue"
import FormInput from './FormInput.vue'

interface Props {
  disabled?: boolean
}

withDefaults(defineProps<Props>(), { disabled: false })

const emit = defineEmits(['submit'])

const username = ref('')
const password = ref('')

function submit() {
  emit('submit', username.value, password.value)
}
</script>

<template>
  <form @submit.prevent="submit">
    <FormInput
      label="identifiant"
      name="username"
      v-model="username"
      type="text"
      autocomplete="username"
      :disabled="disabled"
    />
    <FormInput
      label="mot de passe"
      name="password"
      v-model="password"
      type="password"
      autocomplete="current-password"
      :disabled="disabled"
    />

    <input type="submit" value="connexion" :disabled="disabled" />
  </form>
</template>

<style lang="scss">
@import "~assets/style/constants.scss";
@import "~assets/style/mixins.scss";

input[type="submit"] {
  margin: 10px 0;

  @include allcaps;
  background: none;
  border: 2px solid $orange;
  color: $orange;

  &:hover,
  &:focus {
    color: $dark;
    background-color: $orange;
    cursor: pointer;
  }
}
</style>