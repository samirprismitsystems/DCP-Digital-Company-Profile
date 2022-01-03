import axios from 'axios'

export default{
    gettestimonialData(id,cb){
        axios.get('testimonial/gettestimonial/'+id).then((result) => {
            cb(result);
        });
    },
}