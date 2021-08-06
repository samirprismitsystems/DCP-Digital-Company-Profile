import Vue from 'vue'
import VueRouter from 'vue-router'

const LandingPage = () => import(/* webpackChunkName: "landingpage" */ /* webpackPrefetch: true */ './components/LandingPage.vue');

const Front = () => import(/* webpackChunkName: "front" */ /* webpackPrefetch: true */'./components/Front.vue');

const Login = () => import(/* webpackChunkName: "user" */ /* webpackPrefetch: true */'./components/Login.vue');
const Registration = () => import(/* webpackChunkName: "user" */ /* webpackPrefetch: true */'./components/Registration.vue');
const ForgetPassword = () => import(/* webpackChunkName: "user" */ /* webpackPrefetch: true */'./components/ForgetPassword.vue');
const ChangePassword = () => import(/* webpackChunkName: "user" */ /* webpackPrefetch: true */'./components/ChangePassword.vue');
const ResetPassword = () => import(/* webpackChunkName: "user" */ /* webpackPrefetch: true */'./components/ResetPassword.vue');

const Verify = () => import(/* webpackChunkName: "user" */ /* webpackPrefetch: true */'./components/Verify.vue');

// import LandingPage from './components/LandingPage'
// import Front from './components/Front'

// import Login from './components/Login'
// import Registration from './components/Registration'
// import ForgetPassword from './components/ForgetPassword'
// import ChangePassword from './components/ChangePassword'
// import ResetPassword from './components/ResetPassword'

const Home = () => import(/* webpackChunkName: "dashboard" */ /* webpackPrefetch: true */ './components/Home');
const SocialLinks = () => import(/* webpackChunkName: "dashboard" */ /* webpackPrefetch: true */ './components/SocialLinks');
const PaymentOptions = () => import(/* webpackChunkName: "dashboard" */ /* webpackPrefetch: true */ './components/PaymentOptions');
const Profile = () => import(/* webpackChunkName: "dashboard" */ /* webpackPrefetch: true */'./components/Profile');
const Company = () => import(/* webpackChunkName: "dashboard" */ /* webpackPrefetch: true */'./components/Company');
const Product = () => import(/* webpackChunkName: "dashboard" */ /* webpackPrefetch: true */'./components/Product');
const Service = () => import(/* webpackChunkName: "dashboard" */ /* webpackPrefetch: true */'./components/Service');
const Client = () => import(/* webpackChunkName: "dashboard" */ /* webpackPrefetch: true */'./components/Client');
const Portfolio = () => import(/* webpackChunkName: "dashboard" */ /* webpackPrefetch: true */'./components/Portfolio');
const Testimonial = () => import(/* webpackChunkName: "dashboard" */ /* webpackPrefetch: true */'./components/Testimonial');
const Inquiry = () => import(/* webpackChunkName: "dashboard" */ /* webpackPrefetch: true */'./components/Inquiry');



// import Home from './components/Home'
// import SocialLinks from './components/SocialLinks'
// import PaymentOptions from './components/PaymentOptions'
// import Profile from './components/Profile'
// import Company from './components/Company'
// import Product from './components/Product'
// import Service from './components/Service'
// import Client from './components/Client'
// import Portfolio from './components/Portfolio'
// import Testimonial from './components/Testimonial'
// import Inquiry from './components/Inquiry'

// import Verify from './components/Verify'


const AdminDashboard = () => import(/* webpackChunkName: "admindash" */ /* webpackPrefetch: true */ './components/AdminDashboard');
const AdminCompanyList = () => import(/* webpackChunkName: "admindash" */ /* webpackPrefetch: true */'./components/AdminCompanyList');
const SocialMediaAdd = () => import(/* webpackChunkName: "admindash" */ /* webpackPrefetch: true */'./components/SocialMediaAdd');
const Setting = () => import(/* webpackChunkName: "admindash" */ /* webpackPrefetch: true */'./components/Setting');
const AdminPages = () => import(/* webpackChunkName: "admindash" */ /* webpackPrefetch: true */'./components/AdminPages');
const AddPages = () => import(/* webpackChunkName: "admindash" */ /* webpackPrefetch: true */'./components/AddPages');
const EditPages = () => import(/* webpackChunkName: "admindash" */ /* webpackPrefetch: true */'./components/EditPages');
const AddAdminCompany = () => import(/* webpackChunkName: "admindash" */ /* webpackPrefetch: true */'./components/AddAdminCompany');
const CustomPage = () => import(/* webpackChunkName: "admindash" */ /* webpackPrefetch: true */'./components/CustomPage');
const UserReview = () => import(/* webpackChunkName: "admindash" */ /* webpackPrefetch: true */'./components/UserReview');
const UserReviewAdd = () => import( /* webpackChunkName: "admindash" */ /* webpackPrefetch: true */'./components/UserReviewAdd');
const UserReviewEdit = () => import(/* webpackChunkName: "admindash" */ /* webpackPrefetch: true */'./components/UserReviewEdit');
const SocialMediaColors = () => import(/* webpackChunkName: "admindash" */ /* webpackPrefetch: true */'./components/SocialMediaColors');


// import AdminDashboard from './components/AdminDashboard'
// import AdminCompanyList from './components/AdminCompanyList'
// import SocialMediaAdd from './components/SocialMediaAdd'
// import Setting from './components/Setting'
// import AdminPages from './components/AdminPages'
// import AddPages from './components/AddPages'
// import EditPages from './components/EditPages'
// import AddAdminCompany from './components/AddAdminCompany'
// import CustomPage from './components/CustomPage'
// import UserReview from './components/UserReview'
// import UserReviewAdd from './components/UserReviewAdd'
// import UserReviewEdit from './components/UserReviewEdit'
// import SocialMediaColors from './components/SocialMediaColors'

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
        {path:'/admindashboard/addsocialcolors',component:SocialMediaColors, meta: {title:'Add Social Media Colors', isadmindash:true} },

        {path:'/:companyslug', name:'frontpage',  component:Front ,meta: {title:'Front' , isdash:false , isfront:true } },
        {path:'/:pageslug', name:'custompage' ,component:CustomPage, meta: {title:'Page', ispage:true } },
        {path:'/',component:LandingPage, meta: {title:'Digital Company Profile' , isdash:false , islanding : true} },   
    ]
});

router.beforeEach((to, from, next)=>{
    document.title = to.meta.title
    localStorage.setItem('sitetitle',to.meta.title);
    next()
})

export default router;