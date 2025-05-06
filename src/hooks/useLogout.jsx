import { useAuthContext } from "./useAuthContext"
import { useBlogContext } from "./useBlogContext"

export const useLogout=()=>{
    const {dispatch}= useAuthContext()
    const {dispatch:blogDispatch}= useBlogContext()
    const logout=()=>{
        // remove user from storage
        localStorage.removeItem("user")
      dispatch({type:"Logout"})
      blogDispatch({type:"SHOW_BLOGS"})
        
    }
    return {logout}
}