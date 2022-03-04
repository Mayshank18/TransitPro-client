import React from 'react'
import "./header.css"
import logo from '../images/homepage.png'
import { useHistory } from 'react-router-dom'
import { LoginContext } from "../Contexts/ContextProvider";
import { useContext } from 'react'

export default function Header() {
    const {setUserEmail,setAccount}=useContext(LoginContext);
    const history=useHistory();
    return (
    
        <div className="headParent">
        <div className="head">
            
        
            <img src={logo} className="logo" onClick={()=>{
                setUserEmail("");
                setAccount("");
                history.push("/");
                
            }}
            style={{cursor:"pointer"}}
            /> 
      
            </div>
            <div className='home'>
                <p className='home-p' onClick={()=>{
                    setUserEmail("");
                    setAccount({});
                    history.push("/");
                
                }}
                style={{cursor:"pointer"}}>Home</p>
            </div>
        </div>   
    )
}
