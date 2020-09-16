import Vue from 'vue'
import Vuex from 'vuex'
import dashboard from '@/store/modules/dashboard';
import auth from '@/store/modules/auth';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        dashboard: dashboard,
        auth: auth,
    }
})
