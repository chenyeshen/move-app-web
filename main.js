import Vue from 'vue'
import App from './App'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.serverUrl= 'http://localhost:8089'
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
