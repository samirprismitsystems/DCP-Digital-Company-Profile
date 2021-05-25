import clientApi from '../../API/client'

const state = {
    clientpagerequest : 0,
    client : [],
};

const getters = {
    getclientpagerequest : (state) => state.clientpagerequest,
    getclientdata: (state) => state.client,
    getsingleclientdata:(state) => (clientid) => {
        return state.client.find( clientdata => clientdata.client_id === clientid )
    },
};

const actions = {
    async setClientData({commit},company){
        clientApi.getclientData(company.id,result => {
            commit('SETCLIENTDATA',result.data.client);
            commit('SETCLIENTREQUEST',1);
        });
    }
};

const mutations = {
    SETCLIENTDATA:(state,payload)=> (state.client = payload),
    SETCLIENTREQUEST:(state,payload)=> (state.clientpagerequest = payload),
};

export default {
    state,
    getters,
    actions,
    mutations
}