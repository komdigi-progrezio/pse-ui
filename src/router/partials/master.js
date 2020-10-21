const Provinsi = () => import('@/views/master/Provinsi');
const Kota = () => import('@/views/master/Kota');
const Agency = () => import('@/views/master/Agency');
const WorkUnit = () => import('@/views/master/WorkUnit');
const Config = () => import('@/views/master/Config');

const master = {
    path: 'master',
    component: {
        render(c) {
            return c('router-view');
        }
    },
    children: [
        {
            path: 'area',
            redirect: 'area/provinsi',
            name: 'Area',
            component: {
                render(c) {
                    return c('router-view');
                }
            },
            children: [
                {
                    path: 'provinsi',
                    name: 'Provinsi',
                    component: Provinsi
                },
                {
                    path: 'kota',
                    name: 'Kota',
                    component: Kota,
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
            children: [
                {
                    path: '',
                    name: 'Instansi',
                    component: Agency,
                }
            ]
        },
        {
            path: 'work/unit',
            name: 'Satuan Kerja',
            component: WorkUnit,
        },
        {
            path: 'config',
            name: 'Setting Paramter',
            component: Config,
        },
    ]
}


export default master;
