import UserLayout from "../Conponents/UserLayout";
import "./Services.css"
import { useNavigate } from "react-router-dom";
const Services = () => {
    const navigate = useNavigate();
    return(
        <UserLayout>
            <section className="services_heading"> 
                <h1>FAMILYCARE Medical Services</h1>
                <hr />
            </section>
            <div className="services_card_container">
                <div className="services_card">
                    <div>
                         <img src="/images/servicesimg1.png" alt="" />
                    </div>
                    <h1>Health CheckUp</h1>
                    <p>A usual full-body health check-up is made up of blood and urine tests lungs function tests, and cardiac test.</p>
                    <button onClick={()=>navigate("/appointment")}>Book an Appointment</button>
                </div>

                <div className="services_card">
                    <div>
                         <img src="/images/servicesimg2.png" alt="" />
                    </div>
                    <h1>X-Ray</h1>
                    <p>An X-ray is an imaginaring test that produces pictures of the organs, tissues, and bones of the body.</p>
                    <button onClick={()=>navigate("/appointment")}>Book an Appointment</button>
                </div>

                <div className="services_card">
                    <div>
                         <img src="/images/servicesimg3.png" alt="" />
                    </div>
                    <h1>Blood Bank</h1>
                    <p>Blood banking is the process that takes place in the lab to make sure that donated blood, or blood products.</p>
                    <button onClick={()=>navigate("/appointment")}>Book an Appointment</button>
                </div>

                <div className="services_card">
                    <div>
                         <img src="/images/servicesimg4.png" alt="" />
                    </div>
                    <h1>Laboratory</h1>
                    <p>Clinical lab services are tests on specimens from the body that are used to diagnose and treat patients.</p>
                    <button onClick={()=>navigate("/appointment")}>Book an Appointment</button>
                </div>

                <div className="services_card">
                    <div>
                         <img src="/images/servicesimg5.png" alt="" />
                    </div>
                    <h1>Outdoor Checkup</h1>
                    <p>Clinics / Hospitals of Outdoor Checkup Services, Emergency Care Service, Postoperative Care Service</p>
                    <button onClick={()=>navigate("/appointment")}>Book an Appointment</button>
                </div>

                <div className="services_card">
                    <div>
                         <img src="/images/servicesimg6.png" alt="" />
                    </div>
                    <h1>Ambulance</h1>
                    <p>Emergency ambulance services have dedicated staff to handle medical conditions at any time anywhere.</p>
                    <button onClick={()=>navigate("/appointment")}>Book an Appointment</button>
                </div>


            </div>
        </UserLayout>
    )
}

export  default Services;