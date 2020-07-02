import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/**
 * 👌👌👌👌👌👌
 * 取消vue的所有日志和警告⚠️  
 * 比如data和methods重名就不会报错 所以开发环境打开
 */
// console.log(Vue.config);
// console.log(Vue.config.optionMergeStrategies.data);
Vue.config.silent = false

/**
 * 👌👌👌👌👌👌👌
 * 设置为 false 以阻止 vue 在启动时生成生产提示
 * 开发可以为true 生产为false
 */
Vue.config.productionTip = false



/**
 * 😄😄👌👌👌👌👌
 * 自定义合并策略的选项 
 * 可以自定义的策略有： data created computed methods 等等很多
 */
Vue.config.optionMergeStrategies._my_option = function (parent, child, vm) {
  return child + 1
}
// Profile 是构造函数 有options属性
const Profile = Vue.extend({
  _my_option: 1
})

Profile.options._my_option  // 2

/**
 * 👌👌👌👌👌👌👌
 * 是否允许vue-devtools检查代码 开发环境为true 生产环境为false
 */
Vue.config.devtools = false


// Vue.config.errorHandler = function (err, vm, info) {
//   console.log(err, info)
// }

// Vue.config.warnHandler = function (msg, vm, trace) {
//   console.log(msg, trace);
// }



const app = new Vue({
  data: {
    optionMerge: "13"
  },
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

// app.$set( "optionMergeStrategies", Vue.config.optionMergeStrategies)
