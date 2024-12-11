import { useEffect, useState } from "react";

import { getFirestore, getDocs, collection } from "firebase/firestore";
import app from "../util/firebase-config";
import moment from "moment";
import "./AdminPage.css"
import { FaUserDoctor } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { RiMenuUnfold2Line, RiMenuFold2Line } from "react-icons/ri";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import { Link, useLocation, useNavigate } from "react-router-dom";
const auth = getAuth(app);
const db = getFirestore(app);
const Users = () =>{
    const [usersData, setUsersData] = useState([]);

    const location = useLocation();

    const [session , setSession]= useState(null)

    const[searchRequest,setSearchRequest] = useState("")
    const navigate = useNavigate();
    const handleLogout = () =>{
        signOut(auth);
        navigate("/login")
    }

    const [size,setSize] = useState("20%")
    useEffect (()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user)
            {
                setSession(user)
            }
            else{
                setSession(null)
            }
        })
        const req = async () =>{
            const snapshot = await getDocs(collection(db, "usersInfo"))
            const tmp= [];
            snapshot.forEach((doc)=>{
                tmp.push(doc.data());
            })
            setUsersData(tmp);
        }
        req();
    },[])
    return(
      
        <div className="admin_section">
            <aside 
                className="sidebar"
                style={{
                    width: size
                }}
            >
                <div className="admin_logo">
                    <img src="/images/logo.png" alt="" className="admin_logo_image" />
                    <span>FAMILYCARE</span>
                </div>
                <ul className="options">
                    <Link id="routes_link" to="/admin/appointment" style={{
                        backgroundColor : location.pathname === "/admin/appointment" &&  "rgb(12, 112, 218)",
                        color: location.pathname === "/admin/appointment" && "white"
                    }}><li> <FaUserDoctor />Appointment </li></Link>

                    <Link id="routes_link" to="/admin/users"  style={{
                        backgroundColor : location.pathname === "/admin/users" &&  "rgb(12, 112, 218)",
                        color: location.pathname === "/admin/users" && "white"
                    }}><li> <FaUser />Users</li></Link>

                    <li onClick={handleLogout}> <IoIosLogOut />Logout</li>
                </ul>
            </aside>

            <div 
                className="interface"
                style={{
                    marginLeft: size
                }}
            >
                <div className="nav">
                    <div className="icon1">
                        <div className="menu_icon" onClick={()=> setSize(size == 280 ? 0 : 280)}>
                        { size ? <RiMenuUnfold2Line /> : <RiMenuFold2Line />}
                        </div>
                    
                            <input type="text" name="search"  placeholder="Search Keywords..." onChange={(e)=> setSearchRequest(e.target.value)}/>
                    </div>
                    

                    <img src="/images/user.png" alt="" />
                </div>
            <div className="content">
           
                    <table>
                       {
                            usersData.length !== 0 && <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Number</th>
                                <th>Register Date</th>
                                <th>Blood Group</th>
                                <th>Birth Date</th>
                            </tr>
                        </thead>
                       } 
                        <tbody>
                            {
                                usersData.filter((data)=> data.userName.toLowerCase().includes(searchRequest.toLowerCase())).map((item, index)=>(
                                    <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{item.userName}</td>
                                            <td>{item.email}</td>
                                            <td>{item.number}</td>
                                            <td>{moment(item.registerAt.toDate()).format('DD MMM YYYY, hh:mm:ss')}</td>
                                            <td>{item.bloodGroup}</td>
                                            <td>{moment(item.date).format('DD MMM YYYY')}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                     </table>                                    
            </div>
            </div>
        </div>     
          
        
    )
}
export default Users;