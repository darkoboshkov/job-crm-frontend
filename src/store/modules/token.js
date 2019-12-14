import { ls, STORAGE_KEY } from "../plugins";

let syncedData = {
    jwt: null,
    expiresIn: null,
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
    ...syncedData.token
};

export const getters = {};

export const mutations = {
    UPDATE_TOKEN(state, token) {
        state.jwt = token.jwt;
        state.expiresIn = token.expiresIn;
    },
};

export const actions = {
    updateToken({commit}, payload) {
        commit('UPDATE_TOKEN', payload)
    }
};

