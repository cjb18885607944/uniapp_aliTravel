import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 引入vuex
import store from './pages/store/store.js'
Vue.prototype.$store = store

// 引入loading
import loading from './common/components/loading/loading.vue'
Vue.component('myLoading',loading)

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
