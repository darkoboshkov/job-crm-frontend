import { ls, STORAGE_KEY } from "../plugins";

let syncedData = {
  user: {
    _id: null,
    email: null,
    firstName: null,
    middleName: null,
    lastName: null,
    role: null,
    companyId: null,
    verified: false,
    image: null,
    companyType: null
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
  ...syncedData.user
};

export const getters = {};

export const mutations = {
  UPDATE_ID(state, payload) {
    state._id = payload;
  },
  UPDATE_EMAIL(state, payload) {
    state.email = payload;
  },
  UPDATE_FIRST_NAME(state, payload) {
    state.firstName = payload;
  },
  UPDATE_MIDDLE_NAME(state, payload) {
    state.middleName = payload;
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
    state._id = user._id ? user._id : null;
    state.email = user.email ? user.email : null;
    state.firstName = user.firstName ? user.firstName : null;
    state.middleName = user.middleName ? user.middleName : null;
    state.lastName = user.lastName ? user.lastName : null;
    state.role = user.role ? user.role : null;
    state.verified = user.verified ? user.verified : false;
    state.companyId = user.companyId ? user.companyId : null;
    state.image = user.image ? user.image : null;
    state.companyType = user.companyType ? user.companyType : null;
  }
};

export const actions = {
  updateId({ commit }, payload) {
    commit("UPDATE_ID", payload);
  },
  updateEmail({ commit }, payload) {
    commit("UPDATE_EMAIL", payload);
  },
  updateFirstName({ commit }, payload) {
    commit("UPDATE_FIRST_NAME", payload);
  },
  updateMiddleName({ commit }, payload) {
    commit("UPDATE_MIDDLE_NAME", payload);
  },
  updateLastName({ commit }, payload) {
    commit("UPDATE_LAST_NAME", payload);
  },
  updateRole({ commit }, payload) {
    commit("UPDATE_ROLE", payload);
  },
  updateVerified({ commit }, payload) {
    commit("UPDATE_VERIFIED", payload);
  },
  updateUserInfo({ commit }, payload) {
    commit("UPDATE_USER_INFO", payload);
  }
};
