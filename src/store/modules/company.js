import CompanyApi from '../../API/Company'

const state = {
    companypagerequest : 0,
    company : [],
    companyid:0,
    cities:[],
    social:[],
    
    companyfront:[],
    companyfrontreq:0,

    paymentdata:0,
    paymentoptionsdata:[],
    allcompany:[],
    allcompanyreq:0,
    allsocialreq:0,
    allsocialdata:[],

    socialcolorreq:0,
    socialcolors:[],

    area:[],

    states:[],
    statereq:0,
};

const getters = {
    getcompanypagerequest : (state) => state.companypagerequest,
    getcompanydata: (state) => state.company,
    getcompanyid : (state) => state.companyid,
    getsocialdata:(state) => state.social,
    getcitydata:(state) => state.cities,

    getcompanyfront:(state) => state.companyfront,
    getcompanyfrontreq:(state) => state.companyfrontreq,

    getpaymentpage:(state) => state.paymentdata,
    getpaymentoptionsdata:(state) => state.paymentoptionsdata,
    getallcompanydata:(state) => state.allcompany,
    getallcompanyreq:(state) => state.allcompanyreq,
    getallsocialreq:(state) => state.allsocialreq,
    getallsocialdata:(state) => state.allsocialdata,
    getcompanylist:(state) => (page) => {
        return state.allcompany.slice( ((2*page) - 2) ,page*2)
    },

    getsocialcolors:(state) => state.socialcolors,
    getsocialcolorsreq:(state) => state.socialcolorreq,

    getareadata:(state) => state.area,


    getstatesdata:(state) => state.states,
    getstatesreq:(state) => state.statereq,

    };

const actions = {
    async setcompanyrequest({commit},req){
        commit('SETCOMPANYREQUEST',req.status);
    },
    async setcompanydata({commit},user){
        CompanyApi.getCompanyData(user.id,result => {
            commit('SETCOMPANYDATA',result.data);
            // commit('SETCOMPANYREQUEST',1);
            // console.log(result.data.company[0]);
            if(result.data.company[0] != null && result.data.company[0] != ''){
                commit('SETCOMPANYID',result.data.company[0].company_id);
            }
        });

        CompanyApi.getareadata(result => {
            commit('SETAREADATA',result.data);
            commit('SETCOMPANYREQUEST',1);
        });

    },
    
    async setsocialdata({commit},user){
        CompanyApi.getsocialdata(user.id,result => {
            commit('SETSOCIAL',result.data.social);
        });
    },

    async setsocialcolordata({commit}){
        CompanyApi.getsocialcolordata(result => {
            commit('SETSOCIALCOLOR',result.data.socialcolor);
            commit('SETSOCIALCOLORREQ',1);
        });
    },
    
    async setcitiesdata({commit}){
        CompanyApi.getcitiesdata(result => {
            commit('SETCITIES',result.data.cities);
        });
    },

    async setcompanyfront({commit},slug){
        CompanyApi.getcompanyfront(slug.slug,result => {
            commit('SETCOMPANYFRONT',result.data);
            commit('SETCOMPANYFRONTREQUEST',1);
        });
    },

    async setpaymentoptions({commit},user){
        CompanyApi.getpaymentdata(user.id,result => {
            commit('SETPAYMENTDATA',result.data.paymentdata);
            commit('SETPAYMENTREQUEST',1);
        });
    },


    async setallcompanydata({commit}){
        CompanyApi.getallcompanydata(result => {
            commit('AllCOMPANYDATA',result.data.company);
            commit('SETALLCOMPANYREQUEST',1);
        });
    },


    async setallsocialdata({commit}){
        CompanyApi.getallsocialdata(result => {
            commit('SETALLSOCIAL',result.data.social);
            commit('SETALLSOCIALREQUEST',1);
        });
    },


    async setstatesdata({commit},states){
        commit('SETSTATESDATA',states.states);
        commit('SETSTATESREQUEST',1);
    },


};

const mutations = {
    SETCOMPANYDATA:(state,payload)=> (state.company = payload),
    SETCOMPANYID:(state,payload)=> (state.companyid = payload),
    SETCOMPANYREQUEST:(state,payload)=> (state.companypagerequest = payload),
    SETCITIES:(state,payload)=> (state.cities = payload),
    SETSOCIAL:(state,payload)=> (state.social = payload),
    SETCOMPANYFRONT:(state,payload)=> (state.companyfront = payload),
    SETCOMPANYFRONTREQUEST:(state,payload)=> (state.companyfrontreq = payload),
    SETPAYMENTREQUEST:(state,payload)=> (state.paymentdata = payload),
    SETPAYMENTDATA:(state,payload)=> (state.paymentoptionsdata = payload),
    AllCOMPANYDATA:(state,payload)=> (state.allcompany = payload),
    SETALLCOMPANYREQUEST:(state,payload)=> (state.allcompanyreq = payload),
    SETALLSOCIAL:(state,payload)=> (state.allsocialdata = payload),
    SETALLSOCIALREQUEST:(state,payload)=> (state.allsocialreq = payload),
    SETSOCIALCOLOR:(state,payload)=> (state.socialcolors = payload),
    SETSOCIALCOLORREQ:(state,payload)=> (state.socialcolorreq = payload),
    SETAREADATA:(state,payload)=> (state.area = payload),

    SETSTATESREQUEST:(state,payload)=> (state.statereq = payload),
    SETSTATESDATA:(state,payload)=> (state.states = payload),

};

export default {
    state,
    getters,
    actions,
    mutations
}