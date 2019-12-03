import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import '@/assets/fonts/Apercu/Apercu.css'
import '@/assets/fonts/icomoon/style.css'
import '@/assets/scss/app.scss'

window.axios = axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
