import Vue from 'vue'
import Vuex from 'vuex'
import plugins from './plugins.js'
import {ls, STORAGE_KEY} from './plugins.js'

Vue.use(Vuex)

export const state = {
    token: ''
};

export const getters = {};

export const mutations = {
    UPDATE_TOKEN(state, payload) {
        state.token = payload;
    },
};

export const actions = {
    updateToken({commit}, payload) {
        commit('UPDATE_TOKEN', payload)
    }
};

// Load store modules dynamically.
const requireContext = require.context('./modules', false, /.*\.js$/);

const modules = requireContext.keys()
    .map(file =>
        [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]
    )
    .reduce((modules, [name, module]) => {
        if (module.namespaced === undefined) {
            module.namespaced = true
        }

        return {...modules, [name]: module}
    }, {})

let syncedData = {
    token: ''
}

// Sync with local storage.
if (ls.get(STORAGE_KEY)) {
    try {
        syncedData = ls.get(STORAGE_KEY)
    } catch (e) {
    }
}

state.token = syncedData.token

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules,
    plugins
})