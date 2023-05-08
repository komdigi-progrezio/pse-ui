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
        _name: 'CSidebarNavItem',
        name: 'Pengajuan Perubahan Data',
        to: '/admin/requestupdate',
        icon: 'cil-description',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Sturktur Organisasi',
        to: '/admin/organizational-structure',
        icon: 'cil-fork',
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Profil Pejabat Pendaftar',
        icon: 'cil-user',
        items: [
          {
            name: 'Profil',
            to: '/admin/account/profile',
          },
          {
            name: 'Pengguna',
            to: '/admin/account/parent',
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
