import { useState,useEffect } from "react";




export const useGetProfile=()=>{


    const [json,setJson]=useState(null);

    const [error,setError]=useState("");


            


    const fetechUserDetails =   async()=>{
      const userInfo= await JSON.parse (localStorage.getItem(("user")));
   
      const reqEmail=userInfo.email;
   
      try {
        const response=await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/getProfile/`+ reqEmail,{
            method:"GET"
           });
        
           if(response.ok){
            setError(null);
            const jsonData=await response.json();
     
            setJson(jsonData);
            console.log(jsonData)
       
           }  
      } catch (error) {
        console.log(error)
        setError(error);
        
      }
    
   
      } 
     
   
     
   
   
 

    return {fetechUserDetails,error,json}
} 