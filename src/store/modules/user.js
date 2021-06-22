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
    admindash:[],
    admindashreq:0,

    companydash:[],
    companydashreq:0,

    userdataemail:localStorage.getItem('userdataemail'),


};

const getters = {
    getuseremail : (state) => state.useremail,
    getfirstname : (state) => state.firstname,
    // getcompanyid : (state) => state.company_id,
    getuserid : (state) => state.userid,

    getuserdataemail :(state) => state.userdataemail,

    getuserdata : (state) => state.userdata,
    getusertype : (state) => state.type,
    getuserreq: (state) => state.userpagereq,
    getadminid: (state) => state.adminid,

    getadmindash: (state) => state.admindash,
    getadmindashreq: (state) => state.admindashreq,

    getcompanydash: (state) => state.companydash,
    getcompanydashreq: (state) => state.companydashreq,


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

    setuserpagereq({commit},user){
        commit('setuserpagerequest',user.status);
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

    setadmindashdata({commit}){
        userApi.setadmindash(result => {
            commit('setadmindashdata',result.data);
            commit('setadmindashrequest',1);
        });
    },

    setadmindashreq({commit},req){
        commit('setadmindashrequest',req.status);
    },

    setcompanydashdata({commit},company){
        userApi.setcompanydash(company.user_id,result => {
            commit('setcompanydashdata',result.data);
            commit('setcompanydashrequest',1);
        });
    },

    setcompanydashreq({commit},req){
        commit('setcompanydashrequest',req.status);
    },

    setuserdataemail({commit},user){
        commit('SETUSERDATAEMAIL',user.userdataemail);
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
    
    setadmindashdata:(state,payload) =>(state.admindash = payload),
    setadmindashrequest:(state,payload) =>(state.admindashreq = payload),

    setcompanydashdata:(state,payload) =>(state.companydash = payload),
    setcompanydashrequest:(state,payload) =>(state.companydashreq = payload),

    SETUSERDATAEMAIL:(state,payload) =>(state.userdataemail = payload),

};

export default {
    state,
    getters,
    actions,
    mutations
}