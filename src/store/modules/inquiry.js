import inquiryApi from '../../API/inquiry'

const state = {
    inquirypagerequest : 0,
    inquiry : [],
};

const getters = {
    getinquirypagerequest : (state) => state.inquirypagerequest,
    getinquirydata: (state) => state.inquiry,
    getsingleinquirydata:(state) => (inquiryid) => {
        return state.inquiry.find( inquirydata => inquirydata.inquiry_id === inquiryid )
    },
    getinquirypage:(state) => (page) => {
        return state.inquiry.slice( ((2*page) - 2) ,page*2)
    },
};

const actions = {
    async setinquiryrequest({commit},req){
        commit('SETINQUIRYREQUEST',req.status);
    },
    async setinquiryData({commit},company){
        inquiryApi.getinquiryData(company.id,result => {
            commit('SETINQUIRYDATA',result.data.inquiry);
            commit('SETINQUIRYREQUEST',1);
        });
    }
};

const mutations = {
    SETINQUIRYDATA:(state,payload)=> (state.inquiry = payload),
    SETINQUIRYREQUEST:(state,payload)=> (state.inquirypagerequest = payload),
};

export default {
    state,
    getters,
    actions,
    mutations
}