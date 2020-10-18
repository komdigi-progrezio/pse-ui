const Provinsi = () => import('@/views/master/Provinsi');
const Kota = () => import('@/views/master/Kota');
const Agency = () => import('@/views/master/Agency');

const master = {
    path: 'master',
    meta: {
        label: 'Data Master'
    },
    component: {
        render(c) {
            return c('router-view');
        }
    },
    children: [
        {
            path: 'area',
            name: 'Area',
            component: {
                render(c) {
                    return c('router-view');
                }
            },
            children: [
                {
                    path: 'province',
                    name: 'Provinsi',
                    component: Provinsi
                },
                {
                    path: 'district',
                    name: 'Kota',
                    component: Kota,
                },
            ],
        },
        {
            path: 'agency',
            name: 'Instansi',
            component: Agency,
        },
    ]
}


export default master;
