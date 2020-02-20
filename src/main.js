import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueAxios from "vue-axios";
import axios from "./axios";
import BootstrapVue from "bootstrap-vue";
import VueGoodTablePlugin from "vue-good-table";
// import the styles
import "vue-good-table/dist/vue-good-table.css";
import "@/assets/fonts/Apercu/Apercu.css";
import "@/assets/fonts/icomoon/style.css";
import "@/assets/scss/app.scss";
import { i18n } from "@/plugins/i18n";
import * as lodash from "lodash";

window._ = lodash;
Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
Vue.use(VueGoodTablePlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
