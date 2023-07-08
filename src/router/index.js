import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'dashboard' }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        requiresAuth: false,
        title: 'Connexion'
      }
    },
    {
      path: '/login/reset-password',
      name: 'reset-password',
      component: () => import('../views/ResetPasswordView.vue'),
      meta: {
        requiresAuth: false,
        title: 'Réinitialisation du mot de passe'
      }
    },
    {
      path: '/login/help',
      name: 'login-help',
      component: () => import('../views/LoginHelpView.vue'),
      meta: {
        requiresAuth: false,
        title: 'Aide à la connexion'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: {
        requiresAuth: false,
        title: 'Page introuvable'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.previous = from.name;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.loggedIn) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  nextTick(() => {
    if (to.meta.title === undefined) {
      document.title = 'Sans titre – Gallium+'
    } else {
      document.title = to.meta.title + ' – Gallium+'
    }
  })
})

export default router
