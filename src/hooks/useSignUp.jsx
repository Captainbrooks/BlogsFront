import { useState } from "react";

import { useAuthContext } from "./useAuthContext";
import Cookies from "js-cookie";


export const useSignup=()=>{
    const [error,setError]=useState(null)
    const[isLoading,setIsLoading]=useState(null)
    const {dispatch}=useAuthContext();


    const signup= async(username,email,password)=>{
        setIsLoading(true)
        setError(null)

        const response=await fetch(`http://localhost:7000/api/user/signup`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
              },
         
 
            body:JSON.stringify({username,email,password})
        })
        console.log("Signup request" , response);
        const json=await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            // save the user to local storage
    

            localStorage.setItem("user",JSON.stringify(json));


            //update the authcontext
            dispatch({type:"Login",payload:json})

            setIsLoading(false)

        }
    }
    return {signup,isLoading,error}
}