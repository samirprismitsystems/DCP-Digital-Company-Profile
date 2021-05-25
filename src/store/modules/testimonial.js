import testimonialApi from '../../API/testimonial'

const state = {
    testimonialpagerequest : 0,
    testimonial : [],
};

const getters = {
    gettestimonialpagerequest : (state) => state.testimonialpagerequest,
    gettestimonialdata: (state) => state.testimonial,
    getsingletestimonialdata:(state) => (testimonialid) => {
        return state.testimonial.find( testimonialdata => testimonialdata.testimonial_id === testimonialid )
    },
};

const actions = {
    async settestimonialData({commit},company){
        testimonialApi.gettestimonialData(company.id,result => {
            commit('SETTESTIMONIALDATA',result.data.testimonial);
            commit('SETTESTIMONIALREQUEST',1);
        });
    }
};

const mutations = {
    SETTESTIMONIALDATA:(state,payload)=> (state.testimonial = payload),
    SETTESTIMONIALREQUEST:(state,payload)=> (state.testimonialpagerequest = payload),
};

export default {
    state,
    getters,
    actions,
    mutations
}