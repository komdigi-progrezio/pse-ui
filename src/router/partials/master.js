import store from '@/store/store'
const Provinsi = () => import('@/views/master/Provinsi')
const Kota = () => import('@/views/master/Kota')
const Agency = () => import('@/views/master/Agency')
const WorkUnit = () => import('@/views/master/WorkUnit')
const Config = () => import('@/views/master/Config')
const Help = () => import('@/views/master/Help')

const master = {
  path: 'master',
  component: {
    render(c) {
      return c('router-view')
    },
  },
  meta: { requiresAuth: true },
  children: [
    {
      path: 'area',
      redirect: 'area/province',
      name: 'Area',
      component: {
        render(c) {
          return c('router-view')
        },
      },
      meta: { requiresAuth: true },
      children: [
        {
          path: 'province',
          name: 'Provinsi',
          component: Provinsi,
          meta: { requiresAuth: true },
          beforeEnter: (to, from, next) => {
            if (store.state.auth.data.permissions.includes('Data Master')) {
              next()
            } else {
              next({
                path: '/fobidden',
              })
            }
          },
        },
        {
          path: 'district',
          name: 'Kota',
          component: Kota,
          meta: { requiresAuth: true },
          beforeEnter: (to, from, next) => {
            if (store.state.auth.data.permissions.includes('Data Master')) {
              next()
            } else {
              next({
                path: '/fobidden',
              })
            }
          },
        },
      ],
    },
    {
      path: 'agency',
      redirect: '',
      component: {
        render(c) {
          return c('router-view')
        },
      },
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'Instansi',
          component: Agency,
          meta: { requiresAuth: true },
          beforeEnter: (to, from, next) => {
            if (store.state.auth.data.permissions.includes('Data Master')) {
              next()
            } else {
              next({
                path: '/fobidden',
              })
            }
          },
        },
      ],
    },
    {
      path: 'work/unit',
      name: 'Satuan Kerja',
      component: WorkUnit,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (store.state.auth.data.permissions.includes('Data Master')) {
          next()
        } else {
          next({
            path: '/fobidden',
          })
        }
      },
    },
    {
      path: 'config',
      name: 'Setting Paramter',
      component: Config,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (store.state.auth.data.permissions.includes('Data Master')) {
          next()
        } else {
          next({
            path: '/fobidden',
          })
        }
      },
    },
    {
      path: 'help',
      name: 'Bantuan',
      component: Help,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (store.state.auth.data.permissions.includes('Data Master')) {
          next()
        } else {
          next({
            path: '/fobidden',
          })
        }
      },
    },
  ],
}

export default master
