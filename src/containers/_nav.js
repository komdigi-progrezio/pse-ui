export default [
    {
        _name: 'CSidebarNav',
        _children: [
            {
                _name: 'CSidebarNavItem',
                name: 'Beranda',
                to: '/dashboard',
                icon: 'cil-speedometer'
            },
            {
                _name: 'CSidebarNavTitle',
                _children: ['Menu']
            },
            {
                _name: 'CSidebarNavDropdown',
                name: 'Laporan',
                route: '/admin/report',
                icon: 'cil-pencil',
                items: [
                    {
                        name: 'Baru',
                        to: '/admin/report/new'
                    },
                    {
                        name: 'Draft',
                        to: '/admin/report/draft'
                    },
                    {
                        name: 'Ditolak',
                        to: '/admin/report/reject'
                    },
                    {
                        name: 'Selesai',
                        to: '/admin/report/finished'
                    }
                ]
            },
            {
                _name: 'CSidebarNavDropdown',
                name: 'User',
                icon: 'cil-people',
                items: [
                    {
                        name: 'Daftar User',
                        to: '/admin/account'
                    },
                    {
                        name: 'Daftar User Admin',
                        to: '/admin/account/list'
                    }
                ]
            },
            {
                _name: 'CSidebarNavDropdown',
                name: 'Pengaturan User',
                icon: 'cil-cog',
                items: [
                    {
                        name: 'Daftar Role',
                        to: '/admin/account/role'
                    },
                    {
                        name: 'Daftar Hak Akses',
                        to: '/admin/account/permission'
                    },
                    {
                        name: 'Ganti Password',
                        to: '/admin/account/change/password'
                    }
                ]
            },
            {
                _name: 'CSidebarNavDropdown',
                name: 'Data Master',
                icon: 'cil-storage',
                items: [
                    {
                        name: 'Setting Parameter',
                        to: '/admin/master/config'
                    },
                    {
                        name: 'Area',
                        to: '/admin/master/area/province'
                    },
                    {
                        name: 'Instansi',
                        to: '/admin/master/agency'
                    },
                    {
                        name: 'Satuan Kerja',
                        to: '/admin/master/work/unit'
                    },
                    {
                        name: 'Bantuan',
                        to: '/admin/master/help'
                    },
                ]
            }
            // {
            //   _name: 'CSidebarNavTitle',
            //   _children: ['Components']
            // },
            // {
            //   _name: 'CSidebarNavDropdown',
            //   name: 'Base',
            //   route: '/base',
            //   icon: 'cil-puzzle',
            //   items: [
            //     {
            //       name: 'Breadcrumbs',
            //       to: '/base/breadcrumbs'
            //     },
            //     {
            //       name: 'Cards',
            //       to: '/base/cards'
            //     },
            //     {
            //       name: 'Carousels',
            //       to: '/base/carousels'
            //     },
            //     {
            //       name: 'Collapses',
            //       to: '/base/collapses'
            //     },
            //     {
            //       name: 'Forms',
            //       to: '/base/forms'
            //     },
            //     {
            //       name: 'Jumbotrons',
            //       to: '/base/jumbotrons'
            //     },
            //     {
            //       name: 'List Groups',
            //       to: '/base/list-groups'
            //     },
            //     {
            //       name: 'Navs',
            //       to: '/base/navs'
            //     },
            //     {
            //       name: 'Navbars',
            //       to: '/base/navbars'
            //     },
            //     {
            //       name: 'Paginations',
            //       to: '/base/paginations'
            //     },
            //     {
            //       name: 'Popovers',
            //       to: '/base/popovers'
            //     },
            //     {
            //       name: 'Progress Bars',
            //       to: '/base/progress-bars'
            //     },
            //     {
            //       name: 'Switches',
            //       to: '/base/switches'
            //     },
            //     {
            //       name: 'Tables',
            //       to: '/base/tables'
            //     },
            //     {
            //       name: 'Tabs',
            //       to: '/base/tabs'
            //     },
            //     {
            //       name: 'Tooltips',
            //       to: '/base/tooltips'
            //     }
            //   ]
            // },
            // {
            //   _name: 'CSidebarNavDropdown',
            //   name: 'Buttons',
            //   route: '/buttons',
            //   icon: 'cil-cursor',
            //   items: [
            //     {
            //       name: 'Buttons',
            //       to: '/buttons/standard-buttons'
            //     },
            //     {
            //       name: 'Button Dropdowns',
            //       to: '/buttons/dropdowns'
            //     },
            //     {
            //       name: 'Button Groups',
            //       to: '/buttons/button-groups'
            //     },
            //     {
            //       name: 'Brand Buttons',
            //       to: '/buttons/brand-buttons'
            //     }
            //   ]
            // },
            // {
            //   _name: 'CSidebarNavItem',
            //   name: 'Charts',
            //   to: '/charts',
            //   icon: 'cil-chart-pie'
            // },
            // {
            //   _name: 'CSidebarNavDropdown',
            //   name: 'Icons',
            //   route: '/icons',
            //   icon: 'cil-star',
            //   items: [
            //     {
            //       name: 'CoreUI Icons',
            //       to: '/icons/coreui-icons',
            //       badge: {
            //         color: 'info',
            //         text: 'NEW'
            //       }
            //     },
            //     {
            //       name: 'Brands',
            //       to: '/icons/brands'
            //     },
            //     {
            //       name: 'Flags',
            //       to: '/icons/flags'
            //     }
            //   ]
            // },
            // {
            //   _name: 'CSidebarNavDropdown',
            //   name: 'Notifications',
            //   route: '/notifications',
            //   icon: 'cil-bell',
            //   items: [
            //     {
            //       name: 'Alerts',
            //       to: '/notifications/alerts'
            //     },
            //     {
            //       name: 'Badges',
            //       to: '/notifications/badges'
            //     },
            //     {
            //       name: 'Modals',
            //       to: '/notifications/modals'
            //     }
            //   ]
            // },
            // {
            //   _name: 'CSidebarNavItem',
            //   name: 'Widgets',
            //   to: '/widgets',
            //   icon: 'cil-calculator',
            //   badge: {
            //     color: 'primary',
            //     text: 'NEW',
            //     shape: 'pill'
            //   }
            // },
            // {
            //   _name: 'CSidebarNavDivider',
            //   _class: 'm-2'
            // },
            // {
            //   _name: 'CSidebarNavTitle',
            //   _children: ['Extras']
            // },
            // {
            //   _name: 'CSidebarNavDropdown',
            //   name: 'Pages',
            //   route: '/pages',
            //   icon: 'cil-star',
            //   items: [
            //     {
            //       name: 'Login',
            //       to: '/pages/login'
            //     },
            //     {
            //       name: 'Register',
            //       to: '/pages/register'
            //     },
            //     {
            //       name: 'Error 404',
            //       to: '/pages/404'
            //     },
            //     {
            //       name: 'Error 500',
            //       to: '/pages/500'
            //     }
            //   ]
            // },
            // {
            //   _name: 'CSidebarNavItem',
            //   name: 'Download CoreUI',
            //   href: 'http://coreui.io/vue/',
            //   icon: { name: 'cil-cloud-download', class: 'text-white' },
            //   _class: 'bg-success text-white',
            //   target: '_blank'
            // },
            // {
            //   _name: 'CSidebarNavItem',
            //   name: 'Try CoreUI PRO',
            //   href: 'http://coreui.io/pro/vue/',
            //   icon: { name: 'cil-layers', class: 'text-white' },
            //   _class: 'bg-danger text-white',
            //   target: '_blank'
            // }
        ]
    }
];
