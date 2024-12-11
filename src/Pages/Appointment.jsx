import { useEffect, useState } from "react";
import UserLayout from "../Conponents/UserLayout";
import "./Appointment.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { toast } from 'react-toastify';
import app from "../util/firebase-config"
const auth = getAuth(app);
const db = getFirestore(app);
const Appointment = () => {
    const [session, setSession]= useState(null);

    const [callUseEffect, setCallUseEffect] = useState(false)
    const [loading, setLoading] = useState(false);
    const [appointmentForm, setAppointmentForm] = useState({
        name: "",
        email: "",
        number: "",
        address: "",
        city: "",
        State: "",
        message: "",
        date: "",
        time: "",
        age:"",
        gender: "",
        userId: ""
    })

    const handleInput = (e) => {
        const input = e.target;
        setAppointmentForm({
            ...appointmentForm,
            [input.name] : input.value
        })
    }
    const appointmentBooking = async (e) =>{
        e.preventDefault();
        try {
            if(session)
            {
                if(appointmentForm.name.length == 0 || appointmentForm.email.length == 0 || appointmentForm.number.length == 0 || appointmentForm.address.length == 0 || appointmentForm.city.length == 0 || appointmentForm.State.length == 0 || appointmentForm.age.length == 0 || appointmentForm.gender.length == 0 || appointmentForm.time.length == 0 || appointmentForm.date.length == 0)
                {
                    toast.info("Please Fill All The Details");
                    return;
                }
                setLoading(true);
                const ref = collection(db, "appointments");
                const q = query(ref, where("date", "==", appointmentForm.date));
                const snapshot = await getDocs(q);
                const tmp=[];
                snapshot.forEach((doc)=>{
                    tmp.push(doc.data())
                })
                const isDate =tmp.find((itmes)=> itmes.time == appointmentForm.time)
            //    console.log("find",isDate);
               if(!isDate)
               {
                //  setAppointmentForm({
                //     ...appointmentForm,
                //     userId: session.uid
                // })

                const store = await addDoc(collection(db, "appointments"), appointmentForm)
                // console.log(store);
                toast.success("Appointment booked successfully!",{
                    autoClose: 15000,
                });
                // console.log(appointmentForm)
                setAppointmentForm({
                    name: "",
                    email: "",
                    number: "",
                    address: "",
                    city: "",
                    State: "",
                    message: "",
                    date: "",
                    time: "",
                    age:"",
                    gender: ""
                })
                setCallUseEffect(!callUseEffect)
               }
               else{
                toast.warning("This time slot is already booked",{
                    autoClose: 15000,
                })
               }
              
            }
            else{
                toast.warning("Please Login First",{
                    autoClose: 15000,
                })
            }
           
            
        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false);
        }
       
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user)
            {
                setSession(user);
            }
            else
            {
                setSession(null);
            }
        })
    },[])

    useEffect(()=>{
        const req = () =>{
            if(session)
            {
                setAppointmentForm({
                    ...appointmentForm,
                    userId : session.uid
                })
            }
        }
        req();
    },[session, callUseEffect])
    return(
        <UserLayout>
            <div className="appointment_section">
                <h1>Appointment Booking Form</h1>
                <div className="appointment_container">
                    <form className="appointment_form" onSubmit={appointmentBooking}>
                        <div className="info">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" placeholder="Name*" onChange={handleInput} value={appointmentForm.name}/>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" placeholder="Email*" onChange={handleInput} value={appointmentForm.email}/>
                            <label htmlFor="number">Phone Number</label>
                            <input type="number" name="number" id="number" placeholder="Phone Number*" onChange={handleInput} value={appointmentForm.number}/>
                            <label htmlFor="gender">Gender</label>
                            <input type="text" name="gender" id="gender" placeholder="Gender" onChange={handleInput} value={appointmentForm.gender}/>
                            <label htmlFor="age">Age</label>
                            <input type="number" name="age" id="age" placeholder="Age" onChange={handleInput} value={appointmentForm.age}/>
                        </div>
                        <div className="address_info">
                            <label htmlFor="">Address</label>
                            <input type="text" name="address" placeholder="Address" onChange={handleInput} value={appointmentForm.address}/>
                            <input type="text" name="city" placeholder="City" onChange={handleInput} value={appointmentForm.city}/>
                            <input type="text" name="State" placeholder="State" onChange={handleInput} value={appointmentForm.State}/>
                        </div>
                        <div className="booking_info">
                            <label htmlFor="">Reason For Visiting</label>
                            <input type="text" name="message"onChange={handleInput} value={appointmentForm.message}/>
                            <div className="date_time">
                                <div className="date">
                                    <label htmlFor="date">Date</label>
                                    <input type="date" name="date" min={new Date().toISOString().split('T')[0]} onChange={handleInput} value={appointmentForm.date}/>
                                </div>
                                <div className="time">
                                    <label htmlFor="time">Select Time</label>
                                    <select name="time" id="" onChange={handleInput} value={appointmentForm.time}>
                                    <option value="">--Please choose an option--</option>
                                        <option value="9-9:30">9 - 9:30 A.M</option>
                                        <option value="10-10:30">10 - 10:30 A.M</option>
                                        <option value="11-11:30">11 - 11:30 A.M</option>
                                        <option value="1-1:30">1 - 1:30 P.M</option>
                                        <option value="2-2:30">2 - 2:30 P.M</option>
                                        <option value="3-3:30">3 - 3:30 P.M</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button id="appointmentB_btn">{loading ? "Loading....": "Submit"}</button>
                    </form>
                </div>
            </div>
        </UserLayout>
    )
}

export default Appointment;