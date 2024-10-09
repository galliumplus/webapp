<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import TabNav from '@/components/layout/SideBarNav.vue'
import Tab from '@/components/basic/VerticalTab.vue'
import SideBar from '@/components/layout/SideBar.vue'
import HeaderLogo from '@/components/misc/SideBarLogo.vue'
import IconButton from '@/components/basic/IconButton.vue'
import { useStore } from '@/composables'
import SideBarFooter from '@/components/layout/SideBarFooter.vue'
import Zincon from '@/components/basic/Zincon.vue'

const store = useStore()
const router = useRouter()

onBeforeMount(() => {
  document.body.className = 'g-protected'
})

function logout() {
  store.session.clear()
  router.push({ name: 'login' })
}

const userDisplayName = store.session.userShortDisplayName
</script>

<template>
  <SideBar>
    <HeaderLogo />

    <TabNav class="g-grow">
      <Tab link="/dashboard" label="Accueil" icon="home" />
      <!--Tab link="/checkout" label="Caisse" icon="cart" /-->
      <Tab link="/users" label="Utilisateurs" icon="user-group" />
      <Tab link="/admin" label="Administration" icon="zn" />
      <Tab link="/dev" label="Espace développeurs" icon="zn" />
    </TabNav>

    <SideBarFooter class="footer">
      <Zincon of="user"></Zincon>
      <span class="g-grow padded">{{ userDisplayName }}</span>
      <IconButton icon="exit" kind="sinking-dark" @click="logout" />
    </SideBarFooter>
  </SideBar>

  <main class="bento-box">
    <RouterView />
  </main>
</template>

<style lang="scss">
@import '@/assets/style/colors';

main.bento-box {
  flex-grow: 1;
  overflow-y: scroll;
  padding: 0.5rem 1rem;
}

.footer {
  color: $grey-90;
  margin-bottom: 0.5rem;
}

.padded {
  padding: 0 8px;
}
</style>
