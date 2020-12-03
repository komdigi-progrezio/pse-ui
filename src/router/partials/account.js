const Account = () => import('@/views/accounts/Account')
const AccountProfile = () => import('@/views/accounts/AccountProfile')
const AccountParent = () => import('@/views/accounts/AccountParent')
const DetailAccount = () => import('@/views/accounts/DetailAccount')
const AccountSubtitutions = () => import('@/views/accounts/AccountSubtitutions')
const AccountRoles = () => import('@/views/accounts/AccountRoles')
const AccountPermissions = () => import('@/views/accounts/AccountPermissions')
const AccountDocumentChanges = () =>
  import('@/views/accounts/AccountDocumentChanges')
const AccountListAdmin = () => import('@/views/accounts/AccountListAdmin')
const AccountChangePassword = () =>
  import('@/views/accounts/AccountChangePassword')

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
    },
    {
      path: 'profile',
      component: AccountProfile,
      meta: { requiresAuth: true },
    },
    {
      path: 'parent',
      component: AccountParent,
      meta: { requiresAuth: true },
    },
    {
      path: ':id/official',
      component: DetailAccount,
      meta: { requiresAuth: true },
    },
    {
      path: 'subtitutions',
      name: 'Pengajuan Penggantian User',
      component: AccountSubtitutions,
      meta: { requiresAuth: true },
    },
    {
      path: 'role',
      name: 'Daftar Role',
      component: AccountRoles,
      meta: { requiresAuth: true },
    },
    {
      path: 'permission',
      name: 'Daftar Hak Akses',
      component: AccountPermissions,
      meta: { requiresAuth: true },
    },
    {
      path: 'document-changes',
      name: 'Daftar Perubahan Dokumen',
      component: AccountDocumentChanges,
      meta: { requiresAuth: true },
    },
    {
      path: 'list',
      name: 'Daftar User Admin',
      component: AccountListAdmin,
      meta: { requiresAuth: true },
    },
    {
      path: 'change/password',
      name: 'Ganti Password',
      component: AccountChangePassword,
      meta: { requiresAuth: true },
    },
  ],
}

export default account
