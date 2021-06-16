import axios from 'axios'

export default{
    getSettingData(cb){
        axios.get('sitesetting/getsetting').then((result) => {
            cb(result);
        });
    },
}