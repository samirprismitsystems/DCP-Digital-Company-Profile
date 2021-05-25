import Vue from 'vue'
import VueRouter from 'vue-router'

import Front from './components/Front'

import Home from './components/Home'
import Login from './components/Login'

import Company from './components/Company'
import AddCompany from './components/AddCompany'
// import ListCompany from './components/ListCompany'

import Product from './components/Product'
import AddProduct from './components/AddProduct'
import EditProduct from './components/EditProduct'


import Service from './components/Service'
import AddService from './components/AddService'
import EditService from './components/EditService'

import Client from './components/Client'
import AddClient from './components/AddClient'
import EditClient from './components/EditClient'

import Portfolio from './components/Portfolio'
import AddPortfolio from './components/AddPortfolio'
import EditPortfolio from './components/EditPortfolio'

import Testimonial from './components/Testimonial'
import EditTestimonial from './components/EditTestimonial'

import Inquiry from './components/Inquiry'
import EditInquiry from './components/EditInquiry'

Vue.use(VueRouter);

const router = new VueRouter({
    mode:'history',
    routes:
    [
        {path:'/dashboard/login',component:Login, meta: {title:'Login'} },
        {path:'/dashboard',component:Home, meta: {title:'Home'} },
        {path:'/dashboard/company',component:Company,
        children:[
            {path:'/dashboard/company/addcompany',component:AddCompany, meta: {title:'Add Company'} },
            // {path:'/dashboard/company',component:ListCompany, meta: {title:'list Company'} },
        ],
        meta: {title:'Company'} },
        {path:'/dashboard/product',component:Product,
        children:[
            {path:'/dashboard/product/addproduct',component:AddProduct, meta: {title:'Add Product'} },
            {path:'/dashboard/product/editproduct/:pid',component:EditProduct, meta: {title:'Edit Product'} },
        ],
        meta: {title:'Product'} },

        {path:'/dashboard/service',component:Service,
        children:[
            {path:'/dashboard/service/addservice',component:AddService, meta: {title:'Add Service'} },
            {path:'/dashboard/service/editservice/:sid',component:EditService, meta: {title:'Edit Service'} },
        ],
        meta: {title:'Service'} },


        {path:'/dashboard/client',component:Client,
        children:[
            {path:'/dashboard/client/addclient',component:AddClient, meta: {title:'Add Client'} },
            {path:'/dashboard/client/editclient/:clientid',component:EditClient, meta: {title:'Edit Client'} },
        ],
        meta: {title:'Client'} },


        {path:'/dashboard/portfolio',component:Portfolio,
        children:[
            {path:'/dashboard/portfolio/addportfolio',component:AddPortfolio, meta: {title:'Add Portfolio'} },
            {path:'/dashboard/portfolio/editportfolio/:portfolioid',component:EditPortfolio, meta: {title:'Edit Portfolio'} },
        ],
        meta: {title:'Portfolio'} },
        
        {path:'/dashboard/testimonial',component:Testimonial,
        children:[
            {path:'/dashboard/testimonial/edittestimonial/:testimonialid',component:EditTestimonial, meta: {title:'Edit Testimonial'} },
        ],
        meta: {title:'Testimonial'} },

        {path:'/dashboard/inquiry',component:Inquiry,
        children:[
            {path:'/dashboard/inquiry/editinquiry/:inquiryid',component:EditInquiry, meta: {title:'Edit Inquiry'} },
        ],
        meta: {title:'Inquiry'} },
        

        {path:'/:companyid',component:Front, meta: {title:'Front'} },
    ]
});

router.beforeEach((to, from, next)=>{
    document.title = to.meta.title
    localStorage.setItem('sitetitle',to.meta.title);
    next()
})

export default router;