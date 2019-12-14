import { ls, STORAGE_KEY } from "../plugins";

let syncedData = {
    email: null,
    firstName: null,
    lastName: null,
    role: null,
    verified: false
};

if (ls.get(STORAGE_KEY)) {
  try {
    syncedData = ls.get(STORAGE_KEY)
  } catch (e) {
    /* eslint-disable-next-line */
    console.log(e)
  }
}


export const state = {
  ...syncedData.user
};

export const getters = {};

export const mutations = {
  UPDATE_EMAIL(state, payload) {
    state.email = payload;
  },
  UPDATE_FIRST_NAME(state, payload) {
    state.firstName = payload;
  },
  UPDATE_LAST_NAME(state, payload) {
    state.lastName = payload;
  },
  UPDATE_ROLE(state, payload) {
    state.role = payload;
  },
  UPDATE_VERIFIED(state, payload) {
    state.verified = payload;
  },
  UPDATE_USER_INFO(state, user) {
    state.email = user.email ? user.email : null;
    state.firstName = user.firstName ? user.firstName : null;
    state.lastName = user.lastName ? user.lastName : null;
    state.role = user.role ? user.role : null;
    state.verified = user.verified ? user.verified : false;
  },
};

export const actions = {
  updateUserInfo({commit}, payload) {
    commit('UPDATE_USER_INFO', payload)
  },
  updateEmail({commit}, payload) {
    commit('UPDATE_EMAIL', payload)
  },
  updateFirstName({commit}, payload) {
    commit('UPDATE_FIRST_NAME', payload)
  },
  updateLastName({commit}, payload) {
    commit('UPDATE_LAST_NAME', payload)
  },
  updateRole({commit}, payload) {
    commit('UPDATE_ROLE', payload)
  },
  updateVerified({commit}, payload) {
    commit('UPDATE_VERIFIED', payload)
  },
};