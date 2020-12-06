import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
import account from '@/router/partials/account.js'
import master from '@/router/partials/master.js'
import systems from '@/router/partials/systems.js'

const Dashboard = () => import('@/views/Dashboard')
const Login = () => import('@/views/pages/Login')
const OfficialNew = () => import('@/views/pages/OfficialNew')
const OfficiaReplace = () => import('@/views/pages/OfficiaReplace')
const StrukturOrganisasi = () => import('@/views/pages/StrukturOrganisasi')
const SistemEletronik = () => import('@/views/pages/SistemEletronik')

Vue.use(Router)

const createRouter = new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes(),
})

function configRoutes() {
  return [
    {
      path: '',
      redirect: '/login',
      name: 'Auth',
      component: {
        render(c) {
          return c('router-view')
        },
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login,
        },
      ],
    },
    {
      path: '/register',
      name: 'Daftar Pejabat',
      component: OfficialNew,
    },
    {
      path: '/register/replace',
      name: 'Daftar Pergantian Pejabat',
      component: OfficiaReplace,
    },
    {
      path: '/admin',
      name: 'Home',
      redirect: 'admin/dashboard',
      component: TheContainer,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: { requiresAuth: true },
        },
        {
          path: 'organizational-structure',
          name: 'Struktur Organisasi',
          component: StrukturOrganisasi,
          meta: { requiresAuth: true },
        },
        {
          path: 'repository',
          name: 'Sistem Elektronik',
          component: SistemEletronik,
          meta: { requiresAuth: true },
        },
        systems,
        account,
        master,
      ],
    },
  ]
}

createRouter.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user')

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (user === null) {
      next({ path: '/login' })
    } else {
      next()
    }
  } else {
    if (user !== null) {
      next({ path: '/admin/dashboard' })
    } else {
      next()
    }
  }
})

export default createRouter
