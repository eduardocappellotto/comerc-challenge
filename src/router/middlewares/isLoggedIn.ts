import useAuth from '@/composables/useAuth'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export function isLoggedInMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  const { isAuthenticated, currentUser } = useAuth()

  if (to.name !== 'Login' && !isAuthenticated.value) {
    // If user is not logged in and trying to access a route other than login, redirect to login
    return next({ name: 'Login' })
  }
  if (to.name === 'Login' && isAuthenticated.value) {
    // If user is logged in and trying to access login page, redirect to rentals
    return next('/rentals')
  }
  // Continue to the requested route
  next()
}
