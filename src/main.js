import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
import { $http } from '@escook/request-miniprogram'
import store from './store/store.js'

uni.$http = $http

// 请求的根路径
$http.baseUrl = "https://www.uinav.com"

$http.beforeRequest = function(option){
  uni.showLoading({
    title: '数据加载中...'
  })
}

$http.afterRequest = function(){
  uni.hideLoading()
}

// 封装弹窗的方法
uni.$showMsg = function(title = '数据请求失败！', duration = 1500){
  uni.showToast({
    title,
    duration,
    icon: "none"
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store,
})
app.$mount()
