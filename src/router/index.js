import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/store';
import { getToken } from '@/utils/auth.js';

// Containers
const TheContainer = () => import('@/containers/TheContainer');

// Views
import account from '@/router/partials/account.js';
import master from '@/router/partials/master.js';

const Dashboard = () => import('@/views/Dashboard');
const Report = () => import('@/views/reports/Report');
const Login = () => import('@/views/pages/Login');
const OfficialNew = () => import('@/views/pages/OfficialNew');

Vue.use(Router);

const createRouter = new Router({
    mode: 'history', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'active',
    scrollBehavior: () => ({ y: 0 }),
    routes: configRoutes()
});

function configRoutes() {
    return [
        {
            path: '',
            redirect: '/login',
            name: 'Auth',
            component: {
                render(c) {
                    return c('router-view');
                }
            },
            children: [
                {
                    path: 'login',
                    name: 'Login',
                    component: Login,
                }
            ]
        },
        {
            path: '/register',
            name: 'Daftar Pejabat',
            component: OfficialNew,
        },
        {
            path: '/admin',
            name: 'Home',
            redirect: 'admin/dashboard',
            component: TheContainer,
            meta: { requiresAuth: true },
            children: [
                {
                    path: 'dashboard',
                    name: 'Dashboard',
                    component: Dashboard,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'report',
                    name: 'Laporan',
                    component: {
                        render(c) {
                            return c('router-view');
                        }
                    },
                    meta: { requiresAuth: true },
                    children: [
                        {
                            path: 'new',
                            name: 'Laporan Baru',
                            component: Report,
                            meta: { requiresAuth: true },
                        },
                        {
                            path: 'draft',
                            name: 'Laporan Draft',
                            component: Report,
                            meta: { requiresAuth: true },
                        },
                        {
                            path: 'reject',
                            name: 'Laporan Ditolak',
                            component: Report,
                            meta: { requiresAuth: true },
                        },
                        {
                            path: 'finished',
                            name: 'Laporan Selesai',
                            component: Report,
                            meta: { requiresAuth: true },
                        }
                    ]
                },
                account,
                master
            ]
        }
    ];
}

createRouter.beforeEach((to, from, next) => {
    const user = localStorage.getItem('user');

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (user === null) {
            next({ path: '/login' });
        } else {
            next();
        }
    } else {
         if (user !== null) {
            next({ path: '/admin/dashboard' });
        } else {
            next();
        }
    }
});

export default createRouter;
