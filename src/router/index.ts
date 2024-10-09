import { nextTick } from 'vue'
import { createRouter, createWebHistory, type RouteLocationRaw } from 'vue-router'
import protectedRoutes from './protected'
import publicRoutes from './public'
import { useStore } from '@/composables'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    requiresAuth?: boolean
    visitorsOnly?: boolean
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // pages publiques
    {
      path: '/login',
      component: () => import('@/pages/Public.vue'),
      meta: {
        title: 'Page publique'
      },
      children: publicRoutes
    },
    // redirections
    {
      // ancienne url
      path: '/password/reset',
      redirect: { name: 'reset-password' }
    },
    // pages protégées
    {
      path: '',
      component: () => import('@/pages/Protected.vue'),
      meta: {
        title: 'Dashboard',
        requiresAuth: true
      },
      children: protectedRoutes
    },
    // page non trouvée
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/NotFound.vue'),
      meta: {
        title: 'Page introuvable'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useStore()

  if (from.name != null) store.route.previousName = from.name
  store.route.previousPath = from.fullPath

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.session.isLoggedIn) {
      let loginLocation: RouteLocationRaw = { name: 'login' }
      if (to.name != null && typeof to.name !== 'symbol') {
        loginLocation.query = { to: to.name }
      }
      next(loginLocation)
      return
    }
  } else if (to.matched.some((record) => record.meta.visitorsOnly)) {
    if (store.session.isLoggedIn && to.query.service === undefined) {
      next({ name: 'dashboard' })
      return
    }
  }

  next()
})

router.afterEach((to) => {
  nextTick(() => {
    document.title = to.meta.title + ' – Gallium+'
  })
})

export default router
