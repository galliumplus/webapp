import type { RouteRecordRaw } from 'vue-router'
import dashboardRoutes from '@/router/protected'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'login',
    component: () => import('@/pages/public/Login.vue'),
    meta: {
      title: 'Connexion',
      visitorsOnly: true
    }
  },
  {
    path: 'forgot-password',
    name: 'forgot-password',
    component: () => import('@/pages/public/ForgotPassword.vue'),
    meta: {
      title: 'Mot de passe oublié'
    }
  },
  {
    path: 'reset-password',
    name: 'reset-password',
    component: () => import('@/pages/public/ResetPassword.vue'),
    meta: {
      title: 'Réinitialiser votre mot de passe'
    }
  }
]

export default routes
