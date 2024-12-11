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
            else{
                return <Outlet />
            }
        })
    },[])
    if(session)
    {
        navigate("/");
       
    }
    else{
        return (
            <div>
                <h1>Hello</h1>
            </div>
        )
    }
    
}

export default LoginGuard;