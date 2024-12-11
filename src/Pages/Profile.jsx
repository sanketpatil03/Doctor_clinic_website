import UserLayout from "../Conponents/UserLayout";
import "./Profile.css";
import app from "../util/firebase-config"
import { onAuthStateChanged , getAuth,} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
// import moment from "moment";
import { getFirestore, collection,  query, where, getDocs, doc, updateDoc} from "firebase/firestore";
const auth = getAuth(app);
const db = getFirestore(app);
const Profile = () => {
    const navigate = useNavigate();

    const [session, setSession]= useState(null);

    const [edit , setEdit] = useState(false);

    const [updateId, setUpdateId] = useState(false);

    const [bookingHeader, setBookingHeader] = useState(false)

    const [upcomingAppointment, setUpcomingAppointment] = useState([])

    const [expireAppointment , setExpireAppointment] = useState([])
   
    const [info, setInfo] = useState({
        date : "",
        gender : "",
        number : "",
        bloodGroup : "",
        userId : ""
    })


    

    const handleInput = (e) =>{
        const input = e.target;
        setInfo({
            ...info,
            [input.name] : input.value
        })
    }

    const submitInfo = async (e) =>{
        e.preventDefault();
        try {
            
                const ref = doc(db, "usersInfo", updateId);
                await updateDoc( ref, info);
                setEdit(false);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user)
            {
                setSession(user);
            }
            else{
                setSession(null);
                navigate("/login");
            }
        })
    }, [])
    useEffect(()=>{
        const req = async () =>{
            if(session)
                {
                    setInfo({
                        ...info,
                        userId: session.uid
                    })
                    const ref = collection(db, "usersInfo");
                    const q = query(ref, where("userId", "==", session.uid) )
                    const snapshot = await getDocs(q);
                    // if(!snapshot.empty) setEdit(true)
                    snapshot.forEach((doc)=>{
                        setInfo({
                            ...info,
                            ...doc.data(),
                        })
                        setUpdateId(doc.id)
                    })

                    const reff= collection(db, "appointments");
                    const qq = query(reff, where ("userId" , "==" ,session.uid));
                    const snaps = await getDocs(qq);
                    let tmp =[];
                    snaps.forEach((doc)=>{
                        tmp.push(doc.data());
                    })
                   let upcoming= tmp.filter((data)=>{
                        let d1 = new Date(data.date).getDate();
                        let d2 = new Date ().getDate();
                         return d1 >= d2
                    })
                    setUpcomingAppointment(upcoming)
                    let expired = tmp.filter((data)=>{
                        let d1 = new Date(data.date).getDate();
                        let d2 = new Date().getDate();
                        return d1 < d2 
                    })
                    setExpireAppointment(expired);
                   
                    
                }
        }
       req();
    },[session])
  return (
    <UserLayout>
        <div className="profile_section">
            <div className="profile_container1">
               <img src="/images/profile.png" alt="" />
               <div>    
                    <h1> {session && session.displayName}</h1>
                    <p> {session && session.email}</p>
               </div>
            </div>
            <div className="profile_container2">
                <div className="info_header">
                    <p>Personal Information</p>
                    <button onClick={()=> setEdit(true)}><FaEdit/> Edit</button>
                </div>
                    <form className="personal_info_form">
                        <div className="input_ctn">
                            <label htmlFor="name">Date of Birth</label>
                            <input type="date" name="date" id="date" onChange={handleInput} value={info.date} disabled={!edit} style={{
                                border: edit ? "1px solid rgba(0,0,0,0.2)" : "none"
                            }}/>
                        </div>
                        <div className="input_ctn">
                            <label htmlFor="gender">Gender</label>
                            <input type="text" name="gender" id="gender"  onChange={handleInput} value={info.gender} disabled={!edit} style={{
                                border: edit ? "1px solid rgba(0,0,0,0.2)" : "none"
                            }}/>
                        </div>
                        <div className="input_ctn">
                            <label htmlFor="name">Phone Number</label>
                            <input type="number" name="number" id="name"  onChange={handleInput}  value={info.number} disabled={!edit} style={{
                                border: edit ? "1px solid rgba(0,0,0,0.2)" : "none"
                            }}/>
                        </div>
                        <div className="input_ctn">
                            <label htmlFor="name">Blood Group</label>
                            <input type="text" name="bloodGroup" id="bllodGroup"  onChange={handleInput} value={info.bloodGroup} disabled={!edit} style={{
                                border: edit ? "1px solid rgba(0,0,0,0.2)" : "none"
                            }}/>
                        </div>
                    </form>
                {edit && <button className="save_btn" onClick={submitInfo}>Save</button> }
            </div>

            <div className="profile_container3">
                <h1>Booking</h1>
                <div className="booking_header">
                    <p style={{
                        backgroundColor : bookingHeader ? "" : "white",
                        padding : "6px 14px",
                        borderRadius : "6px",
                        cursor: "pointer",
                        color: bookingHeader ? "#1f2937" : "black"
                    }}  onClick={()=> setBookingHeader(false)}>Upcoming</p> 
                    <p style={{
                        backgroundColor : bookingHeader ? "white" : "",
                        padding :  "6px 14px",
                        borderRadius : "6px",
                         cursor: "pointer",
                         color: bookingHeader ?  "black" : "#1f2937" 
                    }} onClick={()=> setBookingHeader(true)}>Expired</p>
                </div>
                 {
                    bookingHeader ?   <div className="expire_table">
                                            <table id="table">
                                               { expireAppointment.length !== 0 &&
                                                <thead>
                                                    <tr>
                                                        <th> Name</th>
                                                        <th> Date</th>
                                                        <th> Time</th>
                                                        <th>Reason</th>
                                                    </tr>
                                                </thead> }
                                                <tbody>
                                                    { expireAppointment.length == 0 ? <h1 style={{
                                                        color: "red"
                                                    }}>No Data Found</h1> :
                                                        expireAppointment.map((data, index) =>(
                                                            <tr key={index}>
                                                                <td>{data.name}</td>
                                                                <td>{data.date}</td>
                                                                <td>{data.time}</td>
                                                                <td>{data.message}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div> : <div className="upcoming_table">
                                            <table>
                                                { upcomingAppointment.length !== 0 &&
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>Date</th>
                                                                <th>Time</th>
                                                                <th>Reason</th>
                                                            </tr>
                                                        </thead>
                                                }
                                                <tbody>
                                                    { upcomingAppointment.length == 0 ? <h1 style={{
                                                        color: "red"
                                                    }}>No Data Found</h1> :
                                                        upcomingAppointment.map((data, index)=>(
                                                            <tr key={index}>
                                                                <td>{data.name}</td>
                                                                <td>{data.date}</td>
                                                                <td>{data.time}</td>
                                                                <td>{data.message}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div> 
                 }
               

              
            </div>
          
        </div>
    </UserLayout>
  )
}

export default Profile;