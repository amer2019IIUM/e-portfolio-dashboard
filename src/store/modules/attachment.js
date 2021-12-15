
const state = {
    projectPhotos: [],
    profilePhoto: "",
};

const getters = {
    projectPhotos: state => state.projectPhotos,
    profilePhoto: state => state.profilePhoto,
};

const actions = {
    async getProjectPhotos({ commit }, data) {
        await commit('GET_PROJECT_PHOTOS_DATA', data);
    },
    async getProfilephoto({ commit }, data) {
        await commit('GET_PROFILE_PHOTO_DATA', data);
    },

};
const mutations = {
    GET_PROJECT_PHOTOS_DATA(state, payload) {
        state.projectPhotos = payload
    },
    GET_PROFILE_PHOTO_DATA(state, payload) {
        state.profilePhoto = payload
    },

};

export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
}