import UserLayout from "../Conponents/UserLayout"
import { IoIosCall } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { MdMarkEmailRead } from "react-icons/md";
import "./Contact.css";
import { useState } from "react";
import { toast } from 'react-toastify';
const Contact = () => {

    const [contactForm , setContactForm] = useState({
        user_name : "",
        user_email : "",
        Phone : "",
        message : ""
    })
    const handleInput = (e) => {
        const input = e.target;
        setContactForm({
            ...contactForm,
            [input.name] : input.value
        })
    }
    const handleContactForm = (e) => {
        e.preventDefault();
        if(contactForm.user_name.length == 0 || contactForm.user_email.length == 0 || contactForm.Phone.length == 0 || contactForm.message.length == 0)
        {
            console.log("hii")
            toast.info("Please Fill All The Details")
        }
        else{
            toast.success("Thank you for getting in touch! We will contact you soon",{
                autoClose: 10000,
            })
            console.log(contactForm);
            setContactForm({
                user_name : "",
                user_email : "",
                Phone : "",
                message : ""
            })
        }
       
    }

    return(
       <UserLayout>
            <div className="contactus_header">
                <h1>Get In Touch</h1>
                <div className="getintouch_details">
                    <h6> <IoIosCall/> 0123456789</h6>
                    <h6> <FaLocationDot/> No 19-LG-02, LG Floor, Blok E, Kompleks Komersil Akasa, <br/>Jalan Akasa, Akasa Cheras Selatan, 43300, Seri Kembangan, Selangor</h6>
                    <h6><MdMarkEmailRead/> familycare@gmail.com</h6>
                </div>
            </div>

            <div className="contactus_container">
                <div className="map_container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7968.458431640999!2d101.74113169315093!3d3.0330732377711422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cdcbd8a9e51b59%3A0x213800db9ae182de!2sAKASA%20CHERAS%20SOUTH!5e0!3m2!1sen!2sin!4v1686821153367!5m2!1sen!2sin"title='map' className='map'></iframe>
                </div>

                <div className="contact_form_ctn">
                    <h3>Leave your details here</h3>
                    <p>We will be in touch soon!</p>
                    <form className="contact_form" onSubmit={handleContactForm}>
                    <label htmlFor="name">Enter Your Name</label>
                        <input type="text" id="name" name='user_name' className='inputfield' onChange={handleInput} value={contactForm.user_name}
                        />
                        <label htmlFor="email">Enter Your Email</label>
                        <input type="email" id="email" name='user_email' className='inputfield' onChange={handleInput} value={contactForm.user_email}
                         />
                        <label htmlFor="phoneNumber">Contact Number</label>
                        <input type="tel" id='phoneNumber'name='Phone'className='inputfield' onChange={handleInput} value={contactForm.Phone}
                         />
                        <label htmlFor="message">Your Message</label>
                        <textarea  id="message" name='message' className='textarea'  onChange={handleInput} value={contactForm.message} 
                        ></textarea>
                        <button id='btn' type='submit'>Submit</button>
                    </form>

                </div>
            </div>
       </UserLayout>
    )
}

export default Contact;