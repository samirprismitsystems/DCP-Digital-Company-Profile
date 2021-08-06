import axios from 'axios'

export default{
    getclientData:function(id,cb){
        axios.get('client/getclients/'+id).then((result) => {
            cb(result);
        });
    },
}