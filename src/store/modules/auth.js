import $axiosApi from '@/utils/api'
import Vue from 'vue'

const state = {
  isLogin: false,
}

const getters = {
  GET_TOKEN: (state) => state.token,
  LOGGED_IN: (state) => state.token !== null,
  RETRIEVE_TOKEN: (state, token) => (state.token = token),
  DESTROY_TOKEN: (state) => (state.token = null),
}

const actions = {
  destroyToken(context) {
    return new Promise((resolve, reject) => {
      $axiosApi
        .post(`${process.env.VUE_APP_BASE_API_URL}users/logout`, {
          refresh_token: localStorage.getItem('refresh_token'),
          token: localStorage.getItem('token'),
        })
        .then((response) => {
          localStorage.removeItem('token')
          localStorage.removeItem('refresh_token')
          localStorage.removeItem('user')
          context.commit('DESTROY_TOKEN', null)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  retrieveToken({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      $axiosApi
        .post(`${process.env.VUE_APP_BASE_API_URL}users/login`, {
          username: credentials.username,
          password: credentials.password,
          recaptcha: credentials.recaptcha,
        })
        .then((response) => {
          const token = response.data.access_token
          const refreshToken = response.data.refresh_token

          window.localStorage.setItem('token', token)
          window.localStorage.setItem('refresh_token', refreshToken)
          commit('RETRIEVE_TOKEN', response.data)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchAuth(context) {
    return new Promise((resolve, reject) => {
      $axiosApi
        .get(`${process.env.VUE_APP_BASE_API_URL}users/get/authenticated`)
        .then((response) => {
          const user = response.data.data

          window.localStorage.setItem('user', JSON.stringify(user))
          resolve(response)
        })
        .catch((error) => {
          reject(error)
          $axiosApi
            .post(`${process.env.VUE_APP_BASE_API_URL}users/logout`, {
              refresh_token: localStorage.getItem('refresh_token'),
            })
            .then(() => {
              localStorage.removeItem('token')
              localStorage.removeItem('refresh_token')
              localStorage.removeItem('user')
              context.commit('DESTROY_TOKEN', null)
              Vue.swal('Perhatian!', 'Akun Anda Belum Diaktifkan', 'warning')
              location.replace('/login')
            })
            .catch(() => {
              // location.replace('/login')
              console.log(error)
            })
        })
    })
  },
}

const mutations = {
  RETRIEVE_TOKEN: (state, data) => {
    state.token = data.access_token
    state.refresh_token = data.refresh_token
  },
  DESTROY_TOKEN: (state) => {
    state.token = null
    state.refresh_token = null
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
