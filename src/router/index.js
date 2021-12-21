import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Portfolios from '../views/Portfolios.vue'
import Users from '../views/Users.vue'
import CreatePortfolio from '../views/pages/CreatePortfolio.vue'
import AuthenticationPage from '../views/pages/AuthenticationPage.vue'
Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/portfolios',
    name: 'portfolios',
    component: Portfolios,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/create-portfolio',
    name: 'create-portfolio',
    component: CreatePortfolio,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/auth',
    name: 'authentication-page',
    component: AuthenticationPage
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})


////Authentication Route validations
router.beforeEach((to, from, next) => {
  let isAuth = localStorage.getItem("authStatus");
  // eslint-disable-next-line no-console
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isAuth == "true") {
      next();
    }
    else {
      next({ path: '/auth' });
    }
  }
  next();
})
export default router
