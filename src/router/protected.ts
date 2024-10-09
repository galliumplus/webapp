import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    // redirection / page par défaut
    path: '',
    redirect: { name: 'dashboard' }
  },
  {
    path: 'dashboard',
    name: 'dashboard',
    component: () => import('@/pages/protected/Dashboard.vue'),
    meta: {
      title: 'Accueil'
    }
  },
  {
    path: 'checkout',
    name: 'checkout',
    component: () => import('@/pages/protected/Checkout.vue'),
    meta: {
      title: 'Caisse'
    }
  },
  {
    path: 'users',
    name: 'users',
    component: () => import('@/pages/protected/Users.vue'),
    meta: {
      title: 'Utilisateurs'
    }
  },
  {
    path: 'admin',
    name: 'admin',
    component: () => import('@/pages/protected/Administration.vue'),
    meta: {
      title: 'Administration'
    }
  },
  {
    path: 'dev',
    name: 'dev',
    component: () => import('@/pages/protected/Developers.vue'),
    meta: {
      title: 'Espace développeurs'
    }
  }
]

export default routes
