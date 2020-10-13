const Account = () => import('@/views/accounts/Account');
const AccountSubtitutions = () =>
    import('@/views/accounts/AccountSubtitutions');
const AccountRoles = () => import('@/views/accounts/AccountRoles');
const AccountPermissions = () => import('@/views/accounts/AccountPermissions');
const AccountDocumentChanges = () =>
    import('@/views/accounts/AccountDocumentChanges');
const AccountListAdmin = () => import('@/views/accounts/AccountListAdmin');
const AccountChangePassword = () =>
    import('@/views/accounts/AccountChangePassword');

const account = {
    path: 'account',
    meta: {
        label: 'Akun'
    },
    component: {
        render(c) {
            return c('router-view');
        }
    },
    children: [
        {
            path: '',
            component: Account
        },
        {
            path: 'subtitutions',
            name: 'Pengajuan Penggantian User',
            component: AccountSubtitutions
        },
        {
            path: 'role',
            name: 'Daftar Role',
            component: AccountRoles
        },
        {
            path: 'permission',
            name: 'Daftar Hak Akses',
            component: AccountPermissions
        },
        {
            path: 'document-changes',
            name: 'Daftar Perubahan Dokumen',
            component: AccountDocumentChanges
        },
        {
            path: 'list',
            name: 'Daftar User Admin',
            component: AccountListAdmin
        },
        {
            path: 'change/password',
            name: 'Ganti Password',
            component: AccountChangePassword
        }
    ]
}


export default account;
