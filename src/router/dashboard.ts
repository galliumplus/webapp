import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'dashboard',
    component: () => import('@/pages/dashboard/Home.vue'),
    meta: {
      title: 'Mon acompte'
    }
  },
  {
    path: 'my-account',
    component: () => import('@/pages/dashboard/MyAccount.vue'),
    meta: {
      title: 'Mon compte'
    }
  },
  {
    path: 'details',
    component: () => import('@/pages/dashboard/Details.vue')
  }
]

export default routes
