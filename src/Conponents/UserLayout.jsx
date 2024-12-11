
import "./UserLayout.css";
 import { Link } from "react-router-dom";
 import { RiMenu3Fill } from "react-icons/ri";
 import { RxCross2 } from "react-icons/rx";
 import { IoLocationSharp } from "react-icons/io5";
 import { MdAddCall } from "react-icons/md";
 import { FaInstagram } from "react-icons/fa6";
 import { FaTwitter, FaFacebook  } from "react-icons/fa";
 import { MdOutlineAttachEmail } from "react-icons/md";
 import { getAuth,  onAuthStateChanged, signOut} from "firebase/auth";
 import app from "../util/firebase-config";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
const auth = getAuth(app);
const UserLayout = ({children}) => {
    const navigate = useNavigate();
    const divRef= useRef(null);
    const hamRef = useRef(null);
    const[navbar,setNavbar] = useState(false);
    const[session, setSession] = useState(null);
    const handleLogout = (e) =>{
        e.preventDefault();
        signOut(auth);
        navigate("/")
    }
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user)
            {
                setSession(user);
            }
            else{
                setSession(null);
            }
        });
      
    },[])
    return(
        <>
            <nav className="navbar_section">
                <div className="navbar_container">
                    <div className="navbar_logo">
                        <img src="/images/logo.png" alt="" className="logo_image" />
                        <span>FAMILYCARE</span>
                    </div>
                    <div className="navbar_links">
                        <Link to="/" className="nav_link">Home</Link>
                        <Link to="/services" className="nav_link">Services</Link>
                        <Link to="/contact"  className="nav_link">Contact Us</Link>
                        <Link to="/appointment" className="nav_link">Appointment</Link>
                        {/* <Link 
                        // className={({isActive})=>`${isActive ? "blue" : "black"}`}
                        to="/">Home</Link> */}
                        {/* <NavLink to="/services"> Services</NavLink>
                        <NavLink to="/contactUs">Contact Us</NavLink>
                        <NavLink to="/appointment">Appointment</NavLink> */}
                    </div>
                    <div className="navbar_authentications">
                        {
                            session ? <>
                                             <Link to="/"><button id="nav_btn2" onClick={handleLogout}> Logout</button></Link>
                                             <Link to="/profile"> <img src="/images/user.png" alt="" style={{
                                                height: "42px"
                                             }}/></Link>
                                        </>  : <>
                                                                                     <Link to="/login" id="nav_btn1">Login</Link>
                                                                                     <Link to="/signup" id="nav_btn2">Sign Up</Link>
                                                                                    </>
                        } 
                       
                        {/* <NavLink to="/logout">Logout</NavLink>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/signUp"> Sign Up</NavLink> */}
                    </div>
                    <div 
                    ref={hamRef}
                    className="hamburger_icons" 
                    onClick={()=> setNavbar(!navbar)}>
                    {navbar ?  <RxCross2 /> : <RiMenu3Fill /> } 
                    </div>
                </div>
            </nav>
            {
                navbar && 
                <div ref={divRef} className="responsive_navbar">
                <ul>
                    { session && <Link id="profile_link" to="/profile"> <img src="/images/user.png" alt="" id="mobile_nav_user"/>  <p>{session.displayName}</p></Link>}

                   <li>
                        <Link id="links" to="/"> Home</Link> 
                        <hr/>
                    </li> 
                    <li>
                        <Link id="links" to="/services">Services</Link>
                        <hr/>
                    </li>
                    <li>
                        <Link id="links" to="/contact">ContactUs</Link>
                        <hr/>
                    </li>
                    <li>
                        <Link id="links" to="/appointment">Appointment</Link>
                        <hr/>
                    </li>
                   
                    {
                        session ? <li> <Link id="links" to="/" onClick={handleLogout}>Logout</Link> <hr/> </li>  : <>  <li><Link id="links" to="/login">Login</Link> <hr/></li>
                                                                                                <                       li><Link id="links" to="/signup">Sign Up</Link><hr/> </li></>
                                     
                                
                    }
                   
                    
                   
                </ul>
            </div>
            }
           <div style={{
            margin: "0px"
           }}>
            {children}
           </div>
           <footer className="footer_section">
                <div className="footer_container">
                    <div className="footer_part1">
                        <div className="footer_logo">
                            <img src="/images/logo.png" alt="" id="logo_image"/>
                            <h1>FAMILYCARE</h1>
                        </div>
                        <p className="footer_address"> <IoLocationSharp /> No 19-LG-02, LG Floor, Blok E, Kompleks Komersil Akasa,
                        Jalan Akasa, Akasa Cheras Selatan, 43300, Seri Kembangan, Selangor</p>
                        <h2 id='working-hour'>Working Hour:</h2>
                        <p>Monday To Sunday</p>
                        <p>AM-8:30 PM</p>
                    </div>
                    <div className="footer_part2">
                        <ul>
                            <li className="link_head">Quick Links</li>
                            <li>Home</li>
                            <li>Our Servies</li>
                            <li>Contact Us</li>
                            <li>Appointment</li>
                        </ul>
                    </div>
                    <div className="footer_part3">
                        <ul>
                            <li className="link_head">Contact Info</li>
                            <li> <MdAddCall />0123456789</li>
                            <li><MdOutlineAttachEmail /> familycare@gmail.com</li>
                            <li> Follow us:</li>
                            <li><FaInstagram /> <FaTwitter /> <FaFacebook /></li>
                        </ul>
                    </div>
                    <div className="footer_part4">
                        <ul>
                            <li className="link_head">Legal</li>
                            <li>Term Of Services</li>
                            <li>Privacy Policy</li>
                            <li>Cookie Settings</li>
                        </ul>
                    </div>  
                </div>
           </footer>
        </>
    )
}
export default UserLayout;