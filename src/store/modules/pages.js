import pagesApi from '../../API/Pages'

const state = {
    pagesreq : 0,
    pagesdata : [],
};

const getters = {
    getpagesrequest : (state) => state.pagesreq,
    getpagesdata: (state) => state.pagesdata,
    getsinglepagedata:(state) => (pageslug) => {
        return state.pagesdata.find( pagedata => pagedata.page_slug === pageslug )
    },
};

const actions = {
    async setpagesrequest({commit},req){
        commit('SETPAGESREQUEST',req.status);
    },
    async setpagesdata({commit}){
        pagesApi.getpagesData(result => {
            console.log(result);
            commit('SETPAGES',result.data.pages);
            commit('SETPAGESREQUEST',1);
        });
    },
};

const mutations = {
    SETPAGESREQUEST:(state,payload)=> (state.pagesreq = payload),
    SETPAGES:(state,payload)=> (state.pagesdata = payload),
};

export default {
    state,
    getters,
    actions,
    mutations
}