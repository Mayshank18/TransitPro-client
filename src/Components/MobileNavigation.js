import React,{useState} from 'react'
import Navlinks from './Navlinks'
import "./Navbar.css"
import {RiMenuLine} from 'react-icons/ri'
import {CgCloseO} from 'react-icons/cg'

const MobileNavigation = () => {
    const [open, setOpen]=useState(false);
    const hamburgerIcon= <RiMenuLine className='Hamburger' size='40px' color='white' onClick={()=>setOpen(!open)}/>

    const closeIcon=<CgCloseO className='Hamburger' size='40px' color='white' onClick={()=>setOpen(!open)}/>

    return (
        <div className='mobileNavigation'>
            {open?closeIcon:hamburgerIcon}
            {open && <Navlinks/>}
        </div>
    )
}

export default MobileNavigation
