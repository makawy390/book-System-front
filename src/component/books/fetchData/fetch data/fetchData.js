import axios from "axios";
import { useState , useEffect } from "react";
import { useSelector } from 'react-redux';
  
const useFetch = (url , page , limit)=>{
    
 const token = useSelector(state => state.data.token);
  let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }  
    const [data,setData] = useState(null);
    const restApi = `${url}?limit=${limit}&page=${page}`;
    useEffect(() => {
        axios.get(restApi , config).then((res)=> {
            setData(res.data.data)
        })
        .catch((err)=> console.log(err))
    },[restApi]);   
     return data;
}

export default useFetch;