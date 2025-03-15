<script setup lang="ts">
import { ref } from 'vue'
import CopyToClipboardButton from '@/components/basic/CopyToClipboardButton.vue'
import TextInput from '@/components/basic/TextInput.vue'
import PermissionsGrid from '@/components/forms/PermissionsGrid.vue'
import RenewSecret, { type SecretToRenew } from '@/components/modules/applications/RenewSecret.vue'
import { Client } from '@/business/apps'
import type { GeneratedSecret } from '@/business/apps/secrets'
import { usePopUp } from '@/composables'

interface Props {
  client: Client
}

const props = defineProps<Props>()
const newSecret = ref<GeneratedSecret | null>(null)

function toggleAccessMode() {
  props.client.hasAppAccess = !props.client.hasAppAccess
}

async function renewAppAccessSecret() {
  const data: SecretToRenew = { type: 'app-access-secret', clientId: props.client.id }
  const popup = usePopUp(RenewSecret, {
    title: 'Nouveau code secret',
    size: 'small',
    data
  }).openModal()
  try {
    newSecret.value = await popup.getResult()
  } catch {
    /* ne rien faire si la modale a été fermée de force */
  }
}
</script>

<template>
  <main v-if="client.hasDirectAccess">
    <div class="g-column">
      <h3 class="g-section-heading">Accès à Gallium</h3>
      <div class="g-text-secondary">
        <span v-if="client.hasSameSignOn">
          Connexion directe par Same Sign-On — Les utilisateurs se connectent directement à Gallium,
          mais l'application délègue la connexion au portail de connexion.
        </span>
        <span v-else>
          Connexion directe — Les utilisateurs se connectent directement à Gallium.
        </span>
      </div>
      <div class="g-row g-small-gap">
        <TextInput
          class="g-grow"
          name="sso-login-url"
          :modelValue="client.apiKey"
          label="Clé d'API"
          disabled
        />
        <CopyToClipboardButton :textToCopy="client.apiKey" />
      </div>
      <hr />
    </div>
    <div class="g-column">
      <h3 class="g-section-heading">Permissions</h3>
      <PermissionsGrid
        allow-neutral
        v-model:allowed="client.allowed"
        v-model:granted="client.granted"
      />
      <hr />
    </div>
    <div>
      <button class="g-raised g-secondary" @click="toggleAccessMode()">
        Basculer en mode applicatif
      </button>
    </div>
  </main>
  <main v-else-if="client.hasAppAccess">
    <div class="g-column">
      <h3 class="g-section-heading">Accès à Gallium</h3>
      <div class="g-text-secondary">
        <span v-if="client.hasSameSignOn">
          Connexion applicative avec Same Sign-On — Cette application utilise le portail de
          connexion pour authentifier ses utilisateurs et dispose d'un back-end qui interagit avec
          Gallium.
        </span>
        <span v-else>
          Connexion applicative — Cette application est un bot qui interagit avec Gallium.
        </span>
      </div>
      <div class="g-row g-small-gap">
        <TextInput
          class="g-grow"
          name="sso-login-url"
          :modelValue="client.apiKey"
          label="Clé d'API"
          disabled
        />
        <CopyToClipboardButton :textToCopy="client.apiKey" />
      </div>
      <div class="g-row g-small-gap">
        <TextInput
          class="g-grow"
          name="app-access-secret"
          :model-value="newSecret?.secret ?? 'XXXXXXXX-XXXXXXXXXXXX-XXXXXXXX'"
          :blurred="newSecret === null ? 'Masqué par sécurité' : undefined"
          label="Code secret"
          disabled
        />
        <button
          v-if="newSecret === null"
          class="g-raised g-secondary"
          @click="renewAppAccessSecret()"
        >
          Renouveler
        </button>
        <CopyToClipboardButton v-else :textToCopy="newSecret.secret" />
      </div>
      <hr />
    </div>
    <div class="g-column">
      <h3 class="g-section-heading">Permissions</h3>
      <PermissionsGrid v-model:allowed="client.allowed" v-model:granted="client.granted" />
      <hr />
    </div>
    <div>
      <button class="g-raised g-secondary" @click="toggleAccessMode()">
        Basculer en mode utilisateur
      </button>
    </div>
  </main>
  <main v-else>
    <div class="g-column">
      <h3 class="g-section-heading">Accès à Gallium</h3>
      <div class="g-text-secondary">
        Aucun accès — Cette application utilise uniquement le portail de connexion pour authentifier
        ses utilisateurs. Elle&nbsp;n'interagit pas avec Gallium.
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss"></style>
