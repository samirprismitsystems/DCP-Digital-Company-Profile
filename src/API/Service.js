import axios from 'axios'

export default{
    getServiceData(id,cb){
        axios.get('service/getservice/'+id).then((result) => {
            cb(result);
        });
    },
}