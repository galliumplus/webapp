import type { RouteRecordRaw } from 'vue-router'

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
    path: 'password/reset',
    name: 'password-reset',
    component: () => import('@/pages/public/PasswordReset.vue'),
    meta: {
      title: 'Réinitialiser votre mot de passe'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/public/About.vue'),
    meta: {
      title: 'À propos'
    }
  }
]

export default routes
