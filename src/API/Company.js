import axios from 'axios'
export default{
    getCompanyData:function(id,cb){
        axios.get('company/getcompany/'+id).then((result) => {
            cb(result);
        });
    },

    getcitiesdata:function(cb){
        axios.get('company/fetchcities').then((response)=>{
           cb(response);
        });
    },

    getsocialdata:function(id,cb){
        axios.get('company/fetchsocial/'+id).then((response)=>{
            cb(response);
        });
    },

    getsocialcolordata:function(cb){
        axios.get('company/fetchsocialcolor').then((response)=>{
            cb(response);
        });
    },

    getcompanyfront:function(slug,cb){
        axios.get('company/fetchcompanyfront/'+slug).then((response)=>{
            cb(response);
        });
    },
    
    getpaymentdata:function(id,cb){
        axios.get('company/fetchpaymentoptions/'+id).then((response)=>{
            cb(response);
        });
    },

    getallcompanydata:function(cb){
        axios.get('company/fetchallcompany').then((response)=>{
            cb(response);
        });
    },

    getallsocialdata:function(cb){
        axios.get('company/fetchallsocial').then((response)=>{
            cb(response);
        });
    },

    getareadata:function(cb){
        axios.get('company/fetchallareadata').then((response)=>{
            cb(response);
        });
    }

}