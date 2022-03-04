import React,{useState} from 'react'
import { NavLink,Route,BrowserRouter as Router,Switch } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import "./Navbar.css"

const Navlinks = () => {

    const [error, setError] = useState("");
        const history = useHistory();

        async function handleLogout() {
        setError("");

        try {
          await handleLogout();
          history.push("/");
        } catch (err) {
          setError(err.message);
        //   alert(error);
        }
      }

    return (
    <ul className="nav-pills">
         <li>
         <NavLink exact to="/landing" className="link" activeClassName="active" style={{ textDecoration: 'none' }}> Home</NavLink>
                
         </li>
 
         <li>
                 
             <NavLink exact to="/profile" className="link" activeClassName="active" style={{ textDecoration: 'none' }}> Profile</NavLink>
         </li>
 
        <li>
            <button className="bt-logout" onClick={handleLogout}>Logout</button>
        </li>
     </ul>
    )
}

export default Navlinks
