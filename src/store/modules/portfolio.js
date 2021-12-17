
const state = {
    userSecData: null,
    profileSecData: null,
    skillSecData: [],
    experienceSecData: [],
    educationSecData: [],
    projectSecData: [],
    interestSecData: [],
};

const getters = {
    userSecData: state => state.userSecData,
    profileSecData: state => state.profileSecData,
    skillSecData: state => state.skillSecData,
    experienceSecData: state => state.experienceSecData,
    educationSecData: state => state.educationSecData,
    projectSecData: state => state.projectSecData,
    interestSecData: state => state.interestSecData,
};

const actions = {
    async getUserData({ commit }, data) {
        await commit('GET_USER_DATA', data);
    },
    async getProfileData({ commit }, data) {
        await commit('GET_PROFILE_DATA', data);
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
    GET_USER_DATA(state, payload) {
        state.userSecData = payload
    },
    GET_PROFILE_DATA(state, payload) {
        state.profileSecData = payload
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