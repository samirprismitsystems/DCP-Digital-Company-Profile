import axios from 'axios'

export default{
    getProductData(id,cb){
        axios.get('product/getproducts/'+id).then((result) => {
            cb(result);
        });
    },
}