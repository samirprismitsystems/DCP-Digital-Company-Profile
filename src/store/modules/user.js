import userApi from '../../API/user'

const state = {
    useremail: localStorage.getItem('useremail'),
    // company_id: localStorage.getItem('companyid'),
    userid: localStorage.getItem('userid'),
    firstname: localStorage.getItem('first_name'),
    type: localStorage.getItem('usertype'),
    adminid: localStorage.getItem('admin_id'),
    userpagereq:0,
    userdata:[],
};

const getters = {
    getuseremail : (state) => state.useremail,
    getfirstname : (state) => state.firstname,
    // getcompanyid : (state) => state.company_id,
    getuserid : (state) => state.userid,
    getuserdata : (state) => state.userdata,
    getusertype : (state) => state.type,
    getuserreq: (state) => state.userpagereq,
    getadminid: (state) => state.adminid,

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

    setusertype({commit},user){
        commit('setusertype',user.user_type);
    },
    
    // setcompanyid({commit},user){
    //     commit('setcompanyid',user.company_id);
    // },

    setuserpagereq({commit}){
        commit('setuserpagerequest',1);
    },

    setuserdata({commit},user){
        userApi.getuserData(user.userid,result => {
            commit('setuserdata',result.data.userdata);
            commit('setuserpagerequest',1);
        });
    },

    setadminid({commit},user){
        commit('setadminid',user.admin_id);
    },

};

const mutations = {
    setuseremail:(state,payload) =>(state.useremail = payload),
    setuserid:(state,payload) =>(state.userid = payload),
    setfirstname:(state,payload) =>(state.firstname = payload),
    setusertype:(state,payload) =>(state.type = payload),
    // setcompanyid:(state,payload) =>(state.company_id = payload),
    setuserdata:(state,payload) =>(state.userdata = payload),
    setuserpagerequest:(state,payload) =>(state.userpagereq = payload),
    setadminid:(state,payload) =>(state.adminid = payload),
};

export default {
    state,
    getters,
    actions,
    mutations
}