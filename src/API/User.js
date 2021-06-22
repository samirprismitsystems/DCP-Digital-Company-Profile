import axios from 'axios'

export default{
    getuserData(id,cb){
        axios.get('user/getuser/'+id).then((result) => {
            cb(result);
        });
    },

    setadmindash(cb){
        axios.get('user/getadmindashdata').then((result)=>{
            cb(result);
        });
    },

    setcompanydash(user_id,cb){
        axios.get('user/getcompanydashdata/'+user_id).then((result)=>{
            cb(result);
        });
    },

}