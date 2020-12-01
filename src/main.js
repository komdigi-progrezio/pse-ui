import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import { extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VueSweetalert2 from 'vue-sweetalert2'
import datePicker from 'vue-bootstrap-datetimepicker'
import store from '@/store/store.js'
import api from '@/utils/api'
import axios from 'axios'
import { getToken } from '@/utils/auth.js'
import '@morioh/v-quill-editor/dist/editor.css'
import Editor from '@morioh/v-quill-editor'
import VueToastr from 'vue-toastr'
import toastrConfig from '@/utils/toastr'
//  Partials Component
import Message from '@/views/notifications/Message.vue'
import TreeItem from '@/views/partials/TreeItem.vue'

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refreshToken = window.localStorage.getItem('refresh_token')
      return axios
        .post(`${process.env.VUE_APP_BASE_API_URL}users/oauth/refresh`, {
          refresh_token: refreshToken,
        })
        .then(({ data }) => {
          window.localStorage.setItem('token', data.access_token)
          window.localStorage.setItem('refresh_token', data.refresh_token)
          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + data.access_token
          originalRequest.headers['Authorization'] =
            'Bearer ' + data.access_token
          return axios(originalRequest)
        })
    }

    return Promise.reject(error)
  }
)
api.interceptors.request.use(function (config) {
  const token = store.state.auth.token ? store.state.auth.token : getToken()
  config.headers.common['Authorization'] = token ? `Bearer ${token}` : ''

  return config
})

Vue.prototype.$apiAdress = process.env.VUE_APP_BASE_API_URL
Vue.prototype.$http = api

// global register
Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.use(datePicker)
Vue.use(Editor)
Vue.use(VueToastr, {
  toastrConfig,
})
Vue.prototype.$log = console.log.bind(console)

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

import './utils/validations'
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('message', Message)
Vue.component('tree-item', TreeItem)

Vue.use(VueSweetalert2)

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App,
  },
})
