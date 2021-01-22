import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

//服务器地址 
Vue.prototype.serverUrl = 'http://192.168.0.106:3000'

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
