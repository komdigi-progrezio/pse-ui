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
import '@morioh/v-quill-editor/dist/editor.css'
import Editor from '@morioh/v-quill-editor'
import VueToastr from 'vue-toastr'
import toastrConfig from '@/utils/toastr'
import { Plugin } from 'vue-fragment'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
//  Partials Component
import Message from '@/views/notifications/Message.vue'
import TreeItem from '@/views/partials/TreeItem.vue'
import TreeItemCheckbox from '@/views/partials/TreeItemCheckbox.vue'
import vSelect from 'vue-select'
//importing Vue plugin
import CoreuiVueCharts from '@coreui/vue-chartjs'
import { CChartBar, CChartLine } from '@coreui/vue-chartjs'
import './fb'
import './utils/validations'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('message', Message)
Vue.component('tree-item', TreeItem)
Vue.component('tree-item-checkbox', TreeItemCheckbox)
Vue.component('v-select', vSelect)
Vue.component('vue-toastr', VueToastr)

//importing single component
Vue.component('CChartBar', CChartBar)
Vue.component('CChartLine', CChartLine)

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
api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    const originalRequest = error.config
    if (
      (error.response.data.message === '[Keycloak Guard] Expired token' ||
        error.response.status === 401) &&
      !originalRequest._retry
    ) {
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
        .catch(() => {
          window.localStorage.removeItem('token')
          window.localStorage.removeItem('refresh_token')
          window.localStorage.removeItem('user')
          window.location = '/login'
        })
    }

    return Promise.reject(error)
  }
)
api.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem('token')
  config.headers.common['Authorization'] = token ? `Bearer ${token}` : ''

  return config
})
Vue.config.devtools = process.env.VUE_APP_DEVTOOLS
Vue.prototype.$apiAdress = process.env.VUE_APP_BASE_API_URL
Vue.prototype.$http = api

// global register
Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.use(datePicker)
Vue.use(Editor)
Vue.use(Plugin)
Vue.use(VueToastr, {
  toastrConfig,
})
Vue.use(VueSweetalert2)
Vue.use(CoreuiVueCharts)
Vue.prototype.$log = console.log.bind(console)

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})
