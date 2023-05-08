const data = [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Beranda',
        to: '/admin/dashboard',
        icon: 'cil-speedometer',
      },
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
            name: 'Disetujui',
            to: '/admin/systems/approved',
          },
        ],
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
            name: 'Laporan',
            to: '/admin/report',
          },
        ],
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Pengajuan Perubahan Data',
        to: '/admin/requestupdate',
        icon: 'cil-description',
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
