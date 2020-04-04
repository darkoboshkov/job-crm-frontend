import { ls, STORAGE_KEY } from "../plugins";

let syncedData = {
  locale: {
    lang: "nl"
  }
};
if (ls.get(STORAGE_KEY)) {
  try {
    syncedData = ls.get(STORAGE_KEY);
  } catch (e) {
    console.log(e);
  }
}

export const state = {
  ...syncedData.locale
};

export const getters = {};

export const mutations = {
  UPDATE_LANG(state, lang) {
    state.lang = lang;
  }
};

export const actions = {
  updateLang({ commit }, payload) {
    commit("UPDATE_LANG", payload);
  }
};
