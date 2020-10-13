const Provinsi = () => import('@/views/master/Provinsi');
const Kota = () => import('@/views/master/Kota');

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
                    path: 'provinsi',
                    name: 'Provinsi',
                    component: Provinsi
                },
                {
                    path: 'kota',
                    name: 'Kota',
                    component: Kota
                },
            ],
        },
    ]
}


export default master;
