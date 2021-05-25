import axios from 'axios'

export default{
    setportfolioData(id,cb){
        axios.get('portfolio/getportfolio/'+id).then((result) => {
            cb(result);
        });
    },
}