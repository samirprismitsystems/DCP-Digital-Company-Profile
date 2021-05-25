import serviceApi from '../../API/service'

const state = {
    servicepagerequest : 0,
    service : [],
};

const getters = {
    getservicepagerequest : (state) => state.servicepagerequest,
    getservicedata: (state) => state.service,
    getsingleservicedata:(state) => (serviceid) => {
        return state.service.find( servicedata => servicedata.service_id === serviceid )
    },
};

const actions = {
    async setservicedata({commit},company){
        serviceApi.getServiceData(company.id,result => {
            commit('SETSERVICEDATA',result.data.service);
            commit('SETSERVICEREQUEST',1);
        });
    }
};

const mutations = {
    SETSERVICEDATA:(state,payload)=> (state.service = payload),
    SETSERVICEREQUEST:(state,payload)=> (state.servicepagerequest = payload),
};

export default {
    state,
    getters,
    actions,
    mutations
}