import productApi from '../../API/product'

const state = {
    productpagerequest : 0,
    product : [],
};

const getters = {
    getproductpagerequest : (state) => state.productpagerequest,
    getproductdata: (state) => state.product,
    getsingleproductdata:(state) => (productid) => {
        return state.product.find( productdata => productdata.product_id === productid )
    },
};

const actions = {
    async setproductrequest({commit},req){
        commit('SETPRODUCTREQUEST',req.status);
    },
    async setproductdata({commit},company){
        productApi.getProductData(company.id,result => {
            commit('SETPRODUCTDATA',result.data.product);
            // console.log(result.data.product);
            commit('SETPRODUCTREQUEST',1);
        });
    }
};

const mutations = {
    SETPRODUCTDATA:(state,payload)=> (state.product = payload),
    SETPRODUCTREQUEST:(state,payload)=> (state.productpagerequest = payload),
};

export default {
    state,
    getters,
    actions,
    mutations
}