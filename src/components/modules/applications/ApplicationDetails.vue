<script setup lang="ts">
import AccessSettings from './AccessSettings.vue'
import SameSignOnSettings from './SameSignOnSettings.vue'
import { reactive, ref } from 'vue'
import Checkbox from '@/components/basic/Checkbox.vue'
import TextInput from '@/components/basic/TextInput.vue'
import Zincon from '@/components/basic/Zincon.vue'
import PopUpHeader from '@/components/popups/PopUpHeader.vue'
import PopUpTab from '@/components/popups/PopUpTab.vue'
import { Client, type ClientInit } from '@/business/apps/client'
import { useApi, useThisPopUp } from '@/composables'

export interface InitialConfig {
  wasEnabled: boolean
  hadAppAccess: boolean
}

const tab = ref('overview')
const popup = useThisPopUp()
const api = useApi()
const init = popup.getData<ClientInit>()
const client = reactive(new Client(init ?? api.clients.create())) as Client
const initialConfig: InitialConfig = {
  wasEnabled: client.isEnabled,
  hadAppAccess: client.hasAppAccess
}
async function save() {
  await api.clients.save(client)
  popup.close(client)
}
</script>

<template>
  <PopUpHeader>
    <PopUpTab v-model="tab" value="overview" label="Synthèse" />
    <PopUpTab v-model="tab" value="access" label="Accès & permissions" />
    <PopUpTab v-model="tab" value="sso" label="Same Sign-On" />
  </PopUpHeader>
  <main v-if="tab == 'overview'">
    <div class="g-column">
      <div class="g-row">
        <TextInput
          class="g-flex-2-3"
          name="name"
          v-model="client.name"
          label="Nom"
          label-size="narrow"
        />
        <Checkbox
          class="g-flex-1-3"
          name="is-enabled"
          v-model="client.isEnabled"
          label="Application activée"
        />
      </div>
      <hr class="g-flush-bottom" />
    </div>
    <ul class="g-list g-flush">
      <li>
        <button class="g-list-item g-row g-align-center" @click="tab = 'access'">
          <span>Mode d'accès à Gallium</span>
          <span v-if="client.hasDirectAccess" class="g-grow g-right">Utilisateur</span>
          <span v-else-if="client.hasAppAccess" class="g-grow g-right">Applicatif</span>
          <span v-else class="g-grow g-right">Aucun</span>
          <Zincon of="chevron-right" />
        </button>
      </li>
      <li>
        <button class="g-list-item g-row g-align-center" @click="tab = 'access'">
          <span>Same Sign-On</span>
          <span v-if="client.hasSameSignOn" class="g-grow g-right">Activé</span>
          <span v-else class="g-grow g-right">Désactivé</span>
          <Zincon of="chevron-right" />
        </button>
      </li>
    </ul>
  </main>
  <AccessSettings v-if="tab == 'access'" :client="client" />
  <SameSignOnSettings v-if="tab == 'sso'" :client="client" />
  <footer class="g-row g-align-center">
    <div>
      <button class="g-flat g-error" @click="save()">
        <Zincon of="delete" />
        Supprimer l'application
      </button>
    </div>
    <div class="g-right g-grow">
      <button class="g-raised g-primary" @click="save()">Enregistrer</button>
    </div>
  </footer>
</template>
