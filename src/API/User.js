import axios from 'axios'

export default{
    getuserData(id,cb){
        axios.get('user/getuser/'+id).then((result) => {
            cb(result);
        });
    },
}