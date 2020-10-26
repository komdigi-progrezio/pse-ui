const Provinsi = () => import('@/views/master/Provinsi');
const Kota = () => import('@/views/master/Kota');
const Agency = () => import('@/views/master/Agency');
const WorkUnit = () => import('@/views/master/WorkUnit');
const Config = () => import('@/views/master/Config');
const Help = () => import('@/views/master/Help');

const master = {
    path: 'master',
    component: {
        render(c) {
            return c('router-view');
        }
    },
    meta: { requiresAuth: true },
    children: [
        {
            path: 'area',
            redirect: 'area/province',
            name: 'Area',
            component: {
                render(c) {
                    return c('router-view');
                }
            },
            meta: { requiresAuth: true },
            children: [
                {
                    path: 'province',
                    name: 'Provinsi',
                    component: Provinsi,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'district',
                    name: 'Kota',
                    component: Kota,
                    meta: { requiresAuth: true },
                },
            ],
        },
        {
            path: 'agency',
            redirect: '',
            component: {
                render(c) {
                    return c('router-view');
                }
            },
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'Instansi',
                    component: Agency,
                    meta: { requiresAuth: true },
                }
            ]
        },
        {
            path: 'work/unit',
            name: 'Satuan Kerja',
            component: WorkUnit,
            meta: { requiresAuth: true },
        },
        {
            path: 'config',
            name: 'Setting Paramter',
            component: Config,
            meta: { requiresAuth: true },
        },
        {
            path: 'help',
            name: 'Bantuan',
            component: Help,
            meta: { requiresAuth: true },
        },
    ]
}


export default master;
