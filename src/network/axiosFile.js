import axios from 'axios';
import {API} from './apis';
 export const fetchData = async(page=0)=>{
    page*=10;
    try{
      const data=  await axios.get(API);
     page =page*10;
     const res= data.data
     const paginate = res.slice(page,page+10);
      return {res,paginate};
    }catch(err){
        return err.message;
    }
   
}