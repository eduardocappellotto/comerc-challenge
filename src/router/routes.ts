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
    component: () => import(/* webpackChunkName: "user-list" */ '../views/User/UserList.vue'),
    meta: {
      layout: 'DefaultLayout'
    }
  },
  {
    path: '/users/manage/:id?',
    name: 'UserEdit',
    component: () => import(/* webpackChunkName: "user-edit" */ '../views/User/UserManagement.vue'),
    meta: {
      layout: 'DefaultLayout'
    }
  },
  {
    path: '/clients',
    name: 'ClientList',
    component: () => import(/* webpackChunkName: "client-list" */ '../views/Client/ClientList.vue'),
    meta: {
      layout: 'DefaultLayout'
    }
  },
  {
    path: '/clients/manage/:id?',
    name: 'ClientEdit',
    component: () =>
      import(/* webpackChunkName: "client-edit" */ '../views/Client/ClientManagement.vue'),
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
    component: () => import(/* webpackChunkName: "rental-list" */ '../views/Rental/RentalList.vue'),
    meta: {
      layout: 'DefaultLayout'
    }
  },
  {
    path: '/rentals/manage/:id?',
    name: 'NewRental',
    component: () =>
      import(/* webpackChunkName: "new-rental" */ '../views/Rental/RentalManagement.vue'),
    meta: {
      layout: 'DefaultLayout'
    }
  }
]

export default routes
