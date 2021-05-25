import portfolioApi from '../../API/portfolio'

const state = {
    portfoliopagerequest : 0,
    portfolio : [],
};

const getters = {
    getportfoliopagerequest : (state) => state.portfoliopagerequest,
    getportfoliodata: (state) => state.portfolio,
    getsingleportfoliodata:(state) => (portfolioid) => {
        return state.portfolio.find( portfoliodata => portfoliodata.portfolio_id === portfolioid )
    },
};

const actions = {
    async setportfolioData({commit},company){
        portfolioApi.setportfolioData(company.id,result => {
            commit('SETPORTFOLIODATA',result.data.portfolio);
            commit('SETPORTFOLIOREQUEST',1);
        });
    }
};

const mutations = {
    SETPORTFOLIODATA:(state,payload)=> (state.portfolio = payload),
    SETPORTFOLIOREQUEST:(state,payload)=> (state.portfoliopagerequest = payload),
};

export default {
    state,
    getters,
    actions,
    mutations
}