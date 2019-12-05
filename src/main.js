import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import '@/assets/fonts/Apercu/Apercu.css'
import '@/assets/fonts/icomoon/style.css'
import '@/assets/scss/app.scss'
import { i18n } from '@/plugins/i18n'

window.axios = axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
