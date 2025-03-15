<script setup lang="ts">
import PopUpHeader from '@/components/popups/PopUpHeader.vue'
import { useThisPopUp } from '@/composables'
import { Choice } from '@/helpers'
import type { MessageBoxOptions } from '@/services/popups/messageBox.ts'

const choices: Record<Choice, { style: string; name: string }> = {
  [Choice.DontSave]: { style: 'g-raised g-error', name: 'DontSave' },
  [Choice.No]: { style: 'g-raised g-secondary', name: 'No' },
  [Choice.Cancel]: { style: 'g-flat g-primary', name: 'Annuler' },
  [Choice.Ok]: { style: 'g-raised g-primary', name: 'Ok' },
  [Choice.Proceed]: { style: 'g-raised g-primary', name: 'Continuer' },
  [Choice.Save]: { style: 'g-raised g-primary', name: 'Save' },
  [Choice.Yes]: { style: 'g-raised g-primary', name: 'Yes' }
}

const popUp = useThisPopUp()
const options = popUp.getData<MessageBoxOptions>()
</script>

<template>
  <PopUpHeader :show-close-button="false" />
  <main>
    <div class="message">{{ options.message }}</div>
  </main>
  <footer class="g-row g-small-gap g-right">
    <button
      v-for="choice in options.choices"
      :class="choices[choice].style"
      @click="popUp.close(choice)"
    >
      {{ choices[choice].name }}
    </button>
  </footer>
</template>

<style scoped lang="scss">
@use '@/assets/style/utils';

main {
  @include utils.flexbox(column, flex-start, center);
}
</style>
