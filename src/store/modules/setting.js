import SettingApi from '../../API/Setting'

const state = {
    settingreq : 0,
    settingdata : [],
};

const getters = {
    getsettingrequest : (state) => state.settingreq,
    getsettingdata: (state) => state.settingdata,
};

const actions = {
    async setsettingrequest({commit},req){
        commit('SETCOMPANYREQUEST',req.status);
    },
    async setsettingdata({commit}){
        SettingApi.getSettingData(result => {
            commit('SETSETTING',result.data.setting);
            commit('SETSETTINGREQUEST',1);
        });
    },
};

const mutations = {
    SETSETTINGREQUEST:(state,payload)=> (state.settingreq = payload),
    SETSETTING:(state,payload)=> (state.settingdata = payload),
};

export default {
    state,
    getters,
    actions,
    mutations
}