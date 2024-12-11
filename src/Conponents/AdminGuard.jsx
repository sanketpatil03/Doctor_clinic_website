import { useEffect, useState } from 'react';
import { DNA } from 'react-loader-spinner'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDocs, getFirestore, where, query, collection } from 'firebase/firestore';
import { Outlet, useNavigate } from 'react-router-dom';
import app from "../util/firebase-config";
const auth = getAuth(app);
const db = getFirestore(app);
const AdminGuard = () => {
    const navigate = useNavigate();
    const [session, setSession] = useState(null);
    const [admin, setAdmin] = useState(false);
    useEffect(()=>{
        onAuthStateChanged(auth , (user)=>{
            if(user)
            {
                setSession(user);
            }
            else{
                navigate("/")
                
            }
        })
    },[])

    useEffect(()=>{
        const req = async() =>{
            if(session)
            {
                const col= collection(db, "usersInfo");
                const q = query(col, where ("userId", "==", session.uid));
                const snapshots = await getDocs(q);
                let role ="";
                snapshots.forEach((doc)=>{
                    const user= doc.data();
                    role=user.role;
                })
                if(role == "user")
                {
                    navigate("/profile")
                    return;
                }
                else{
                   setAdmin(true);
                }
            }
  
        }
        req();
    },[session])

    if(admin) return <Outlet/>
    return(
        <>
           <div style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
           }}>
           <DNA
                visible={true}
                height="200"
                width="200"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
  />
           </div>
        </>
    )
}
export default AdminGuard;