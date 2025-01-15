<script setup lang="ts">
import { reactive, ref } from 'vue'
import FormInput from '@/components/basic/FormInput.vue'
import HelpTooltip from '@/components/basic/HelpTooltip.vue'
import TextInput from '@/components/basic/TextInput.vue'
import Zincon from '@/components/basic/Zincon.vue'
import PopUpHeader from '@/components/popups/PopUpHeader.vue'
import PopUpTab from '@/components/popups/PopUpTab.vue'
import type { ClientInit } from '@/business/clients/client'
import { useApi } from '@/composables'
import { useThisPopUp } from '@/composables/popups'

const tab = ref('overview')
const popup = useThisPopUp()
const modifiedClient = reactive({ ...popup.getData<ClientInit>() })
const initiallyEnabled = modifiedClient.isEnabled

function disable() {
  modifiedClient.isEnabled = false
}
function enable() {
  modifiedClient.isEnabled = true
}

async function save() {
  await useApi().clients.save(modifiedClient.id)
  popup.dismiss()
}
</script>

<template>
  <PopUpHeader></PopUpHeader>
  <main>
    <button class="g-flat">AAHAHA</button>
  </main>
</template>

<style scoped lang="scss"></style>
