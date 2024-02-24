import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginPage.vue'),
    meta: {
      layout: 'AuthLayout'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterPage.vue'),
    meta: {
      layout: 'AuthLayout'
    }
  },
  {
    path: '/users',
    name: 'UserList',
    component: () => import(/* webpackChunkName: "user-list" */ '../views/UserList.vue'),
    meta: {
      layout: 'Default'
    }
  },
  {
    path: '/users/:id/edit',
    name: 'UserEdit',
    component: () => import(/* webpackChunkName: "user-edit" */ '../views/UserManagement.vue'),
    meta: {
      layout: 'Default'
    }
  },
  {
    path: '/clients',
    name: 'ClientList',
    component: () => import(/* webpackChunkName: "client-list" */ '../views/ClientList.vue'),
    meta: {
      layout: 'Default'
    }
  },
  {
    path: '/clients/:id/edit',
    name: 'ClientEdit',
    component: () => import(/* webpackChunkName: "client-edit" */ '../views/ClientManagement.vue'),
    meta: {
      layout: 'Default'
    }
  },
  {
    path: '/movies',
    name: 'MovieList',
    component: () => import(/* webpackChunkName: "movie-list" */ '../views/MovieList.vue'),
    meta: {
      layout: 'Default'
    }
  },
  {
    path: '/rentals',
    name: 'RentalList',
    component: () => import(/* webpackChunkName: "rental-list" */ '../views/RentalList.vue'),
    meta: {
      layout: 'Default'
    }
  },
  {
    path: '/rentals/new',
    name: 'NewRental',
    component: () => import(/* webpackChunkName: "new-rental" */ '../views/RentalManagement.vue'),
    meta: {
      layout: 'Default'
    }
  }
]

export default routes
