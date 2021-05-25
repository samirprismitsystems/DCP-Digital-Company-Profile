import axios from 'axios'

export default{
    getinquiryData(id,cb){
        axios.get('inquiry/getinquiry/'+id).then((result) => {
            cb(result);
        });
    },
}