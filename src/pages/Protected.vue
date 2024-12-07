<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import Tab from '@/components/basic/VerticalTab.vue'
import HeaderLogo from '@/components/misc/SideBarLogo.vue'
import { useStore } from '@/composables'
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
  <div class="side-bar">
    <HeaderLogo />

    <nav>
      <Tab link="/dashboard" label="Accueil" icon="home" />
      <!--Tab link="/checkout" label="Caisse" icon="cart" /-->
      <Tab link="/users" label="Utilisateurs" icon="user-group" />
      <Tab link="/admin" label="Administration" icon="zn" />
      <Tab link="/dev" label="Espace développeurs" icon="zn" />
    </nav>

    <div class="footer">
      <Zincon of="user" />
      <span class="g-grow padded">{{ userDisplayName }}</span>
      <button class="g-sinking" @click="logout"><Zincon of="exit" /></button>
    </div>
  </div>

  <main class="bento-box">
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
@import '@/assets/style/colors';
@import '@/assets/style/mixins';

.side-bar {
  @include context-dark;
  @include flexbox(column);
  background-color: var(--surface);
}

nav {
  align-self: end;
  margin-left: 48px;
  min-width: 76%;
  flex-grow: 1;
}

main.bento-box {
  flex-grow: 1;
  overflow-y: scroll;
  padding: 0.5rem 1rem;
}

.footer {
  margin-bottom: 0.5rem;
  align-self: stretch;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: var(--on-surface);
}

.padded {
  padding: 0 8px;
}
</style>
