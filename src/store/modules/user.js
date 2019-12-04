export const state = {
  email: '',
  firstName: '',
  lastName: '',
  role: '',
  verificationCode: '',
  verificationExpires: '',
  verified: '',
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
  UPDATE_VERIFICATION_CODE(state, payload) {
    state.verificationCode = payload;
  },
  UPDATE_VERIFICATION_EXPIRES(state, payload) {
    state.verificationExpires = payload;
  },
  UPDATE_VERIFIED(state, payload) {
    state.verified = payload;
  },
};

export const actions = {
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
  updateVerificationCode({commit}, payload) {
    commit('UPDATE_VERIFICATION_CODE', payload)
  },
  updateVerificationExpires({commit}, payload) {
    commit('UPDATE_VERIFICATION_EXPIRES', payload)
  },
  updateVerified({commit}, payload) {
    commit('UPDATE_VERIFIED', payload)
  },
};