<script setup lang="ts">
import { computed, ref } from 'vue'
import Checkbox from '@/components/basic/Checkbox.vue'
import CopyToClipboardButton from '@/components/basic/CopyToClipboardButton.vue'
import TextInput from '@/components/basic/TextInput.vue'
import RenewSecret, { type SecretToRenew } from '@/components/modules/applications/RenewSecret.vue'
import { Client, SameSignOnScope } from '@/business/apps'
import type { GeneratedSecret } from '@/business/apps/secrets'
import { usePopUp } from '@/composables'
import { exampleJWT, Choice } from '@/helpers'

interface Props {
  client: Client
}

const props = defineProps<Props>()
const newSecret = ref<GeneratedSecret | null>(null)

const redirectUrlExample = computed(() => {
  if (props.client.sameSignOn === null) return null
  try {
    const url = new URL(props.client.sameSignOn.redirectUrl)
    url.searchParams.append('token', exampleJWT)
    return url.href
  } catch {
    return null
  }
})

const host = window.location.host
const loginUrl = computed(() => 'https://' + host + '/login?app=' + props.client.apiKey)

const Scope = SameSignOnScope

function hasScope(scope: SameSignOnScope): boolean {
  return props.client.sameSignOn !== null && scope.in(props.client.sameSignOn.scope)
}

function updateScope(scope: SameSignOnScope, value: boolean | undefined): void {
  if (props.client.sameSignOn !== null) {
    if (value) {
      props.client.sameSignOn.scope = scope.addTo(props.client.sameSignOn.scope)
    } else {
      props.client.sameSignOn.scope = scope.removeFrom(props.client.sameSignOn.scope)
    }
  }
}

async function renewSsoSecret() {
  if (props.client.sameSignOn !== null) {
    const data: SecretToRenew = {
      type: 'sso-secret',
      clientId: props.client.id,
      signatureType: props.client.sameSignOn.signatureType
    }
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
}
</script>

<template>
  <main>
    <div v-if="client.sameSignOn === null" class="centered-content">
      <p>Le Same Sign-On n'est pas activé pour cette application.</p>
      <button class="g-raised g-secondary" @click="client.addSameSignOn()">Activer</button>
    </div>
    <template v-else>
      <div class="g-column">
        <h3 class="g-section-heading">Authentification</h3>
        <div class="g-row g-small-gap">
          <TextInput
            class="g-grow"
            name="sso-login-url"
            :model-value="loginUrl"
            label="URL de connexion"
            label-size="wide"
            disabled
          />
          <CopyToClipboardButton :textToCopy="loginUrl" />
        </div>
        <div class="g-row g-small-gap">
          <TextInput
            class="signature-type"
            name="sso-signature-type"
            :model-value="newSecret?.signatureType ?? client.sameSignOn?.signatureType"
            label="Algorithme et clé secrète"
            label-size="wide"
            disabled
          />
          <TextInput
            class="g-grow"
            name="sso-signature-secret"
            :model-value="newSecret?.secret ?? 'XXXXXXXX-XXXXXXXXXXXX-XXXXXXXX'"
            :blurred="newSecret === null ? 'Masqué par sécurité' : undefined"
            disabled
          />
          <button v-if="newSecret === null" class="g-raised g-secondary" @click="renewSsoSecret()">
            Renouveler
          </button>
          <CopyToClipboardButton v-else :textToCopy="newSecret.secret" />
        </div>
        <div>
          <TextInput
            name="sso-redirect-url"
            v-model="client.sameSignOn.redirectUrl"
            label="URL de redirection"
            label-size="wide"
            placeholder="https://ma-super-appli.fr/login"
          />
          <p v-if="redirectUrlExample !== null" class="supporting-text g-text-secondary">
            Exemple d'URL généré :
            <a :href="redirectUrlExample" target="_blank">{{ redirectUrlExample }}</a>
          </p>
          <p v-else class="supporting-text g-text-error">
            Saisissez un URL valide pour avoir un aperçu
          </p>
        </div>
        <hr />
      </div>
      <div class="g-column">
        <h3 class="g-section-heading">Portée de la connexion</h3>
        <div class="g-row g-even-size">
          <Checkbox
            name="sso-scope-identity"
            label="Nom et prénom"
            :model-value="hasScope(Scope.Identity) || hasScope(Scope.Gallium)"
            :disabled="hasScope(Scope.Gallium)"
            @update:model-value="updateScope(Scope.Identity, $event)"
          />
          <Checkbox
            name="sso-scope-email"
            label="Adresse électronique"
            :model-value="hasScope(Scope.Email) || hasScope(Scope.Gallium)"
            :disabled="hasScope(Scope.Gallium)"
            @update:model-value="updateScope(Scope.Email, $event)"
          />
          <Checkbox
            name="sso-scope-role"
            label="Rôle et permissions"
            :model-value="hasScope(Scope.Role) || hasScope(Scope.Gallium)"
            :disabled="hasScope(Scope.Gallium)"
            @update:model-value="updateScope(Scope.Role, $event)"
          />
        </div>
        <div class="g-row">
          <Checkbox
            name="sso-scope-gallium"
            label="Accès direct à Gallium"
            :model-value="hasScope(Scope.Gallium)"
            @update:model-value="updateScope(Scope.Gallium, $event)"
          />
        </div>
        <hr />
      </div>
      <div class="g-column">
        <h3 class="g-section-heading">Personnalisation du portail</h3>
        <TextInput
          name="sso-display-name"
          v-model="client.sameSignOn.inputDisplayName"
          label="Nom affiché"
          label-size="wide"
          :placeholder="client.name"
        />
        <TextInput
          name="sso-logo-url"
          v-model="client.sameSignOn.inputLogoUrl"
          label="URL du logo"
          label-size="wide"
          placeholder="https://ma-super-appli.fr/logo.png"
        />
        <hr />
      </div>
      <button class="g-raised g-error" @click="client.removeSameSignOn()">
        Retirer le Same Sign-On
      </button>
    </template>
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/style/utils';

.supporting-text {
  margin: 0.25rem 0 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.signature-type {
  width: 17rem;
}

.centered-content {
  @include utils.flexbox(column, center, center);
  height: 100%;
}
</style>
