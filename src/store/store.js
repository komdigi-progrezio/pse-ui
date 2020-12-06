import Vue from 'vue'
import Vuex from 'vuex'
import dashboard from '@/store/modules/dashboard'
import auth from '@/store/modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
  },
  actions: {
    dispatchTreeViewOrganizer({ commit }, data) {
      commit('changeTreeViewOrganizer', data)
    },
  },
  modules: {
    dashboard: dashboard,
    auth: auth,
  },
})
