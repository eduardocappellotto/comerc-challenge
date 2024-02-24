import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login/LoginPage.vue'),
    meta: {
      layout: 'AuthLayout'
    }
  },
  {
    path: '/users',
    name: 'UserList',
    component: () => import(/* webpackChunkName: "user-list" */ '../views/UserList.vue'),
    meta: {
      layout: 'DefaultLayout'
    }
  },
  {
    path: '/users/:id/edit',
    name: 'UserEdit',
    component: () => import(/* webpackChunkName: "user-edit" */ '../views/UserManagement.vue'),
    meta: {
      layout: 'DefaultLayout'
    }
  },
  {
    path: '/clients',
    name: 'ClientList',
    component: () => import(/* webpackChunkName: "client-list" */ '../views/ClientList.vue'),
    meta: {
      layout: 'DefaultLayout'
    }
  },
  {
    path: '/clients/:id/edit',
    name: 'ClientEdit',
    component: () => import(/* webpackChunkName: "client-edit" */ '../views/ClientManagement.vue'),
    meta: {
      layout: 'DefaultLayout'
    }
  },
  {
    path: '/movies',
    name: 'MovieList',
    component: () => import(/* webpackChunkName: "movie-list" */ '../views/Movie/MovieList.vue'),
    meta: {
      layout: 'DefaultLayout'
    }
  },
  {
    path: '/rentals',
    name: 'RentalList',
    component: () => import(/* webpackChunkName: "rental-list" */ '../views/RentalList.vue'),
    meta: {
      layout: 'DefaultLayout'
    }
  },
  {
    path: '/rentals/new',
    name: 'NewRental',
    component: () => import(/* webpackChunkName: "new-rental" */ '../views/RentalManagement.vue'),
    meta: {
      layout: 'DefaultLayout'
    }
  }
]

export default routes
