import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../util/firebase-config";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
const auth = getAuth(app);
const LoginGuard = () => {

    const navigate = useNavigate();

    const [session, setSession] = useState(null)

    useEffect(()=>{
        onAuthStateChanged(auth , (user)=>{
            if(user)
            {
                setSession(user);
            }
            
        })
    },[])
   if(session)
   {
    return(
        navigate("/")
      
    )
   }
        return (
            <Outlet/>
        )
    
    
}

export default LoginGuard;