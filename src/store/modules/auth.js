import { getToken } from '@/utils/auth';
import { getRefreshToken } from '@/utils/auth';
import $axiosApi from '@/utils/api';

const state = {
    isLogin: false,
    token: getToken(),
    refresh_token: getRefreshToken(),
};

const getters = {
    GET_TOKEN: state => state.token,
    LOGGED_IN: state => state.token !== null,
    RETRIEVE_TOKEN: (state, token) => state.token = token,
    DESTROY_TOKEN: (state) => state.token = null,
};

const actions = {
    destroyToken(context) {
        return new Promise((resolve, reject) => {
            $axiosApi.post(`${process.env.VUE_APP_BASE_API_URL}users/logout`)
            .then(response => {
                localStorage.removeItem('token')
                localStorage.removeItem('refresh_token')
                localStorage.removeItem('user')
                context.commit('DESTROY_TOKEN', null);
                resolve(response)
            })
            .catch(error => {
                localStorage.removeItem('token')
                localStorage.removeItem('refresh_token')
                localStorage.removeItem('user')
                context.commit('DESTROY_TOKEN', null);
                reject(error)
            })
        })
    },
    retrieveToken(context, credentials) {
        return new Promise((resolve, reject) => {
            $axiosApi.post(`${process.env.VUE_APP_BASE_API_URL}users/login`, {
            username: credentials.username,
            password: credentials.password,
        })
            .then(response => {
                const token = response.data.access_token
                const refreshToken = response.data.refresh_token

                localStorage.setItem('token', token)
                localStorage.setItem('refresh_token', refreshToken)
                context.commit('RETRIEVE_TOKEN', response.data);

                $axiosApi.get(`${process.env.VUE_APP_BASE_API_URL}users/get/authenticated`)
                    .then(response => {
                        const user = response.data.data;

                        localStorage.setItem('user', JSON.stringify(user))
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                reject(error);
            })
        })
    },
};

const mutations = {
    RETRIEVE_TOKEN:(state, data) => {
        state.token = data.access_token;
        state.refresh_token = data.refresh_token;
    },
    DESTROY_TOKEN: state => {
        state.token = null;
        state.refresh_token = null;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
