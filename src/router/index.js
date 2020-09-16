import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store';
import { getToken } from '@/utils/auth.js';

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard');

const Report = () => import('@/views/reports/Report');
const Account = () => import('@/views/accounts/Account');
const AccountSubtitutions = () => import('@/views/accounts/subtitutions/AccountSubtitutions');
const AccountDocumentChanges = () => import('@/views/accounts/documents/AccountDocumentChanges');
const Login = () => import('@/views/pages/Login')

Vue.use(Router)

const createRouter = new Router({
    mode: 'history', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'active',
    scrollBehavior: () => ({ y: 0 }),
    routes: configRoutes()
})

function configRoutes () {
    return [
        {
            path: '',
            redirect: '/login',
            name: 'Auth',
            component: {
                render (c) { return c('router-view') }
            },
            children: [
                {
                path: 'login',
                name: 'Login',
                component: Login
                },
            ]
        },
        {
            path: '/admin',
            name: 'Home',
            component: TheContainer,
            children: [
                {
                    path: 'dashboard',
                    name: 'Dashboard',
                    component: Dashboard
                },
                {
                    path: 'report',
                    name: 'Report',
                    component: {
                        render (c) { return c('router-view') }
                    },
                    children: [
                        {
                            path: 'new',
                            name: 'NewReport',
                            component: Report,
                        },
                        {
                            path: 'draft',
                            name: 'DraftReport',
                            component: Report,
                        },
                        {
                            path: 'reject',
                            name: 'RejectReport',
                            component: Report,
                        },
                        {
                            path: 'finished',
                            name: 'FinishReport',
                            component: Report,
                        },
                    ]
                },
                {
                    path: 'account',
                    meta: {
                        label: 'Akun'
                    },
                    component: {
                    render(c) {
                        return c('router-view')
                    }
                    },
                    children: [
                        {
                            path: '',
                            component: Account,
                        },
                        {
                            path:'subtitutions',
                            name: 'AccountSubtitutions',
                            component: AccountSubtitutions,
                        },
                        {
                            path:'document-changes',
                            name: 'AccountDocumentChanges',
                            component: AccountDocumentChanges,
                        },
                    ]
                },
            ]
        },
    ]
}

createRouter.beforeEach((to, from, next) => {
    const token = store.state.auth.token ? store.state.auth.token : getToken();

    if (to.name !== 'Login' && !token) {
        next({ name: 'Login' })
    } else if(token && to.name === 'Login') {
        next({ name: 'Dashboard' });
    } else {
        next();
    }

})

export default createRouter;
