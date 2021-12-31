import axios from 'axios'
export default{
    getthemesData:function(cb){
        axios.get('theme/getthemes').then((result) => {
            cb(result);
        });
    },
}