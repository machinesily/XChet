import Vue from 'vue'
import App from './App'
// 引入全局组件
import TopBar from 'components/top-bar/TopBar.vue'
//引入socket模块
import io from 'components/socket/weapp.socket.io.js'
import {getStorages} from 'commons/js/getStorages.js'
import {request} from 'commons/js/request.js'

Vue.config.productionTip = false

// 注册全局组件
Vue.component('TopBar',TopBar)

//服务器地址 
Vue.prototype.serverUrl = 'http://192.168.0.101:3000'
//socket
Vue.prototype.socket = io('http://192.168.0.101:8082')

Vue.prototype.getStorages = getStorages

Vue.prototype.request = request



App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
