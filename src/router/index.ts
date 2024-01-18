import { nextTick } from 'vue'
import {
  createRouter,
  createWebHistory,
  type RouteLocationRaw,
  type RouteRecordRaw
} from 'vue-router'
import { SessionStorage } from '@/store'
import protectedRoutes from './protected'
import publicRoutes from './public'
import dashboardRoutes from '@/router/protected'

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
      redirect: { name: 'password-reset' }
    },
    // pages protégées
    {
      path: '',
      component: () => import('@/pages/Protected.vue'),
      meta: {
        title: 'Dashboard',
        requiresAuth: true
      },
      children: dashboardRoutes
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
  let store = new SessionStorage()

  if (from.name != null) store.previousRouteName = from.name
  store.previousRouteUrl = from.fullPath

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.loggedIn) {
      let loginLocation: RouteLocationRaw = { name: 'login' }
      if (to.name != null && typeof to.name !== 'symbol') {
        loginLocation.query = { to: to.name }
      }
      next(loginLocation)
      return
    }
  } else if (to.matched.some((record) => record.meta.visitorsOnly)) {
    if (store.loggedIn && to.query.service === undefined) {
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
