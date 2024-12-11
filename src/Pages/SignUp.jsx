import UserLayout from "../Conponents/UserLayout";
import { MdAttachEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
// import { FaPhone } from "react-icons/fa6";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import app from "../util/firebase-config";
import { getAuth , createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { getFirestore, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
const auth = getAuth(app);
const db = getFirestore(app);
const SignUp = () => {
    const [error, setError]=useState(false);

    const [loading , setLoading] = useState(false);

    const [formValue, setFormValue]= useState({
        username: "",
        email: "",
        phone : "",
        password: "",
    })
    const navigate=useNavigate();

    const setErrorMsg = () => {
        setError(true);
        setTimeout(()=>{
            setError(false);
        },3000)
    }

    const handleInput = (e)=> {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if(formValue.email.length == 0 || formValue.password.length == 0 || formValue.username.length == 0)
            {
                toast.info("Please fill all the details");
                return;
            }
            setLoading(true);
            const userCredentials =await createUserWithEmailAndPassword(auth,formValue.email, formValue.password);
            await updateProfile(auth.currentUser,{ displayName: formValue.username});
            await addDoc(collection(db, "usersInfo"),{
                email : formValue.email,
                userName : formValue.username,
                userId : userCredentials.user.uid,
                registerAt : serverTimestamp(),
                role : "user"
            })
            toast.success("SignUp Successful")
            navigate("/")
            
        } catch (error) {
            // console.log(error);
            setErrorMsg();
        } finally{
            setLoading(false);
        }
    }
       
    return(
        <UserLayout>
           <div className="signup_section">
                <div className="signup_form_container">
                    <h1>SIGN UP</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input_box">
                            <div className="input_icon">
                            <FaUser style={{color:'#999'}} size={20}/>
                            </div>
                            <input type="text" onChange={handleInput}  name="username" id="username" placeholder="Username" />
                        </div>

                        <div className="input_box">
                            <div className="input_icon">
                            <MdAttachEmail style={{color:'#999'}} size={20}/>
                            </div>
                            <input type="email" onChange={handleInput}  name="email" id="email" placeholder="Email" />
                        </div>

                        {/* <div className="input_box">
                            <div className="input_icon">
                            <FaPhone style={{color:'#999'}} size={20}/>
                            </div>
                            <input type="tel"  name="phone" id="phone" placeholder="Phone"  onChange={handleInput}/>
                        </div> */}

                        <div className="input_box">
                            <div className="input_icon">
                            <FaLock style={{color:'#999'}} size={20}/>
                            </div>
                            <input type="password" onChange={handleInput}   name="password" id="password" placeholder="Password" />
                        </div>

                        <button id="signup_btn">
                       {loading ? "Loading..." : "SIGN UP"} 
                        </button>

                        <div className="login_div">
                            Already have an account ? <Link to="/login">Login</Link>
                        </div>

                        {
                            error &&  <div className="error_div">
                                        <p>Something is not right please try again later</p>
                                     </div>
                        }
                    </form>
                </div>
           </div>
        </UserLayout>
    )
}

export default SignUp;