import Vue from 'vue'
import App from './App'
import store from './store'
// 引入MinRouter文件
import MinRouter from './MinRouter'
// 引入router文件
import minRouter from './router'

Vue.prototype.$store = store
Vue.config.productionTip = false

// 注册插件
Vue.use(MinRouter)

App.mpType = 'app'

const app = new Vue({
    ...App,
	minRouter,
	store
})
app.$mount()
