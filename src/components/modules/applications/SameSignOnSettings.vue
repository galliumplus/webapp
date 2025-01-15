<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import Checkbox from '@/components/basic/Checkbox.vue'
import TextInput from '@/components/basic/TextInput.vue'
import Tooltip from '@/components/basic/Tooltip.vue'
import Zincon from '@/components/basic/Zincon.vue'
import { Client } from '@/business/clients'
import { exampleJWT } from '@/helpers'

interface Props {
  client: Client
}

const props = defineProps<Props>()

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
const loginUrlCopied = ref(false)
const loginUrlCopyFailed = ref(false)
const copyLoginUrlButton = useTemplateRef<HTMLButtonElement>('copy-login-url-button')
let loginUrlCopiedTimeout: number | undefined

async function copyLoginUrl() {
  try {
    await navigator.clipboard.writeText(loginUrl.value)
    loginUrlCopied.value = true
  } catch (error) {
    console.error(error)
    loginUrlCopyFailed.value = true
  }
  if (loginUrlCopiedTimeout) window.clearTimeout(loginUrlCopiedTimeout)
  loginUrlCopiedTimeout = window.setTimeout(clearLoginUrlCopy, 5000)
}

function clearLoginUrlCopy() {
  loginUrlCopied.value = false
  loginUrlCopyFailed.value = false
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
            :modelValue="loginUrl"
            label="URL de connexion"
            labelSize="wide"
            disabled
          />
          <button
            class="g-raised g-secondary"
            ref="copy-login-url-button"
            @click="copyLoginUrl()"
            @blur="clearLoginUrlCopy()"
          >
            <Zincon :of="loginUrlCopied ? 'check' : 'copy'" />
          </button>
          <Tooltip
            :message="
              loginUrlCopyFailed
                ? 'Le presse-papier n\'est pas accessible'
                : 'Copié dans le presse-papier !'
            "
            :shown="loginUrlCopied || loginUrlCopyFailed"
            :attached-to="copyLoginUrlButton"
            placement="top"
            :color="loginUrlCopyFailed ? 'error' : 'secondary'"
          />
        </div>
        <div class="g-row g-small-gap">
          <TextInput
            class="signature-type"
            name="sso-signature-type"
            :modelValue="client.sameSignOn?.signatureType"
            label="Algorithme et clé secrète"
            labelSize="wide"
            disabled
          />
          <TextInput
            class="g-grow"
            name="sso-signature-secret"
            modelValue="XXXXXXXX-XXXXXXXXXXXX-XXXXXXXX"
            blurred="Masqué par sécurité"
            disabled
          />
          <button class="g-raised g-secondary" @click="copyLoginUrl()">Renouveler</button>
          <Tooltip
            :message="
              loginUrlCopyFailed
                ? 'Le presse-papier n\'est pas accessible'
                : 'Copié dans le presse-papier !'
            "
            :shown="loginUrlCopied || loginUrlCopyFailed"
            :attached-to="copyLoginUrlButton"
            placement="top"
            :color="loginUrlCopyFailed ? 'error' : 'secondary'"
          />
        </div>
        <div>
          <TextInput
            name="sso-redirect-url"
            v-model="client.sameSignOn.redirectUrl"
            label="URL de redirection"
            labelSize="wide"
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
        <div class="g-row">
          <Checkbox name="sso-scope-identity" label="Nom et prénom" class="g-grow" />
          <Checkbox name="sso-scope-email" label="Adresse électronique" class="g-grow" />
          <Checkbox name="sso-scope-role" label="Rôle et permissions" class="g-grow" />
        </div>
        <div class="g-row">
          <Checkbox name="sso-scope-gallium" label="Accès direct à Gallium" />
        </div>
        <hr />
      </div>
      <div class="g-column">
        <h3 class="g-section-heading">Personnalisation du portail</h3>
        <TextInput
          name="sso-display-name"
          v-model="client.sameSignOn.inputDisplayName"
          label="Nom affiché"
          labelSize="wide"
          :placeholder="client.name"
        />
        <TextInput
          name="sso-logo-url"
          v-model="client.sameSignOn.inputLogoUrl"
          label="URL du logo"
          labelSize="wide"
          placeholder="https://ma-super-appli.fr/logo.png"
        />
        <hr />
      </div>
      <button class="g-raised g-error">Retirer le Same Sign-On</button>
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
