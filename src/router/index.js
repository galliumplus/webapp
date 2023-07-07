import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
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
    }
  ]
})

router.beforeEach((to, from, next) => {
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
        document.title = "Sans titre – Gallium+";
      }else{
              document.title = to.meta.title + " – Gallium+";
      }
    });
});

export default router
