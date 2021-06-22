import Vue from 'vue'
import VueRouter from 'vue-router'

import LandingPage from './components/LandingPage'
import Front from './components/Front'


import Login from './components/Login'
import Registration from './components/Registration'
import ForgetPassword from './components/ForgetPassword'
import ChangePassword from './components/ChangePassword'
import ResetPassword from './components/ResetPassword'

import Home from './components/Home'
import SocialLinks from './components/SocialLinks'
import PaymentOptions from './components/PaymentOptions'
import Profile from './components/Profile'
import Company from './components/Company'
import Product from './components/Product'
import Service from './components/Service'
import Client from './components/Client'
import Portfolio from './components/Portfolio'
import Testimonial from './components/Testimonial'
import Inquiry from './components/Inquiry'

import Verify from './components/Verify'

import AdminDashboard from './components/AdminDashboard'
import AdminCompanyList from './components/AdminCompanyList'
import SocialMediaAdd from './components/SocialMediaAdd'
import Setting from './components/Setting'
import AdminPages from './components/AdminPages'
import AddPages from './components/AddPages'
import EditPages from './components/EditPages'
import AddAdminCompany from './components/AddAdminCompany'
import CustomPage from './components/CustomPage'
import UserReview from './components/UserReview'
import UserReviewAdd from './components/UserReviewAdd'
import UserReviewEdit from './components/UserReviewEdit'


Vue.use(VueRouter);

const router = new VueRouter({
    mode:'history',
    routes:
    [
        {path:'/login',component:Login, meta: {title:'Login' , isdash:false} },
        {path:'/registration',component:Registration, meta: {title:'Registration' , isdash:false} },
        {path:'/forgetpassword',component:ForgetPassword, meta: {title:'Forget Password' , isdash:false} },
        {path:'/resetpassword/:email',component:ResetPassword, meta: {title:'Reset Password' , isdash:false} },

        {path:'/dashboard/sociallinks',component:SocialLinks, meta: {title:'Social Links'} },
        {path:'/dashboard/paymentoptions',component:PaymentOptions, meta: {title:'Payment Options'} },
        {path:'/dashboard/changepassword',component:ChangePassword, meta: {title:'Change Password'} },
        {path:'/dashboard/profile',component:Profile, meta: {title:'Profile'} },
        {path:'/dashboard/verify/:emailid',component:Verify, meta: {title:'Verify' , isdash:false} },
        
        {path:'/dashboard',component:Home, meta: {title:'Home'} },
        {path:'/dashboard/company',component:Company,meta: {title:'Company'} },
        {path:'/dashboard/product',component:Product,meta: {title:'Product'} },
        {path:'/dashboard/service',component:Service,meta: {title:'Service'} },
        {path:'/dashboard/client',component:Client,meta: {title:'Client'} },
        {path:'/dashboard/portfolio',component:Portfolio,meta: {title:'Portfolio'} },
        {path:'/dashboard/testimonial',component:Testimonial,meta: {title:'Testimonial'} },
        {path:'/dashboard/enquiry',component:Inquiry,meta: {title:'Enquiry'} },

        {path:'/admindashboard/',component:AdminDashboard, meta: {title:'Admin Dashboard', isadmindash:true} },
        {path:'/admindashboard/companylist',component:AdminCompanyList, meta: {title:'Company List', isadmindash:true} },
        {path:'/admindashboard/socailmediaadd',component:SocialMediaAdd, meta: {title:'SocialMedia Add', isadmindash:true} },
        {path:'/admindashboard/setting',component:Setting, meta: {title:'Setting', isadmindash:true} },
        {path:'/admindashboard/pages',component:AdminPages, meta: {title:'Pages', isadmindash:true} },
        {path:'/admindashboard/addpages',component:AddPages, meta: {title:'Add Pages', isadmindash:true} },
        {path:'/admindashboard/editpage/:pageslug',component:EditPages, meta: {title:'Edit Pages', isadmindash:true} },
        {path:'/admindashboard/addcompany',component:AddAdminCompany, meta: {title:'Add Company', isadmindash:true} },
        {path:'/admindashboard/userreview',component:UserReview, meta: {title:'User Review', isadmindash:true} },
        {path:'/admindashboard/adduserreview',component:UserReviewAdd, meta: {title:'Add User Review', isadmindash:true} },
        {path:'/admindashboard/edituserreview/:rid',component:UserReviewEdit, meta: {title:'Edit User Review', isadmindash:true} },

        {path:'/:pageslug',component:CustomPage, meta: {title:'Page', ispage:true } },
        {path:'/:companyslug', name:'frontpage',  component:Front ,meta: {title:'Front' , isdash:false , isfront:true } },
        {path:'/',component:LandingPage, meta: {title:'Digital Company Profile' , isdash:false , islanding : true} },
        
    ]
});

router.beforeEach((to, from, next)=>{
    document.title = to.meta.title
    localStorage.setItem('sitetitle',to.meta.title);
    next()
})

export default router;