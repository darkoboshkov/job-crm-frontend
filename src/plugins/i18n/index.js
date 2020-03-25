import Vue from "vue";
import VueI18n from "vue-i18n";

import English from "./languages/English.json";
import Dutch from "./languages/Dutch.json";

Vue.use(VueI18n);
export const i18n = new VueI18n({
  locale: "nl",
  fallbackLocale: "nl",
  messages: {
    en: English, // set locale messages
    nl: Dutch
  }
});
