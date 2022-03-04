import React from 'react'
import { GrClose } from 'react-icons/gr'
import "./Popup.css"
function Popup(props) {
    return (props.trigger)?(
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={()=>props.setTrigger(false)}><GrClose/></button>
                {props.children}
            </div>
        </div>
    ):""
}

export default Popup
