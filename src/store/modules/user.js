
const state = {
    useremail: localStorage.getItem('useremail'),
    company_id: localStorage.getItem('companyid'),
    userid: localStorage.getItem('userid'),
};

const getters = {
    getuseremail : (state) => state.useremail,
    getcompanyid : (state) => state.company_id,
    getuserid : (state) => state.userid,
};

const actions = {
    changeuserdata({commit},user){
        commit('setuseremail',user.email_id);
        commit('setuserid',user.user_id);
        commit('setcompanyid',user.company_id);
    },
};

const mutations = {
    setuseremail:(state,payload) =>(state.useremail = payload),
    setuserid:(state,payload) =>(state.userid = payload),
    setcompanyid:(state,payload) =>(state.company_id = payload)
};

export default {
    state,
    getters,
    actions,
    mutations
}