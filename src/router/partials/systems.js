import store from '@/store/store'

const SystemApproved = () => import('@/views/systems/SystemApproved')
const SystemDisapproved = () => import('@/views/systems/SystemDisapproved')
const SystemRegister = () => import('@/views/systems/SystemRegister')
const SystemDetail = () => import('@/views/systems/SystemDetail')
const SystemEdit = () => import('@/views/systems/SystemEdit')

const systems = {
  path: 'systems',
  meta: {
    label: 'System',
    requiresAuth: true,
  },
  component: {
    render(c) {
      return c('router-view')
    },
  },
  children: [
    {
      path: 'approved',
      component: SystemApproved,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (
          store.state.auth.data.permissions.includes(
            'Sistem Elektronik Sudah Disetujui'
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
      path: 'disapproved',
      component: SystemDisapproved,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        console.log()
        if (
          store.state.auth.data.permissions.includes(
            'Sistem Elektronik Belum Disetujui'
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
      path: 'register',
      component: SystemRegister,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (
          store.state.auth.data.permissions.includes('Tambah Sistem Elektronik')
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
      path: ':id',
      component: SystemDetail,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (
          store.state.auth.data.permissions.includes('Detail Sistem Elektronik')
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
      path: ':id/edit',
      component: SystemEdit,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (
          store.state.auth.data.permissions.includes('Edit Sistem Elektronik')
        ) {
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

export default systems
