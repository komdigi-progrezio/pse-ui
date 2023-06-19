import store from '@/store/store.js'

const data = [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Beranda',
        to: '/admin/dashboard',
        icon: 'cil-speedometer',
        items: [],
        permissionName: 'Dashboard',
      },
      {
        _name: 'CSidebarNavTitle',
        name: 'Menu',
        _children: ['Menu'],
        items: [],
        permissionName: 'Menu',
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Sistem Elektronik',
        icon: 'cil-cloud',
        items: [
          {
            name: 'Disetujui',
            to: '/admin/systems/approved',
            permissionName: 'Sistem Elektronik Sudah Disetujui',
          },
          {
            name: 'Belum Disetujui',
            to: '/admin/systems/disapproved',
            permissionName: 'Sistem Elektronik Belum Disetujui',
          },
        ],
        permissionName: 'Sistem Elektronik',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Sturktur Organisasi',
        to: '/admin/organizational-structure',
        icon: 'cil-fork',
        permissionName: 'Daftar Struktur Organisasi',
        items: [],
      },
      // {
      //   _name: 'CSidebarNavDropdown',
      //   name: 'Profil Pejabat Pendaftar',
      //   icon: 'cil-user',
      //   items: [
      //     {
      //       name: 'Profil',
      //       to: '/admin/account/profile',
      //       permissionName: 'Daftar Pengguna Pejabat Pendaftar',
      //     },
      //     {
      //       name: 'Pengguna',
      //       to: '/admin/account/parent',
      //       permissionName: 'Daftar Pengguna Pejabat Pendaftar',
      //     },
      //   ],
      //   permissionName: 'Daftar Pengguna Pejabat Pendaftar',
      // },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Pelaporan',
        icon: 'cil-file',
        items: [
          {
            name: 'Daftar Sistem Elektronik',
            to: '/admin/repository',
            permissionName: 'Daftar Sistem Elektronik',
          },
          {
            name: 'Statistik',
            to: '/admin/statistic',
            permissionName: 'Daftar Statistik',
          },
          {
            name: 'Laporan',
            to: '/admin/report',
            permissionName: 'Daftar Laporan',
          },
          {
            name: 'Riwayat Login User',
            to: '/admin/userlog',
            permissionName: 'Daftar Statistik',
          },
        ],
        permissionName: 'Pelaporan',
      },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Data Perubahan Dokumen',
      //   to: '/admin/account/document-change',
      //   icon: 'cil-library',
      // },
      {
        _name: 'CSidebarNavItem',
        name: 'Pengajuan Perubahan Data',
        to: '/admin/requestupdate',
        icon: 'cil-description',
        items: [],
        permissionName: 'Daftar Pengajuan Perubahan Data',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Daftar Pergantian Akun',
        to: '/admin/account/substitution',
        icon: 'cil-user',
        items: [],
        permissionName: 'Daftar Pergantian User',
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'User',
        icon: 'cil-people',
        items: [
          {
            name: 'Daftar User',
            to: '/admin/account',
            permissionName: 'Daftar User',
          },
          {
            name: 'Daftar User Admin',
            to: '/admin/account/list',
            permissionName: 'Daftar Admin',
          },
        ],
        permissionName: 'User',
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Pengaturan User',
        icon: 'cil-cog',
        items: [
          {
            name: 'Daftar Role',
            to: '/admin/account/role',
            permissionName: 'Daftar Role',
          },
          {
            name: 'Daftar Hak Akses',
            to: '/admin/account/permission',
            permissionName: 'Daftar Hak Akses',
          },
        ],
        permissionName: 'Pengaturan User',
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Data Master',
        icon: 'cil-storage',
        items: [
          {
            name: 'Setting Parameter',
            to: '/admin/master/config',
            permissionName: 'Data Master',
          },
          {
            name: 'Area',
            to: '/admin/master/area/province',
            permissionName: 'Data Master',
          },
          {
            name: 'Instansi',
            to: '/admin/master/agency',
            permissionName: 'Data Master',
          },
          {
            name: 'Satuan Kerja',
            to: '/admin/master/work/unit',
            permissionName: 'Data Master',
          },
          {
            name: 'Bantuan',
            to: '/admin/master/help',
            permissionName: 'Data Master',
          },
        ],
        permissionName: 'Data Master',
      },
      // {
      //   _name: 'CSidebarNavItem',
      //   name: 'Ganti Password',
      //   to: '/admin/account/change/password',
      //   icon: 'cil-lock-locked',
      // },
    ],
  },
]
const mapped = data.map((value) => {
  return {
    ...value,
    _children: value._children
      .filter((valueChild) => {
        return store.state.auth.data.permissions.includes(
          valueChild.permissionName
        )
      })
      .map((item) => {
        return {
          ...item,
          items: item.items.filter((valueChild) => {
            return store.state.auth.data.permissions.includes(
              valueChild.permissionName
            )
          }),
        }
      }),
  }
})
export default mapped
