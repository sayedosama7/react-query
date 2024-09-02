import axios from "axios"
import { baseURL } from "../Components/Api/Api";
import { useQuery } from "react-query";


// products 
const fetchData = () => {
    return axios.get(`${baseURL}`);
}

export const useProductsData = (onSuccess, onError) => {
    return useQuery(
        'products',
        fetchData,
        {
            //   cacheTime: 50000,  //default 5 minutes
            // staleTime: 30000,  //default 0 
            // refetchOnMount:true , //false always stale default stale 
            // refetchOnWindowFocus: true , // false default true  
            // refetchInterval: 2000 ,
            //   refetchIntervalInBackground :true , //default false 
            // enabled:false  ,
            onSuccess,
            onError
        });

}
