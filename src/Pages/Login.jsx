import UserLayout from "../Conponents/UserLayout"
import { MdAttachEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import app from "../util/firebase-config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, where, query, collection,getDocs} from "firebase/firestore";
import "./Login.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const auth = getAuth(app);
const db = getFirestore(app);
const Login = () => {
    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);

    // const [userRole, setUserRole] = useState({});
    const [formValue, setFormValue]= useState({
        email : "",
        password : ""
    })

    const [error, setError] = useState(null);
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(formValue.email.length == 0 || formValue.password.length == 0)
        {
            toast.info("Please fill all the details")
            return
        }
        try {
            setLoader(true);
            const userCredentials = await signInWithEmailAndPassword(auth, formValue.email, formValue.password)
            navigate("/")
            const id = userCredentials.user.uid;
             const col= collection(db, "users");
             const q = query(col, where ("userId", "==", id));
            const snapshots = await getDocs(q);
            let role ="";
            snapshots.forEach((doc)=>{
                const user= doc.data();
                role=user.role;
             })
             console.log(role);
            if (role === "user")
             {
                navigate("/")
                toast.success("Login Successful");
             }
            else{
                navigate("/admin/appointment");
             }
        } catch (error) {
            console.log(error);
           setError("Invalid Credentials Provided ");
           setTimeout(()=>{
            setError(null)
           },3000)
        } finally{
            setLoader(false)
        }
    }
    const handleChange = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name] : e.target.value
        })
    }
    return(
        <UserLayout>
           <div className="Login_section">
                <div className="login_form_container">
                    <h1>USER LOGIN</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input_box">
                            <div className="input_icon">
                            <MdAttachEmail style={{color:'#999'}} />
                            </div>
                            <input type="email"  name="email" id="login_email" placeholder="Email" onChange={handleChange} />
                        </div>

                        <div className="input_box">
                            <div className="input_icon">
                            <FaLock style={{color:'#999'}} />
                            </div>
                            <input type="password"  name="password" id="login_password" placeholder="Password" onChange={handleChange}/>
                        </div>

                        <button id="login_btn">
                        { loader ? "Loading..." : "LOGIN"}
                        </button>

                        
                        {
                            error && <div className="error_div">
                                         <p>{error}</p>
                                    </div>
                        } 
                    </form>
                </div>
           </div>
        </UserLayout>
    )
}

export default Login;