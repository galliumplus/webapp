<script setup lang="ts">
import HeaderLogo from '@/components/HeaderLogo.vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/composables'

const router = useRouter()
const store = useStore()

function logout() {
  store.clearSession()
  router.push({ name: 'login' })
}
</script>

<template>
  <HeaderLogo />
  <h1>PABLO</h1>
  <button @click="logout">logout</button>
</template>

<style type="text/scss"></style>
