// import UserLayout  from "./Conponents/UserLayout"
import SignUp from "./Pages/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Services from "./Pages/Services";
import Contact from "./Pages/Contact";
import Appointment from "./Pages/Appointment";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile"
import AdminAppointment from "./AdminPages/AdminAppointment";
import Users from "./AdminPages/Users";

import AdminGuard from "./Conponents/AdminGuard";
function App() {
  return (
   <>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/services" element={<Services/>} />
              <Route path="/contact" element={<Contact/>} />
              <Route path="/appointment" element={<Appointment/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<SignUp/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route element={<AdminGuard />}>
                    <Route path="/admin/appointment" element={<AdminAppointment/>}></Route>
                    <Route path="/admin/users" element={<Users/>} ></Route>
              </Route>
                 
             
          </Routes>
      </BrowserRouter>
   </>
  )
}

export default App;
