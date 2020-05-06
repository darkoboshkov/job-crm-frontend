import Vue from "vue";
import VueI18n from "vue-i18n";
import English from "./languages/English.json";
import Dutch from "./languages/Dutch.json";
import store from "../../store";

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: store.state?.locale?.lang,
  fallbackLocale: "nl",
  messages: {
    en: English, // set locale messages
    nl: Dutch
  }
});
