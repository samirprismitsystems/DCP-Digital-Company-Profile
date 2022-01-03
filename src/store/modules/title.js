
const state = {
    sitetitle: localStorage.getItem('sitetitle'),
};

const getters = {
    getsitetitle : (state) => state.sitetitle
};

const actions = {
    changetitle({commit},title){
        commit('settitle',title.title);
    }
};

const mutations = {
    settitle:(state,payload) =>(state.sitetitle = payload)
};

export default {
    state,
    getters,
    actions,
    mutations
}