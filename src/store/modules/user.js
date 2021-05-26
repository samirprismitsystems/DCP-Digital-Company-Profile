import userApi from '../../API/user'

const state = {
    useremail: localStorage.getItem('useremail'),
    company_id: localStorage.getItem('companyid'),
    userid: localStorage.getItem('userid'),
    firstname: localStorage.getItem('first_name'),
    userdata:[]
};

const getters = {
    getuseremail : (state) => state.useremail,
    getfirstname : (state) => state.firstname,
    getcompanyid : (state) => state.company_id,
    getuserid : (state) => state.userid,
    getuserdata : (state) => state.userdata,
};

const actions = {
    setuseremail({commit},user){
        commit('setuseremail',user.emailid);
    },

    setuserid({commit},user){
        commit('setuserid',user.userid);
    },

    setfirstname({commit},user){
        commit('setfirstname',user.first_name);
    },
    
    setcompanyid({commit},user){
        commit('setcompanyid',user.companyid);
    },

    setuserdata({commit},user){
        userApi.getuserData(user.userid,result => {
            commit('setuserdata',result.data.userdata);
        });
    }

};

const mutations = {
    setuseremail:(state,payload) =>(state.useremail = payload),
    setuserid:(state,payload) =>(state.userid = payload),
    setfirstname:(state,payload) =>(state.firstname = payload),
    setcompanyid:(state,payload) =>(state.company_id = payload),
    setuserdata:(state,payload) =>(state.userdata = payload)
};

export default {
    state,
    getters,
    actions,
    mutations
}