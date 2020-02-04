import { ls, STORAGE_KEY } from "../plugins";

let syncedData = {
  jwt: null,
  expiresIn: null
};
if (ls.get(STORAGE_KEY)) {
  try {
    syncedData = ls.get(STORAGE_KEY);
  } catch (e) {
    console.log(e);
  }
}

export const state = {
  ...syncedData.token
};

export const getters = {};

export const mutations = {
  UPDATE_TOKEN(state, token) {
    state.jwt = token.jwt;
    state.expiresIn = token.expiresIn;
  },
  REMOVE_TOKEN(state) {
    state.jwt = null;
    state.expiresIn = null;
  }
};

export const actions = {
  updateToken({ commit }, payload) {
    commit("UPDATE_TOKEN", payload);
  },
  removeToken({ commit }) {
    commit("REMOVE_TOKEN");
  }
};
