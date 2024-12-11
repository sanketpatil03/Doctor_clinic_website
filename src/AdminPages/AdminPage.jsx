import "./AdminPage.css"
import { FaUserDoctor } from "react-icons/fa6";
import { FaHospitalUser } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { RiMenuUnfold2Line, RiMenuFold2Line } from "react-icons/ri";
import { useState } from "react";
const AdminPage = ({children}) => {
    const [size,setSize] = useState("20%")
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
                    <li> <FaUserDoctor />Appointment</li>
                    <li> <FaHospitalUser />Patients</li>
                    <li> <FaUser />Users</li>
                    <li> <IoIosLogOut />Logout</li>
                </ul>
            </aside>

            <div 
                className="interface"
                style={{
                    marginLeft: size
                }}
            >
                <div className="nav">
                    <div className="menu_icon" onClick={()=> setSize(size == 280 ? 0 : 280)}>
                    { size ? <RiMenuUnfold2Line /> : <RiMenuFold2Line />}
                    </div>
                    <img src="/images/user.png" alt="" />
                </div>
                <div className="content">
                   {children}
                </div>
            </div>
    </div>
  )
}

export default AdminPage;