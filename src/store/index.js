import Vue from 'vue'
import Vuex from 'vuex'

import title from './modules/title'
import company from './modules/company'
import product from './modules/product'
import service from './modules/service'
import client from './modules/client'
import portfolio from './modules/portfolio'
import testimonial from './modules/testimonial'
import inquiry from './modules/inquiry'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        title,
        company,
        product,
        service,
        client,
        portfolio,
        testimonial,
        inquiry
    }
});