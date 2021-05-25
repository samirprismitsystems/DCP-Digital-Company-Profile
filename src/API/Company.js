import axios from 'axios'

export default{
    getCompanyData(id,cb){
        axios.get('company/getcompany/'+id).then((result) => {
            cb(result);
        });
    },
}