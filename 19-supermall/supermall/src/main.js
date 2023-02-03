import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue(); //通过Vue实例，注册一个型的事件总线，这样就只用通过此事件总线，传递组件信息，解决无关系组件传递数据

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
