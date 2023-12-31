import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'dashboard',
    component: () => import('@/pages/protected/Dashboard.vue'),
    meta: {
      title: 'Accueil'
    }
  }
]

export default routes
