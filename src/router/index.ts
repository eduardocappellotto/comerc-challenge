import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { isLoggedInMiddleware } from './middlewares/isLoggedIn'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  isLoggedInMiddleware(to, from, next)
})

export default router
