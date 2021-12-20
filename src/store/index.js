import Vue from 'vue';
import Vuex from 'vuex';
import Portfolio from './modules/portfolio.js'
import Attachment from './modules/attachment.js'
import Auth from './Auth'

Vue.use(Vuex);

// const debug = process.env.NODE_ENV !== 'production'
export const strict = false

export default new Vuex.Store({
    state: {
        auth: true
    },
    mutations: {},
    actions: {},
    modules: {
        Portfolio, Attachment, Auth
    },
    // strict: debug,
})


