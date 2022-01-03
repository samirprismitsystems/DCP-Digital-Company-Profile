import UserReviewApi from '../../API/Userreview'

const state = {
    userreviewrequest : 0,
    userreview : [],
};

const getters = {
    getuserreviewrequest : (state) => state.userreviewrequest,
    getuserreviewdata: (state) => state.userreview,
    getuserreviewlist:(state) => (page) => {
        return state.userreview.slice( ((2*page) - 2) ,page*2)
    },
    getsinglereview:(state) => (rid) => {
        return state.userreview.find( reviewdata => reviewdata.review_id === rid )
    },
    };

const actions = {
    async setuserreviewrequest({commit},req){
        commit('SETUSERREVIEWREQUEST',req.status);
    },
   
    async setuserreviewdata({commit},data){
        UserReviewApi.getuserreviewdata(data.data,result => {
            commit('SETUSERREVIEWDATA',result.data.review);
            commit('SETUSERREVIEWREQUEST',1);
        });
    },


};

const mutations = {
    SETUSERREVIEWDATA:(state,payload)=> (state.userreview = payload),
    SETUSERREVIEWREQUEST:(state,payload)=> (state.userreviewrequest = payload),
};

export default {
    state,
    getters,
    actions,
    mutations
}