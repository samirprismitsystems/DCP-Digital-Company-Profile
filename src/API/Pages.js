import axios from 'axios'

export default{
    getpagesData(cb){
        axios.get('pages/getpages').then((result) => {
            cb(result);
        });
    },
}