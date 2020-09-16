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
import { getToken } from '@/utils/auth.js'
import store from '@/store/store.js';
import api from '@/utils/api';

Vue.prototype.$apiAdress = process.env.VUE_APP_BASE_API_URL;
Vue.prototype.$http = api;

api.interceptors.request.use(function (config) {
    const token = store.state.auth.token ? store.state.auth.token : getToken();
    config.headers.common['Authorization'] =  token ? `Bearer ${token}` : '';

    return config;
});

api.interceptors.response.use(
    response => {
        if (response.status === 200 || response.status === 201) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                case 400:

                //do something
                break;

                case 401:
                alert("session expired");
                break;
                case 403:
                router.replace({
                    path: "/login",
                    query: { redirect: router.currentRoute.fullPath }
                });
                break;
                case 404:
                alert('page not exist');
                break;
                case 502:
                setTimeout(() => {
                    router.replace({
                    path: "/login",
                    query: {
                        redirect: router.currentRoute.fullPath
                    }
                    });
                }, 1000);
            }
        return Promise.reject(error.response);
        }
    }
);
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
