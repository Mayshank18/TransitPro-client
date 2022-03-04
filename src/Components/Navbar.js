import React, { useState } from 'react'
import logo from '../images/homepage.png'
import ProfileDashboard from './ProfileDashboard'
import HomePage from './HomePage'
import LandingPage from './LandingPage'
import "./Navbar.css"
import MobileNavigation from './MobileNavigation'
import Navigation from './Navigation'
import { Route } from 'react-router-dom'
import { useHistory } from "react-router-dom";

export default function Navbar() {
    const history = useHistory();

    return (
       
       
         <div className="navParent">
         
         <span  className="link" style={{textAlign:"left"}}>
         <img src={logo} className="logo" onClick={()=>{
            history.push("/landing");
         }}/>    
         <Navigation/>
         <MobileNavigation/>
         </span>           
         </div>
    );
 
      
}
