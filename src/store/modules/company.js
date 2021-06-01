import CompanyApi from '../../API/Company'

const state = {
    companypagerequest : 0,
    company : [],
    companyid:0,
    cities:[],
    social:[],
    companyfront:[],
    paymentdata:0,
    paymentoptionsdata:[]
};

const getters = {
    getcompanypagerequest : (state) => state.companypagerequest,
    getcompanydata: (state) => state.company,
    getcompanyid : (state) => state.companyid,
    getsocialdata:(state) => state.social,
    getcitydata:(state) => state.cities,
    getcompanyfront:(state) => state.companyfront,
    getpaymentpage:(state) => state.paymentdata,
    getpaymentoptionsdata:(state) => state.paymentoptionsdata,
    };

const actions = {
    async setcompanyrequest({commit},req){
        commit('SETCOMPANYREQUEST',req.status);
    },
    async setcompanydata({commit},user){
        CompanyApi.getCompanyData(user.id,result => {
            commit('SETCOMPANYDATA',result.data);
            commit('SETCOMPANYREQUEST',1);
            commit('SETCOMPANYID',result.data.company[0].company_id);
        });
    },
    async setsocialdata({commit},user){
        CompanyApi.getsocialdata(user.id,result => {
            commit('SETSOCIAL',result.data.social);
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
        });
    },

    async setpaymentoptions({commit},user){
        CompanyApi.getpaymentdata(user.id,result => {
            commit('SETPAYMENTDATA',result.data.paymentdata);
            commit('SETPAYMENTREQUEST',1);
        });
    },

};

const mutations = {
    SETCOMPANYDATA:(state,payload)=> (state.company = payload),
    SETCOMPANYID:(state,payload)=> (state.companyid = payload),
    SETCOMPANYREQUEST:(state,payload)=> (state.companypagerequest = payload),
    SETCITIES:(state,payload)=> (state.cities = payload),
    SETSOCIAL:(state,payload)=> (state.social = payload),
    SETCOMPANYFRONT:(state,payload)=> (state.companyfront = payload),
    SETPAYMENTREQUEST:(state,payload)=> (state.paymentdata = payload),
    SETPAYMENTDATA:(state,payload)=> (state.paymentoptionsdata = payload),
};

export default {
    state,
    getters,
    actions,
    mutations
}