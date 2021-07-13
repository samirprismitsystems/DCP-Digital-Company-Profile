import axios from 'axios'

export default{
    getCompanyData(id,cb){
        axios.get('company/getcompany/'+id).then((result) => {
            cb(result);
        });
    },

    getcitiesdata(cb){
        axios.get('company/fetchcities').then((response)=>{
           cb(response);
        });
    },

    getsocialdata(id,cb){
        axios.get('company/fetchsocial/'+id).then((response)=>{
            cb(response);
        });
    },

    getsocialcolordata(cb){
        axios.get('company/fetchsocialcolor').then((response)=>{
            cb(response);
        });
    },

    getcompanyfront(slug,cb){
        axios.get('company/fetchcompanyfront/'+slug).then((response)=>{
            cb(response);
        });
    },
    
    getpaymentdata(id,cb){
        axios.get('company/fetchpaymentoptions/'+id).then((response)=>{
            cb(response);
        });
    },

    getallcompanydata(cb){
        axios.get('company/fetchallcompany').then((response)=>{
            cb(response);
        });
    },

    getallsocialdata(cb){
        axios.get('company/fetchallsocial').then((response)=>{
            cb(response);
        });
    },

    getareadata(cb){
        axios.get('company/fetchallareadata').then((response)=>{
            cb(response);
        });
    }

}