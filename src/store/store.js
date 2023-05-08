import Vue from 'vue'
import Vuex from 'vuex'
import dashboard from '@/store/modules/dashboard'
import auth from '@/store/modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      isLogin: false,
      data: {},
    },
    isLoading: false,
    textLoading: 'Loading ...',
    treeView: {
      workUnit: {
        id: null,
        name: null,
      },
      workUnitCheckbox: [],
    },
  },
  mutations: {
    changeTreeViewOrganizer(state, value) {
      state.treeView.workUnit.id = value.id
      state.treeView.workUnit.name = value.name
    },
    updateCheckBoxes(state, value) {
      state.treeView.workUnitCheckbox = value
    },
    resetCheckbox(state) {
      state.treeView.workUnitCheckbox = []
    },
    disableLoading(state) {
      state.isLoading = false
    },
    enableLoading(state) {
      state.isLoading = true
    },
    loadingText(state) {
      state.textLoading = 'Loading ...'
    },
    logoutText(state) {
      state.textLoading = 'Logging Out ...'
    },
    isLogin(state, data) {
      state.auth.isLogin = true
      state.auth.data = data
      window.localStorage.setItem('user', JSON.stringify(data))
    },
  },
  actions: {
    dispatchTreeViewOrganizer({ commit }, data) {
      commit('changeTreeViewOrganizer', data)
    },
    dispatchLoadingText({ commit }) {
      commit('loadingText')
    },
    dispatchLogoutText({ commit }) {
      commit('logoutText')
    },
    dispatchEnableLoading({ commit }) {
      commit('enableLoading')
    },
    dispatchDisableLoading({ commit }) {
      commit('disableLoading')
    },
    dispatchLogin({ commit }, data) {
      commit('isLogin', data)
    },
  },
  modules: {
    dashboard: dashboard,
    auth: auth,
  },
})
