<script setup lang="ts">
import { reactive, ref } from 'vue'
import CopyToClipboardButton from '@/components/basic/CopyToClipboardButton.vue'
import LoadingBar from '@/components/basic/LoadingBar.vue'
import RadioButton from '@/components/basic/RadioButton.vue'
import TextInput from '@/components/basic/TextInput.vue'
import Zincon from '@/components/basic/Zincon.vue'
import PopUpHeader from '@/components/popups/PopUpHeader.vue'
import type { GeneratedSecret } from '@/business/apps/secrets.ts'
import { Problem } from '@/business/problem.ts'
import { useApi, useThisPopUp } from '@/composables'
import { Reason, Done, Indeterminate } from '@/helpers'

const popUp = useThisPopUp()
const api = useApi()

export type SecretToRenew =
  | { type: 'app-access-secret'; clientId: number }
  | { type: 'sso-secret'; clientId: number; signatureType: string }

const secretToRenew = reactive(popUp.getData<SecretToRenew>())

const warningAcknowledged = ref(false)
const progress = ref(Indeterminate)

const newSecret = ref<GeneratedSecret | null>(null)
const problem = ref<Problem | null>(null)

async function sendRequest() {
  warningAcknowledged.value = true
  try {
    if (secretToRenew.type === 'app-access-secret') {
      newSecret.value = await api.clients.generateNewAppAccessSecret(secretToRenew.clientId)
    } else {
      newSecret.value = await api.clients.generateNewSameSignOnSecret(
        secretToRenew.clientId,
        secretToRenew.signatureType
      )
    }
  } catch (err) {
    problem.value = Problem.handle(err)
  } finally {
    progress.value = Done
  }
}
</script>

<template>
  <PopUpHeader :show-close-button="false" />
  <main v-if="!warningAcknowledged" class="g-column">
    <div v-if="secretToRenew.type === 'sso-secret'" class="g-column">
      <h3 class="g-section-heading">Type de signature</h3>
      <RadioButton
        group="signature-type"
        value="HS256"
        v-model="secretToRenew.signatureType"
        label="HMAC-SHA-256 (Signature symétrique)"
      ></RadioButton>
    </div>
    <div class="g-box">
      <h3 class="g-section-heading"><Zincon of="warning" /> Attention</h3>
      Si vous renouvelez le code secret, les applications qui l'utilisent vont perdre leur connexion
      à Gallium.
    </div>
  </main>
  <main v-else-if="problem !== null" class="g-column">
    <div>Le code secret n'a pas pu être renouvelé&nbsp;:</div>
    <div class="g-box g-error">{{ problem.message }}</div>
  </main>
  <main v-else-if="newSecret !== null" class="g-column">
    <div>
      Assurez-vous de bien copier ce code, il ne sera plus visible après avoir fermé les détails de
      l'application.
    </div>
    <div class="g-row g-small-gap">
      <TextInput
        class="g-grow"
        name="new-app-access-secret"
        :model-value="newSecret.secret"
        :disabled="true"
      />
      <CopyToClipboardButton :text-to-copy="newSecret.secret" />
    </div>
  </main>
  <main v-else class="g-column">
    <div>Génération du nouveau code secret...</div>
    <LoadingBar :progress="progress" />
  </main>
  <footer class="g-row g-small-gap g-right">
    <button
      v-if="!warningAcknowledged"
      class="g-flat g-primary"
      @click="popUp.dismiss(Reason.Cancelled)"
    >
      Annuler
    </button>
    <button v-if="!warningAcknowledged" class="g-raised g-primary" @click="sendRequest()">
      Continuer
    </button>
    <button
      v-if="warningAcknowledged"
      :disabled="progress !== Done"
      class="g-raised g-primary"
      @click="popUp.close(newSecret)"
    >
      Terminé
    </button>
  </footer>
</template>

<style scoped lang="scss">
main {
  justify-content: center;
}
</style>
