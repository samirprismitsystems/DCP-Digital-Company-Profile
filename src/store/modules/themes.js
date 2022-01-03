import themesApi from '../../API/themes'

const state = {
    themespagerequest : 0,
    themes : [],
};

const getters = {
    getthemespagerequest : (state) => state.themespagerequest,
    getthemesdata: (state) => state.themes
    // getsinglethemesdata:(state) => (clientid) => {
    //     return state.client.find( clientdata => clientdata.client_id === clientid )
    // },
};

const actions = {
    async setthemesrequest({commit},req){
        commit('SETTHEMESREQUEST',req.status);
    },
    async setthemesData({commit}){
        themesApi.getthemesData(result => {
            commit('SETTHEMESDATA',result.data.theme);
            commit('SETTHEMESREQUEST',1);
        });
    }
};

const mutations = {
    SETTHEMESDATA:(state,payload)=> (state.themes = payload),
    SETTHEMESREQUEST:(state,payload)=> (state.themespagerequest = payload),
};

export default {
    state,
    getters,
    actions,
    mutations
}