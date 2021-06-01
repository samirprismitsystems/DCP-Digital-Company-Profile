import Vue from 'vue'
import VueRouter from 'vue-router'

import LandingPage from './components/LandingPage'

import Front from './components/Front'

import Home from './components/Home'

import Login from './components/Login'
import Registration from './components/Registration'
import ForgetPassword from './components/ForgetPassword'
import ChangePassword from './components/ChangePassword'
import ResetPassword from './components/ResetPassword'

import SocialLinks from './components/SocialLinks'
import PaymentOptions from './components/PaymentOptions'

import Profile from './components/Profile'

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

import Verify from './components/Verify'

Vue.use(VueRouter);

const router = new VueRouter({
    mode:'history',
    routes:
    [

        {path:'/dashboard/login',component:Login, meta: {title:'Login' , isdash:false} },
        {path:'/dashboard/registration',component:Registration, meta: {title:'Registration' , isdash:false} },
        {path:'/dashboard/forgetpassword',component:ForgetPassword, meta: {title:'Forget Password' , isdash:false} },
        {path:'/dashboard/resetpassword/:email',component:ResetPassword, meta: {title:'Reset Password' , isdash:false} },

        {path:'/dashboard/sociallinks',component:SocialLinks, meta: {title:'Social Links'} },
        {path:'/dashboard/paymentoptions',component:PaymentOptions, meta: {title:'Payment Options'} },

        {path:'/dashboard/changepassword',component:ChangePassword, meta: {title:'Change Password'} },
        {path:'/dashboard/profile',component:Profile, meta: {title:'Profile'} },

        {path:'/dashboard/verify/:emailid',component:Verify, meta: {title:'Verify' , isdash:false} },

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
        
        {path:'/:companyslug',component:Front, meta: {title:'Front' , isdash:false , isfront:true } },
        {path:'/',component:LandingPage, meta: {title:'Digital Company Profile' , isdash:false , islanding : true} },
        
    ]
});

router.beforeEach((to, from, next)=>{
    document.title = to.meta.title
    localStorage.setItem('sitetitle',to.meta.title);
    next()
})

export default router;