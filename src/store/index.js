import Vue from "vue";
import Vuex from "vuex";
import plugins from "./plugins.js";

Vue.use(Vuex);

// Load store modules dynamically.
const requireContext = require.context("./modules", false, /.*\.js$/);

const modules = requireContext
  .keys()
  .map(file => [file.replace(/(^.\/)|(\.js$)/g, ""), requireContext(file)])
  .reduce((modules, [name, module]) => {
    if (module.namespaced === undefined) {
      module.namespaced = true;
    }
    return { ...modules, [name]: module };
  }, {});

const state = {
  loading: false
};

const mutations = {
  UPDATE_LOADING(state, payload) {
    state.loading = payload;
  }
};

export const actions = {
  updateLoading({ commit }, payload) {
    commit("UPDATE_LOADING", payload);
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
  plugins
});
