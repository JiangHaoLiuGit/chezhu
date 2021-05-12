import Vue from 'vue'
import App from './App'
import uView from './uview-ui';
Vue.use(uView);

// 注册全局组件 上拉下拉应用组件
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

//引入vuex
import store from './store'


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	//挂载vuex
	store
})
app.$mount()
//123