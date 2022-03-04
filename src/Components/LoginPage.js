import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { authenticateLogin } from "../service/api";
import "./LoginPage.css"
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { FadeLoader } from "react-spinners" ;
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useContext } from "react";
import { LoginContext } from "../Contexts/ContextProvider";

export default function LoginPage() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [others,setOthers] =useState('none');
   const [openSnackBar,setOpenSnackBar]=useState(false);
  const [severity,setSeverity]=useState("");
  const [msg,setMsg]=useState("");
  const history = useHistory();
  const {setAccount,setUserEmail,setUserid}=useContext(LoginContext);

  async function handleSubmit(e) {
    e.preventDefault();
    
    let cancel = false;
    try {
      setLoading(true);
      setOthers('block');
    
      let response = await authenticateLogin({Email:emailRef.current.value, Password:passwordRef.current.value})
        //validating account setup state
      if(response){ 
        setOpenSnackBar(true);
        setSeverity("success");
        setMsg("Successfull Login");
        console.log(response.data);
        var data=response.data;
        setAccount(data);
        setUserEmail(data.Email);
        setUserid(data._id);
        if(data.Phone===""||data.INState===""||data.Person=="")
        {
          console.log("sent to fill organization details due to incomplete data for organization");
          history.push("/organization");
        }
        else if (data.Revenue===""||data.Trucks===0||data.Exp_Companies==="") {
          console.log("sent to other details which are empty")
          history.push("/otherdetails")
        }
        else{
          console.log("send to landing page.");
          history.push("/landing");
        }
               
      } else {
        // doc.data() will be undefined in this case
        setLoading(false);
        setOthers('none');
        setOpenSnackBar(true);
        setSeverity("error");
        setMsg("Please signup first");
      }
    
    }//try
     catch (err) {
      setLoading(false);
      setOthers('none');
      setOpenSnackBar(true);
      setSeverity("error");
      setMsg(err.message);
  
    }
    cancel=true;
    return cancel;
   
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };

  return (

    <div>
    <div className="LoadingScreen" style={{display:others}}>
      <div className="loader">
        <FadeLoader color={"#B8B8B8"} loading={loading} size={150}/>
      </div>
    </div>
    <Helmet>
        <title>Transit Pro | Login </title>
      </Helmet>
    <Header/>
  <div className="centerlog">
      
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="log-form">
        {error && setOpenSnackBar(true) && setSeverity("error") && setMsg(error) }
        
        <div className="text_field1">
          <input type="text" id="email" required ref={emailRef}/>
          <label for="email">Email</label>
        </div>
        <div className="text_field2">
          <input type="password" id="password" required ref={passwordRef}/>
          <label for="password">Password</label>
        </div>
      <Link to="/forgot-password" className="pass">Forgot Password?</Link>
       <div className="subBut">
      <input
          type="submit"
          value="Login" />
        </div>
        <div className="signup_link">
          Not a member?
          <Link to="/signup"className="reset">Signup</Link>
        </div>
      </form>  
    </div>
   <Footer/>
      <Snackbar
        anchorOrigin={{ vertical:'bottom', horizontal:'left' }}
        open={openSnackBar}
        autoHideDuration={8000}
        onClose={handleClose}
        >
        <Alert onClose={handleClose} severity={severity}>
            {msg}
        </Alert>
      </Snackbar>
 
    </div>
  );
}