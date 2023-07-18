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
    path: 'details',
    component: () => import('@/pages/dashboard/Details.vue')
  }
]

export default routes
