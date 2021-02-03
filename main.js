import Vue from 'vue'
import App from './App'
import request from './request/index.js'
Vue.config.productionTip = false;
App.mpType = 'app'
import store from './store/index.js'
import { myRequest } from './request/index.js'
Vue.prototype.$myRequest = myRequest
const app = new Vue({
    ...App,
    store
})
app.$mount()
