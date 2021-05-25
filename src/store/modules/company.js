import CompanyApi from '../../API/Company'

const state = {
    companypagerequest : 0,
    company : [],
};

const getters = {
    getcompanypagerequest : (state) => state.companypagerequest,
    getcompanydata: (state) => state.company,
    };

const actions = {
    async setcompanydata({commit},user){
        CompanyApi.getCompanyData(user.id,result => {
            commit('SETCOMPANYDATA',result.data);
            commit('SETCOMPANYREQUEST',1);
        });
    }
};

const mutations = {
    SETCOMPANYDATA:(state,payload)=> (state.company = payload),
    SETCOMPANYREQUEST:(state,payload)=> (state.companypagerequest = payload),
};

export default {
    state,
    getters,
    actions,
    mutations
}