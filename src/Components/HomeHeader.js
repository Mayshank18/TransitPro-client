import React from 'react'
import "./header.css"
import logo from '../images/homepage.png'
import { useHistory } from 'react-router-dom'
export default function HomeHeader() {

    const history=useHistory();
    return (
    
        <div className="headParent">
            <div className="head1">
            
        
                <img src={logo} className="logo" onClick={()=>{
                    history.push("/");
                
                }}
                style={{cursor:"pointer"}}
                /> 
      
            </div>
        </div>   
    )
}
