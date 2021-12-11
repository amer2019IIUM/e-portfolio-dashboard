import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Portfolios from '../views/Portfolios.vue'
import Users from '../views/Users.vue'
import CreatePortfolio from '../views/pages/CreatePortfolio.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/portfolios',
    name: 'portfolios',
    component: Portfolios
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: Users
  },
  {
    path: '/create-portfolio',
    name: 'create-portfolio',
    component: CreatePortfolio
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
