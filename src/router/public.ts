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
    path: 'reset-password',
    name: 'reset-password',
    component: () => import('@/pages/public/ResetPassword.vue'),
    meta: {
      title: 'Réinitialisation du mot de passe'
    }
  },
  {
    path: 'help',
    name: 'login-help',
    component: () => import('@/pages/public/LoginHelp.vue'),
    meta: {
      title: 'Aide à la connexion'
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
