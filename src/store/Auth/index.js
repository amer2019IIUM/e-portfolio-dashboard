
const state = {
    authStatus: false,
    authenticatedUserId: null,
    token: localStorage.getItem("apollo-token") || null
};

const getters = {
    authenticatedUserId: state => state.authenticatedUserId,
    authStatus: state => state.authStatus,
};

const actions = {
    async login({ commit }, token) {
        commit('LOGIN', token);
        await localStorage.setItem('apollo-token', "Bearer " + token)
        window.location.reload()
    },
    async currentUser({ commit }, userData) {
        await commit('CURRENT_USER', userData);
        if (userData) {
            commit('IS_AUTH');
            await localStorage.setItem('authStatus', true)
        }
        else {
            await localStorage.setItem('authStatus', false)

        }
    },

    logout({ commit }) {
        commit('LOGOUT');
        localStorage.clear()
        sessionStorage.clear()
        localStorage.setItem('user', false)
        window.location.reload()
    }
};
const mutations = {
    CURRENT_USER(state, payload) {
        state.authenticatedUserId = payload;
    },
    IS_AUTH(state,) {
        state.authStatus = true
    },

    LOGIN(state, payload) {
        state.token = payload;
    },

    LOGOUT(state) {
        state.user = {};
        state.authenticatedUserId = null;
        state.token = null;
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
}