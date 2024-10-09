<script setup lang="ts">
import PopUpHeader from '@/components/popups/PopUpHeader.vue'
import PopUpTab from '@/components/popups/PopUpTab.vue'
import { ref } from 'vue'

const tab = ref('a')
</script>

<template>
  <PopUpHeader>
    <PopUpTab value="overview" v-model="tab" label="Synthèse" />
    <PopUpTab value="access" v-model="tab" label="Accès & permissions" />
    <PopUpTab value="sso" v-model="tab" label="Same Sign-On" />
  </PopUpHeader>
  <main v-if="tab == 'overview'"></main>
  <main v-if="tab == 'access'"></main>
  <main v-if="tab == 'sso'"></main>
</template>

<style scoped lang="scss"></style>
