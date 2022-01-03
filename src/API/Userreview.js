import axios from 'axios'

export default{
    getuserreviewdata(data,cb){
        axios.get('user/getuserreview/'+data).then((result) => {
            cb(result);
        });
    },
}