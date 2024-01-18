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
  }
]

export default routes
