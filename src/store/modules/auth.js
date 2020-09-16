import { getToken } from '@/utils/auth';
import $axiosApi from '@/utils/api';

const state = {
    token: getToken(),
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
            $axiosApi.post(`${process.env.VUE_APP_BASE_API_URL}auth/logout`)
            .then(response => {
                localStorage.removeItem('token')
                context.commit('auth/DESTROY_TOKEN', null, {
                    root: true,
                });
                resolve(response)
            })
            .catch(error => {
                localStorage.removeItem('token')
                context.commit('auth/DESTROY_TOKEN', null, {
                    root: true,
                });
                reject(error)
            })
        })
    },
    retrieveToken(context, credentials) {
        return new Promise((resolve, reject) => {
            $axiosApi.post(`${process.env.VUE_APP_BASE_API_URL}auth/login`, {
            username: credentials.username,
            password: credentials.password,
        })
            .then(response => {
                console.log(response);
                const token = response.data.access_token

                localStorage.setItem('token', token)
                context.commit('auth/RETRIEVE_TOKEN', token, {
                    root: true,
                });
                resolve(response)
            })
            .catch(error => {
                reject(error);
            })
        })
    },
};

const mutations = {
    RETRIEVE_TOKEN:(state, token) =>state.token = token,
    DESTROY_TOKEN: state => state.token = null,
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
