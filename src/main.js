import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import { extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VueSweetalert2 from 'vue-sweetalert2';
import datePicker from 'vue-bootstrap-datetimepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

import store from './store'

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.use(datePicker)
Vue.prototype.$log = console.log.bind(console)

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

Vue.use(VueSweetalert2);

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
