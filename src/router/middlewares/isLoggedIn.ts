import { useAuthStore } from '@/stores/auth'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export function isLoggedInMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  const { isAuthenticated, currentUser } = useAuthStore()

  const publicRoutes = ['Login', 'Register']

  if (typeof to.name === 'string' && !publicRoutes.includes(to.name) && !isAuthenticated) {
    // If user is not logged in and trying to access a route other than login, redirect to login

    return next({ name: 'Login' })
  }
  if (to.name === 'Login' && isAuthenticated) {
    // If user is logged in and trying to access login page, redirect to rentals

    return next('/rentals')
  }

  // Continue to the requested route
  next()
}
