import React from "react";
import emailjs from "emailjs-com"
import Homebutton from "./Homebutton";
import Header from "./HomeHeader";
import Footer from "./Footer"
import "../App.css"
import "./HomePage.css"
import Hero from "../images/hero.PNG"
import truck from "../images/truck.png"
import { Helmet } from "react-helmet";
import { useRef } from "react";
export default function HomePage() {

  const emailRef=useRef();
  const nameRef=useRef();
  const queryRef=useRef();
  function sendEmail(e){
    e.preventDefault();

    emailjs.send("service_tnyby6u","template_gl3mqfy",{
      name: nameRef.current.value,
      user_email: emailRef.current.value,
      query: queryRef.current.value,
      },'user_GLD89axVW2xbsmYDgI3JY') 
      .then(res=>{
        console.log(res);
      }).catch(err=>console.log("Error: "+err));

     var frm=document.getElementsByName("mail-form")[0];
     frm.reset();
      alert("Query submitted successfully");

  }

  return (
    <>
      <Helmet>
        <title>Transit Pro</title>
      </Helmet>
      <Header/> 
      <div className="biggerPicture"> 
      <div className="divide">
      <div className='Heroleft'>
        <h1 className="hero-H">Businesses Grow With</h1>
    <img src={Hero} alt="Transit Pro" className="banner" />
    <p>This is a platform where your Logistic Companies find their Future Businesses. </p>
        <Homebutton/>
        
        <img src={truck} alt="Truck" className="truck-gr"/>
      </div>
   
      <div className="HeroRight">
         <h2>Contact Us</h2>
           <form onSubmit={sendEmail} name="mail-form">
             <div className="login">
             <input type="text" className="input" id="name" ref={nameRef} placeholder="Your Name"/>
             <input type="text" className="input" id="mail" ref={emailRef} placeholder="Your Email"/>
            </div>
            <div className="subject">
             <input type="number" className="input" id="number" placeholder="Your Mobile Number" />
            </div>
            <div className="msg">
             <textarea name="Message" className="area" id="msg" name="query" ref={queryRef} placeholder="Your Queries"/>
            </div>
            <div className="submit">
             <button type="submit ">Send Message</button>
            </div>
           </form>
         </div>
      </div>
      </div>
      
      <Footer/>
     
      
    </>

  );
}
