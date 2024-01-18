<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import TabNav from '@/components/layout/TabNav.vue'
import Tab from '@/components/basic/VerticalTab.vue'
import SideBar from '@/components/layout/SideBar.vue'
import HeaderLogo from '@/components/misc/SideBarLogo.vue'
import IconButton from '@/components/basic/IconButton.vue'
import { useStore } from '@/composables'
import SideBarFooter from '@/components/layout/SideBarFooter.vue'

const store = useStore()
const router = useRouter()

onBeforeMount(() => {
  document.body.className = 'protected'
})

function logout() {
  store.clearSession()
  router.push({ name: 'login' })
}
</script>

<template>
  <SideBar>
    <HeaderLogo />

    <TabNav class="grow">
      <Tab link="/dashboard" label="Accueil" icon="home" />
      <Tab link="/checkout" label="Caisse" icon="cart" />
    </TabNav>

    <SideBarFooter>
      <IconButton icon="exit" kind="sinking-dark" @click="logout" />
    </SideBarFooter>
  </SideBar>

  <main class="bento-box">
    <RouterView />
  </main>
</template>

<style lang="scss">
main.bento-box {
  flex-grow: 1;
  overflow-y: scroll;
}
</style>
