import store from '@/store/store'
const Account = () => import('@/views/accounts/Account')
const AccountProfile = () => import('@/views/accounts/AccountProfile')
const AccountParent = () => import('@/views/accounts/AccountParent')
const DetailAccount = () => import('@/views/accounts/DetailAccount')
const AccountSubstitution = () => import('@/views/accounts/AccountSubstitution')
const DetailAccountSubstitution = () =>
  import('@/views/accounts/DetailAccountSubstitution')
const EditAccount = () => import('@/views/accounts/EditAccount')
const AccountRoles = () => import('@/views/accounts/AccountRoles')
const AccountPermissions = () => import('@/views/accounts/AccountPermissions')
// const AccountDocumentChange = () =>
//   import('@/views/accounts/AccountDocumentChange')
const AccountListAdmin = () => import('@/views/accounts/AccountListAdmin')
// const AccountChangePassword = () =>
//   import('@/views/accounts/AccountChangePassword')
const ElectronicSystem = () =>
  import('@/views/accounts/electronic/ElectronicSystem')

const account = {
  path: 'account',
  meta: {
    label: 'Akun',
    requiresAuth: true,
  },
  component: {
    render(c) {
      return c('router-view')
    },
  },
  children: [
    {
      path: '',
      component: Account,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (store.state.auth.data.permissions.includes('Daftar User')) {
          next()
        } else {
          next({
            path: '/fobidden',
          })
        }
      },
    },
    {
      path: 'profile',
      component: AccountProfile,
      meta: { requiresAuth: true },
    },
    {
      path: 'parent/:parent_id?',
      component: AccountParent,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (
          store.state.auth.data.permissions.includes(
            'Daftar Sub Pejabat Berdasarkan User'
          ) ||
          store.state.auth.data.permissions.includes(
            'Daftar Pengguna Pejabat Pendaftar'
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
      path: ':id/official',
      component: DetailAccount,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (store.state.auth.data.permissions.includes('Detail User')) {
          next()
        } else {
          next({
            path: '/fobidden',
          })
        }
      },
    },
    {
      path: 'substitution',
      name: 'Daftar Penggantian User',
      component: AccountSubstitution,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (
          store.state.auth.data.permissions.includes('Daftar Pergantian User')
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
      path: ':id/substitution',
      name: 'Detail Penggantian User',
      component: DetailAccountSubstitution,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (
          store.state.auth.data.permissions.includes('Edit Pergantian User')
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
      name: 'Edit Akun',
      component: EditAccount,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (store.state.auth.data.permissions.includes('Edit User')) {
          next()
        } else {
          next({
            path: '/fobidden',
          })
        }
      },
    },
    {
      path: 'role',
      name: 'Daftar Role',
      component: AccountRoles,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (store.state.auth.data.permissions.includes('Daftar Role')) {
          next()
        } else {
          next({
            path: '/fobidden',
          })
        }
      },
    },
    {
      path: 'permission',
      name: 'Daftar Hak Akses',
      component: AccountPermissions,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (store.state.auth.data.permissions.includes('Daftar Hak Akses')) {
          next()
        } else {
          next({
            path: '/fobidden',
          })
        }
      },
    },
    // {
    //   path: 'document-change',
    //   name: 'Daftar Perubahan Dokumen',
    //   component: AccountDocumentChange,
    //   meta: { requiresAuth: true },
    // },
    {
      path: 'list',
      name: 'Daftar User Admin',
      component: AccountListAdmin,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (store.state.auth.data.permissions.includes('Tambah Admin')) {
          next()
        } else {
          next({
            path: '/fobidden',
          })
        }
      },
    },
    // {
    //   path: 'change/password',
    //   name: 'Ganti Password',
    //   component: AccountChangePassword,
    //   meta: { requiresAuth: true },
    // },
    {
      path: ':id/electronic-system',
      component: ElectronicSystem,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (
          store.state.auth.data.permissions.includes(
            'Daftar Sistem Elektronik Berdasarkan User'
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
  ],
}

export default account
