import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store.js'
import * as Keycloak from 'keycloak-js'
import $axiosApi from '@/utils/api'
import firebase from 'firebase/app'
import 'firebase/messaging'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
import account from '@/router/partials/account.js'
import master from '@/router/partials/master.js'
import systems from '@/router/partials/systems.js'

const Dashboard = () => import('@/views/Dashboard')
const Login = () => import('@/views/pages/Login')
const Forbidden = () => import('@/views/pages/Forbidden')
const OfficialNew = () => import('@/views/pages/OfficialNew')
const OfficiaReplace = () => import('@/views/pages/OfficiaReplace')
const StrukturOrganisasi = () => import('@/views/pages/StrukturOrganisasi')
const SistemEletronik = () => import('@/views/pages/SistemEletronik')
const Submission = () => import('@/views/submission/Submission')
const Report = () => import('@/views/report/Report')
const Userlog = () => import('@/views/users/Userlog')
const AddReport = () => import('@/views/report/AddReport')
const EditReport = () => import('@/views/report/EditReport')
const Statistic = () => import('@/views/statistic/Statistic')
const CertificatePage = () => import('@/views/pages/CertificatePage')

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
          meta: { requiresAuth: false },
        },
      ],
    },
    {
      path: '/sealid/:id',
      name: 'sealid',
      component: CertificatePage,
      meta: { requiresAuth: false },
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: Forbidden,
      meta: { requiresAuth: true },
    },
    {
      path: '/register',
      name: 'Daftar Pejabat',
      component: OfficialNew,
      meta: { requiresAuth: false },
    },
    {
      path: '/register/replace',
      name: 'Daftar Pergantian Pejabat',
      component: OfficiaReplace,
      meta: { requiresAuth: false },
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
          beforeEnter: (to, from, next) => {
            if (
              store.state.auth.data.permissions.includes(
                'Daftar Struktur Organisasi'
              )
            ) {
              next()
            } else {
              next({
                path: '/fobidden',
              })
            }
          },
        },
        {
          path: 'repository',
          name: 'Sistem Elektronik',
          component: SistemEletronik,
          meta: { requiresAuth: true },
          beforeEnter: (to, from, next) => {
            if (
              store.state.auth.data.permissions.includes(
                'Daftar Sistem Elektronik'
              )
            ) {
              next()
            } else {
              next({
                path: '/fobidden',
              })
            }
          },
        },
        {
          path: 'requestupdate',
          name: 'Pengajuan Perubahan Data',
          component: Submission,
          meta: { requiresAuth: true },
          beforeEnter: (to, from, next) => {
            if (
              store.state.auth.data.permissions.includes(
                'Daftar Pengajuan Perubahan Data'
              )
            ) {
              next()
            } else {
              next({
                path: '/fobidden',
              })
            }
          },
        },
        {
          path: 'statistic',
          name: 'Statistik',
          component: Statistic,
          meta: { requiresAuth: true },
          beforeEnter: (to, from, next) => {
            if (
              store.state.auth.data.permissions.includes('Daftar Statistik')
            ) {
              next()
            } else {
              next({
                path: '/fobidden',
              })
            }
          },
        },
        {
          path: 'report',
          name: 'Pelaporan',
          component: Report,
          meta: { requiresAuth: true },
          beforeEnter: (to, from, next) => {
            if (store.state.auth.data.permissions.includes('Daftar Laporan')) {
              next()
            } else {
              next({
                path: '/fobidden',
              })
            }
          },
        },
        {
          path: 'report/add',
          name: 'Tambah Laporan',
          component: AddReport,
          meta: { requiresAuth: true },
          beforeEnter: (to, from, next) => {
            if (store.state.auth.data.permissions.includes('Tambah Laporan')) {
              next()
            } else {
              next({
                path: '/fobidden',
              })
            }
          },
        },
        {
          path: 'report/:id/edit',
          name: 'Edit Laporan',
          component: EditReport,
          meta: { requiresAuth: true },
          beforeEnter: (to, from, next) => {
            if (store.state.auth.data.permissions.includes('Edit Laporan')) {
              next()
            } else {
              next({
                path: '/fobidden',
              })
            }
          },
        },
        {
          path: 'userlog',
          name: 'History User',
          component: Userlog,
          meta: { requiresAuth: true },
          // beforeEnter: (to, from, next) => {
          //   if (store.state.auth.data.permissions.includes('Daftar Laporan')) {
          //     next()
          //   } else {
          //     next({
          //       path: '/fobidden',
          //     })
          //   }
          // },
        },
        systems,
        account,
        master,
      ],
    },
  ]
}

createRouter.beforeEach((to, from, next) => {
  const initOptions = {
    url: process.env.VUE_APP_KEYCLOAK_URL,
    realm: process.env.VUE_APP_KEYCLOAK_REALM,
    clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID,
    onLoad: 'login-required',
  }
  const keycloak = Keycloak(initOptions)
  if (to.meta.requiresAuth) {
    if (!store.state.auth.isLogin) {
      keycloak
        .init({
          onLoad: initOptions.onLoad,
          checkLoginIframe: true,
          pkceMethod: 'S256',
          // redirectUri: 'http://localhost:8082/check-sso',
        })
        .then((authenticated) => {
          if (!authenticated) {
            window.location.reload()
          }
          localStorage.setItem('token', keycloak.token)
          localStorage.setItem('refresh_token', keycloak.refreshToken)
          store.dispatch('auth/fetchAuth').then((response) => {
            store.dispatch('dispatchLogin', response.data.data).then(() => {
              try {
                if (firebase.messaging.isSupported()) {
                  const messaging = firebase.messaging()
                  Notification.requestPermission().then(() => {
                    messaging
                      .getToken({
                        vapidKey:
                          'BK7ZJNZrpvWFm-rCo-7K6pHNvnNAlHEpF37loL3fvpSkO9782mh18OMM089ssfIH7VQw6dN3Gje8QT8McptZ5zQ',
                      })
                      .then((currentToken) => {
                        $axiosApi
                          .post('/users/notification-token', {
                            token: currentToken,
                            type: 'web',
                          })
                          .then(() => {
                            next()
                          })
                          .catch(() => {
                            localStorage.removeItem('token')
                            localStorage.removeItem('refresh_token')
                            localStorage.removeItem('user')
                            store.dispatch('dispatchDisableLoading')
                          })
                      })
                      .catch(() => {
                        next()
                      })
                  })
                }
              } catch (error) {
                alert(error)
              }
            })
          })
        })
        .catch(() => {
          alert('Server Bermasalah')
        })
    } else {
      next()
    }
  } else {
    if (to.path === '/register') {
      const token = localStorage.getItem('token')
      if (token !== null && typeof token !== 'undefined') {
        next({ path: '/admin/dashboard' })
      } else {
        next()
      }
    } else if (to.path === '/sealid/:id') {
      next()
    } else {
      keycloak
        .init({
          onLoad: 'check-sso',
          checkLoginIframe: true,
          pkceMethod: 'S256',
        })
        .then((response) => {
          if (response) {
            localStorage.setItem('token', keycloak.token)
            localStorage.setItem('refresh_token', keycloak.refreshToken)
            store.dispatch('auth/fetchAuth').then((response) => {
              store
                .dispatch('dispatchLogin', response.data.data)
                .then(() => {
                  try {
                    if (firebase.messaging.isSupported()) {
                      const messaging = firebase.messaging()
                      Notification.requestPermission().then(() => {
                        messaging
                          .getToken({
                            vapidKey:
                              'BK7ZJNZrpvWFm-rCo-7K6pHNvnNAlHEpF37loL3fvpSkO9782mh18OMM089ssfIH7VQw6dN3Gje8QT8McptZ5zQ',
                          })
                          .then((currentToken) => {
                            $axiosApi
                              .post('/users/notification-token', {
                                token: currentToken,
                                type: 'web',
                              })
                              .then(() => {
                                next({ path: '/admin/dashboard' })
                              })
                              .catch(() => {
                                localStorage.removeItem('token')
                                localStorage.removeItem('refresh_token')
                                localStorage.removeItem('user')
                                store.dispatch('dispatchDisableLoading')
                              })
                          })
                          .catch(() => {
                            next({ path: '/admin/dashboard' })
                          })
                      })
                    }
                  } catch (error) {
                    alert(error)
                  }
                })
                .catch(() => {
                  alert('Server Bermasalah')
                })
            })
          } else {
            next()
          }
        })
    }
  }
})

export default createRouter
