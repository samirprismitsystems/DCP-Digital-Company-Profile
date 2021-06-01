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

}