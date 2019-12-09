import Vue from 'vue'
import VueI18n from 'vue-i18n'

import English from './languages/English.json'
import Dutch from './languages/Dutch.json'

Vue.use(VueI18n)
export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: English, // set locale messages
    nl: Dutch,
  }
})