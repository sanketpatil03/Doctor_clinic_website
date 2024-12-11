// import AdminPage from "./AdminPage";
import "./AdminAppointment.css";
import { MdDeleteForever } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { RiMenuUnfold2Line, RiMenuFold2Line } from "react-icons/ri";
import { useState } from "react";
import { TiEdit } from "react-icons/ti";
import { useEffect } from "react";
import { getFirestore, collection, where, getDocs, doc, updateDoc, deleteDoc,query} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import app from "../util/firebase-config"
const db = getFirestore(app);
const auth = getAuth(app);
const AdminAppointment = () => {
    const [data,setData]= useState([])

    const location = useLocation();

    const navigate = useNavigate();

    const [appointmentModel, setAppointmentModel] = useState(false);

    const [size,setSize] = useState("20%")

    const [searchRequest, setSearchRequest] = useState("")

    const [editId , setEditId] = useState(null);

    const [session , setSession] = useState(null)

    const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0])

    const [call, setCall] = useState(false);

    const [form, setForm] = useState({
        name : "",
        email : "",
        number : "",
        gender : "",
        age : "",
        address : "",
        State : "",
        city : "",
        time : "",
        date : "",
        message : ""
    })
    const handleFilter = (e)=>{
        e.preventDefault();
        
    }

    const handleInput = (e) =>{
        const input =e.target;
        setForm({
            ...form,
            [input.name] : input.value
        })
    }

    const handleLogout = () =>{
        signOut(auth);
        navigate("/login")
    }
    const updateAppointment = (id,item) =>{
        setAppointmentModel(true);
        setForm(item);
        setEditId(id);
    }

    const deleteAppointment = (id) =>{
        const ref = doc(db, "appointments" , id);
        deleteDoc(ref);
        setCall(!call);
    }

    const bookAppointment = async (e) => {
        e.preventDefault();
        const ref = collection(db, "appointments");
        const q = query (ref, where("date", "==", form.date));
        const snapshot = await getDocs(q);
        const tmp=[];
        snapshot.forEach((doc)=>{
            tmp.push(doc.data())
        })
        const isDate =tmp.find((itmes)=> itmes.time == form.time)
        if(!isDate)
        {
            const ref = doc(db, "appointments", editId);
            await updateDoc( ref, form);
            setAppointmentModel(false);
            setEditId(null);
            setCall(!call);
        }
        else{
            toast.warning("This time slot is already booked",{
                autoClose: 15000,
            })
        }
        
    }
    useEffect(()=>{
        const req2 = async () =>{
            try {
                const ref = collection(db, "appointments");
                const q = query(ref, where("date", "==", dateFilter));
                const snapshot = await getDocs(q);
                let tmp=[];
                console.log("Aaditya",snapshot);
                snapshot.forEach((doc)=>{
                    tmp.push({
                        ...doc.data(),
                        id: doc.id
                    })
                })
                setData(tmp);
            } catch (error) {
                console.log(error)
            }
               
        }
        req2();
    },[call, dateFilter])

    useEffect(()=>{
         onAuthStateChanged(auth, (user)=>{
                    if(user)
                   {
                       setSession(user)
                  }
                 else{
                      setSession(null)
                    }
                 })
    },[])
  return (
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
                        color: location.pathname === "/admin/users" && "white",
                    }}><li > <FaUser />Users</li></Link>

                    <li onClick={handleLogout} style={{
                        cursor : "pointer"
                    }}> <IoIosLogOut />Logout</li>
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
                <div className="filter">
                    <input type="date" value={dateFilter} onChange={(e)=> setDateFilter(e.target.value)}/>
                </div>
                    <table>
                        {data.length !==0 &&    <thead >
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Actions</th>
                            </tr>
                            </thead>}
                        <tbody>
                            {data.length==0?<h1 style={{
                                color: "red"
                            }}>No Data Found</h1>:
                            data.filter((user)=>
                                user.name.toLowerCase().includes(searchRequest.toLowerCase()) || user.email.toLowerCase().includes(searchRequest.toLowerCase()) 
                            ).map((item,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.age}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.date}</td>
                                    <td>{item.time}</td>
                                    <td className="actions">
                                        <div className="delete_icon" onClick={()=> deleteAppointment(item.id)}>
                                            <MdDeleteForever />
                                        </div>
                                        <div className="edit_icon" onClick={()=> updateAppointment(item.id, item)}>
                                            <TiEdit />
                                        </div>
                                    </td>
                            </tr>
                            ))
                            
                            }
                        </tbody>
                    </table>
                    {
                        appointmentModel &&   <div className="appointment_edit_model">
                                                    <div className="appointment_edit_form">
                                                        <h1>Edit an Appointment</h1>
                                                        <button className="cancel_btn" onClick={()=> setAppointmentModel(false)}>
                                                            <RxCross1 />
                                                        </button>
                                                        <form className="edit_appointment_form">
                                                    
                                                            <div className="label_input">
                                                                <label htmlFor="name">Name</label>
                                                                <input type="text" name="name" id="name" placeholder="Name*" onChange={handleInput} value={form.name}/>
                                                            </div>
                                                            <div className="label_input">
                                                                <label htmlFor="email">Email</label>
                                                                <input type="email" name="email" id="email" placeholder="Email*" onChange={handleInput} value={form.email}/>
                                                            </div>
                                                            <div className="label_input">
                                                                <label htmlFor="number">Phone Number</label>
                                                                <input type="number" name="number" id="number" placeholder="Phone Number*" onChange={handleInput} value={form.number} />
                                                            </div>
                                                            <div className="label_input">
                                                                <label htmlFor="gender">Gender</label>
                                                                <input type="text" name="gender" id="gender" placeholder="Gender" onChange={handleInput} value={form.gender}/>
                                                            </div>
                                                            <div className="label_input">
                                                                <label htmlFor="age">Age</label>
                                                                <input type="number" name="age" id="age" placeholder="Age" onChange={handleInput} value={form.age}/>
                                                            </div>
                                                        <div className="label_input">
                                                                <label htmlFor="">Address</label>
                                                                <input type="text" name="address" placeholder="Address" onChange={handleInput} value={form.address}/>
                                                        </div>
                                                        <div  className="label_input">
                                                                <label htmlFor="">State</label>
                                                                <input type="text" name="State" placeholder="State" onChange={handleInput} value={form.State}/>
                                                        </div>
                                                        <div  className="label_input">
                                                                <label htmlFor="">City</label>
                                                                <input type="text" name="city" placeholder="City" onChange={handleInput} value={form.city}/>
                                                        </div>
                                                        <div className="label_input">
                                                                    <label htmlFor="time">Select Time</label>
                                                                    <select name="time" id="" onChange={handleInput} value={form.time}>
                                                                        <option value="9-9:30">9 - 9:30 A.M</option>
                                                                        <option value="10-10:30">10 - 10:30 A.M</option>
                                                                        <option value="11-11:30">11 - 11:30 A.M</option>
                                                                        <option value="1-1:30">1 - 1:30 P.M</option>
                                                                        <option value="2-2:30">2 - 2:30 P.M</option>
                                                                        <option value="3-3:30">3 - 3:30 P.M</option>
                                                                    </select>
                                                                </div>
                                                                <div className="label_input">
                                                                    <label htmlFor="date">Date</label>
                                                                    <input type="date" name="date" min={new Date().toISOString().split('T')[0]}  onChange={handleInput} value={form.date}/>
                                                                </div>
                                                                <div className="reason_label">
                                                                <label htmlFor="">Reason For Visiting</label>
                                                                <input type="text" name="message" onChange={handleInput} value={form.message}/>
                                                        </div>
                                                        
                                                        <button id="edit_appointment_btn" onClick={bookAppointment}>Book An Appointment</button>
                                                    </form>
                                                    </div>
                                            </div>
                    }
                  
            </div>
    </div>
</div>
       
  )
}

export default AdminAppointment