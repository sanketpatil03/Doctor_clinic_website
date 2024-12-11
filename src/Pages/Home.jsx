import UserLayout from "../Conponents/UserLayout";
import "./Home.css"
import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
    return(
        <UserLayout>
            <section className="home_section">
                    <div className="hero_section">
                        <div className="hero_content">
                        <h3>WELCOME TO FAMILYCARE CLINIC</h3>
                            <h1>Your Health Is Our Top Priority</h1>
                            <p>Dedicated to patient care and wellness for the entire family.<br/>
                            There nothing more important than your good health, cause that's our principle capital asset for your good future.</p>
                            <button onClick={()=>navigate("/appointment")}>Book an Appointment</button>
                        </div>
                        <div className="hero_image">
                        <img src="/images/hero_image2.jpeg" alt="" />
                        </div>
                    </div>
{/* about us section */}
                   
                        <div className="about_container">
                            
                            <div className="about_image">
                            <h1 className="aboutus_heading">About Us</h1>
                            <hr />
                                <img src="/images/aboutUs.jpeg" alt="" />
                            </div>
                            <div className="about_content">
                                <h1>About Us</h1>
                                <hr />
                                <h6>I'm Dr. Aditya Varma(M.B.B.S)</h6>
                                <span>Family Physician</span>
                                <p>Dr. Aditya Singhania has completed his M.B.B.S in Cambridge University. He has 5 years experience,for long period of time Dr. Aditya Singhania has provide high-quality care for more than thousands of patient.           
                                We provide trustworthy and affordable healthcare for you and your family in your neighbourhood! </p>
                                <p>We are committed to help you understand your body better and to empower you to make better decisions in regards to your health.</p>
                            </div>
                        </div>

{/*  about us section end*/}
                    <div className="cards_section">
                        <h1>Why People Trust Familycare</h1>
                        <div className="cards_container">
                                <div className="card1">
                                   <div className="card_logo">
                                        <img src="/images/ambulance (1).png" alt="" />
                                   </div>
                                   <div className="card_info">
                                        <h3>Emergency Service</h3>
                                        <p>Our clinic provide emergency service for emergency cases. +002 3333 6666</p>
                                   </div>
                                </div>
                                <div className="card2">
                                   <div className="card_logo">
                                        <img src="/images/basic-needs.png" alt="" />
                                   </div>
                                   <div className="card_info">
                                        <h3>Home Health Service</h3>
                                        <p>Since customer comfort and convenince are of a high priority to us we offer home health service.</p>
                                   </div>
                                </div>
                                <div className="card3">
                                   <div className="card_logo">
                                        <img src="/images/healthcare.png" alt="" />
                                   </div>
                                   <div className="card_info">
                                        <h3>Family Physicin</h3>
                                        <p>Dr. Aditya Varma has an experience family physician to consult and treat all of your aliments with great care.</p>
                                   </div>
                                </div>
                        </div>
                    </div>

                    <div className="choose_us_section">
                        <h1>Why Choose Us?</h1>

                        <div className="choose_us_container">
                            <div className="choose_card">
                                <div className="choose_card_image">
                                <img src="/images/choosecard1.png" alt="" />
                                </div>
                                <h1>Happy Patients</h1>
                                <p>Our number one priority is customer satisfaction. We provide premium and primary health care to everyone. Our courteous and amiable nursing staff are specifically trained to assist and help the customer in whatever way possible.</p>
                            </div>

                            <div className="choose_card">
                                <div className="choose_card_image"> 
                                    <img src="/images/choosecard2.png" alt="" />
                                    </div>
                                <h1>Pharmacy</h1>
                               <p>We have pharmacies called the “Family Pharma” opened right next to our clinics, for customer convenience. Our pharmacies are well stocked with the latest medicines and health products. Our pharmacies are operational 365 days a year, from 7:30 AM to 10.00 PM everyday, including Sundays and Government Holidays.</p>
                            </div>

                            <div className="choose_card">
                                <div className="choose_card_image">
                                    <img src="/images/choosecard3.png" alt="" />
                                    </div>
                                <h1>Affordable Healthcare</h1>
                               <p>Our mission is to make good primary health care affordable and available to everyone. All our services are at affordable prices, and we run offers and discounts every month to promote our services at even lower prices.</p>
                            </div>

                            <div className="choose_card">
                                <div className="choose_card_image"> 
                                    <img src="/images/choosecard4.png" alt="" />
                                    </div>
                                <h1>Working all 7 days</h1>
                               <p>Our clinics are open throughout the week and on Government holidays, as we are always putting the health of people as the number one priority. Our clinics are open from 7:30 AM to 8:30 PM everyday.</p>
                            </div>
                        </div>
                    </div>
            </section>
       </UserLayout>
    )
}

export default Home;