import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 引入vuex
import store from './pages/store/store.js'
Vue.prototype.$store = store

// 引入loading
import homeload from './common/components/homeload/homeload.vue'
Vue.component('homeload',homeload)
// 引入loading
import loading from './common/components/loading/loading.vue'
Vue.component('myLoading',loading)
// 没有数据的提示组件
import nodata from './common/components/nodata/nodata.vue'
Vue.component('none-data',nodata)
// 引入动画css
import animated from 'animate.css'
Vue.use(animated)

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
