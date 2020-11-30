import Vue from 'vue'
import Vuex from 'vuex'
import dashboard from '@/store/modules/dashboard'
import auth from '@/store/modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    treeView: {
      organizer: {
        id: null,
        name: null,
      },
    },
  },
  mutations: {
    changeTreeViewOrganizer(state, data) {
      state.treeView.organizer.id = data.id
      state.treeView.organizer.name = data.name
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
