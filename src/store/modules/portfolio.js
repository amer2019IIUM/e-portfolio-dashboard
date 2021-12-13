
const state = {
    homeSecData: null,
    aboutSecData: null,
    skillSecData: [],
    experienceSecData: [],
    educationSecData: null,
    projectSecData: null,
    interestSecData: null,
};

const getters = {
    homeSecData: state => state.homeSecData,
    aboutSecData: state => state.aboutSecData,
    skillSecData: state => state.skillSecData,
    experienceSecData: state => state.experienceSecData,
    educationSecData: state => state.educationSecData,
    projectSecData: state => state.projectSecData,
    interestSecData: state => state.interestSecData,
};

const actions = {
    async getHomeData({ commit }, data) {
        await commit('GET_HOME_DATA', data);
    },
    async getAboutData({ commit }, data) {
        await commit('GET_ABOUT_DATA', data);
    },
    async getSkillData({ commit }, data) {
        await commit('GET_SKILL_DATA', data);
    },
    async getExperienceData({ commit }, data) {
        await commit('GET_EXPERIENCE_DATA', data);
    },
    async getEducationData({ commit }, data) {
        await commit('GET_EDUCATION_DATA', data);
    },
    async getProjectData({ commit }, data) {
        await commit('GET_PROJECT_DATA', data);
    },
    async getInterestData({ commit }, data) {
        await commit('GET_INTEREST_DATA', data);
    },
};
const mutations = {
    GET_HOME_DATA(state, payload) {
        state.homeSecData = payload
    },
    GET_ABOUT_DATA(state, payload) {
        state.aboutSecData = payload
    },
    GET_SKILL_DATA(state, payload) {
        state.skillSecData = payload
    },
    GET_EXPERIENCE_DATA(state, payload) {
        state.experienceSecData = payload
    },
    GET_EDUCATION_DATA(state, payload) {
        state.educationSecData = payload
    },
    GET_PROJECT_DATA(state, payload) {
        state.projectSecData = payload
    },
    GET_INTEREST_DATA(state, payload) {
        state.interestSecData = payload
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
}