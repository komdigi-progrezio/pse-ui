const data = [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavTitle',
        _children: ['Menu'],
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Sistem Elektronik',
        icon: 'cil-cloud',
        items: [
          {
            name: 'Belum Disetujui',
            to: '/admin/systems/disapproved',
          },
        ],
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Pelaporan',
        icon: 'cil-file',
        items: [
          {
            name: 'Daftar Sistem Elektronik',
            to: '/admin/repository',
          },
          {
            name: 'Statistik',
            to: '/admin/statistic',
          },
          {
            name: 'Laporan',
            to: '/admin/report',
          },
        ],
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
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'User',
        icon: 'cil-people',
        items: [
          {
            name: 'Daftar User',
            to: '/admin/account',
          },
          {
            name: 'Daftar User Admin',
            to: '/admin/account/list',
          },
        ],
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Pengaturan User',
        icon: 'cil-cog',
        items: [
          {
            name: 'Daftar Role',
            to: '/admin/account/role',
          },
          {
            name: 'Daftar Hak Akses',
            to: '/admin/account/permission',
          },
        ],
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Data Master',
        icon: 'cil-storage',
        items: [
          {
            name: 'Setting Parameter',
            to: '/admin/master/config',
          },
          {
            name: 'Area',
            to: '/admin/master/area/province',
          },
          {
            name: 'Instansi',
            to: '/admin/master/agency',
          },
          {
            name: 'Satuan Kerja',
            to: '/admin/master/work/unit',
          },
          {
            name: 'Bantuan',
            to: '/admin/master/help',
          },
        ],
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

export default data
