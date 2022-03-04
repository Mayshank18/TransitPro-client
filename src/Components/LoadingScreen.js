import React from 'react'
import Footer from './Footer'
import "./LoadingScreen.css"
import Navbar from './Navbar'
import loadgif from "../images/load.gif"
function LoadingScreen() {
    return (
        <div  className="loadingScreen">
        <Navbar/>
         <div className="load-img">
            <img src={loadgif} alt="loading" />
            </div>
            <Footer/>
            </div>
    )
}

export default LoadingScreen
