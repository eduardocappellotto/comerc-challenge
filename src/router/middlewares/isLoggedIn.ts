import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

function isLoggedIn(): boolean {
  // Check if user is logged in by checking if there's a token in localStorage
  const token = localStorage.getItem('token')

  return false
}

export function isLoggedInMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  if (to.name !== 'Login' && !isLoggedIn()) {
    // If user is not logged in and trying to access a route other than login, redirect to login
    next('/login')
  }
  if (to.name === 'Login' && isLoggedIn()) {
    // If user is logged in and trying to access login page, redirect to rentals
    next('/rentals')
  }
  // Continue to the requested route
  next()
}
