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
  loading: false,

  showErrorModal: false,
  errorModalTitle: "",
  errorModalSubTitle: "",
  errorModalButton: "",
  errorModalOnButtonClick: "",

  showSuccessModal: false,
  successModalTitle: "",
  successModalSubTitle: "",
  successModalButton: "",
  successModalOnButtonClick: ""
};

const mutations = {
  UPDATE_LOADING(state, payload) {
    state.loading = payload;
  },
  UPDATE_SHOW_ERROR_MODAL(state, payload) {
    state.showErrorModal = payload;
  },
  UPDATE_ERROR_MODAL_TITLE(state, payload) {
    state.errorModalTitle = payload;
  },
  UPDATE_ERROR_MODAL_SUB_TITLE(state, payload) {
    state.errorModalSubTitle = payload;
  },
  UPDATE_ERROR_MODAL_BUTTON(state, payload) {
    state.errorModalButton = payload;
  },
  UPDATE_ERROR_MODAL_ON_BUTTON_CLICK(state, payload) {
    state.errorModalOnButtonClick = payload;
  },
  UPDATE_SHOW_SUCCESS_MODAL(state, payload) {
    state.showSuccessModal = payload;
  },
  UPDATE_SUCCESS_MODAL_TITLE(state, payload) {
    state.successModalTitle = payload;
  },
  UPDATE_SUCCESS_MODAL_SUB_TITLE(state, payload) {
    state.successModalSubTitle = payload;
  },
  UPDATE_SUCCESS_MODAL_BUTTON(state, payload) {
    state.successModalButton = payload;
  },
  UPDATE_SUCCESS_MODAL_ON_BUTTON_CLICK(state, payload) {
    state.successModalOnButtonClick = payload;
  }
};

export const actions = {
  updateLoading({ commit }, payload) {
    commit("UPDATE_LOADING", payload);
  },
  updateShowErrorModal({ commit }, payload) {
    commit("UPDATE_SHOW_ERROR_MODAL", !!payload);
  },
  updateErrorModalContent({ commit }, payload) {
    commit("UPDATE_ERROR_MODAL_TITLE", payload.title);
    commit("UPDATE_ERROR_MODAL_SUB_TITLE", payload.subTitle);
    commit("UPDATE_ERROR_MODAL_BUTTON", payload.button);
    commit("UPDATE_ERROR_MODAL_ON_BUTTON_CLICK", payload.onButtonClick);
  },
  updateShowSuccessModal({ commit }, payload) {
    commit("UPDATE_SHOW_SUCCESS_MODAL", !!payload);
  },
  updateSuccessModalContent({ commit }, payload) {
    commit("UPDATE_SUCCESS_MODAL_TITLE", payload.title);
    commit("UPDATE_SUCCESS_MODAL_SUB_TITLE", payload.subTitle);
    commit("UPDATE_SUCCESS_MODAL_BUTTON", payload.button);
    commit("UPDATE_SUCCESS_MODAL_ON_BUTTON_CLICK", payload.onButtonClick);
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
  plugins
});
