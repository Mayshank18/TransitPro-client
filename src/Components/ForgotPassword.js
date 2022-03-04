import React from "react";
import { useRef, useState } from "react";
import { useHistory } from "react-router";
import Header from "./Header";
import "./ForgotPassword.css"
import Footer from "./Footer";
import { FadeLoader } from "react-spinners" ;
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {authenticateForgotPass} from "../service/api.js"

export default function ForgotPassword() {
  const [email,setEmail]=useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [others,setOthers] =useState('none');
  const [currentpassword,setCurrentPassword]=useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [validPass,setValidPass]=useState(false);
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const [severity,setSeverity]=useState("");
  const [msg,setMsg]=useState("");

  async function handleSubmit(e) {
  e.preventDefault();

  //Email validation & verification
  setOpenSnackBar(true);
  setSeverity("error");
  if (newpassword !== confirmpassword) {
    return setMsg("Passwords do not match");
  }
  if(!validPass)
  {
    return setMsg("Password should be atleast greater than 6 Characters.");
  }
  setOpenSnackBar(false);
  setSeverity("");
  try {
    setLoading(true);
    setOthers('block');
    await authenticateForgotPass({
        Email: email,
        CurrentPassword: currentpassword,
        NewPassword: confirmpassword
    }).then(()=>{
      switchToLogin();
      console.log("redirecting to login page");
    }).catch((error)=>{
      setLoading(false);
      setOthers('none');
      setOpenSnackBar(true);
      setSeverity("error");
      setMsg(error.message);
    });
  }
  catch(error){
    setLoading(false);
    setOthers('none');
    setOpenSnackBar(true);
    setSeverity("error");
    setMsg(error.message);
  }
}
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  }
  function validatePassword(e){
    var pass=e.target.value;
    if(pass.length>=6)
    setValidPass(true)

    else
    setValidPass(false)

  }

  function switchToLogin(){
    setOpenSnackBar(true)
    // console.log(openSnackBar);
    setSeverity("success")
    // console.log(severity);
    setMsg("Saved Successfully")
    // console.log(msg);
    history.push("/login")
  }


  return (
    <div>
    <div className="LoadingScreen" style={{display:others}}>
      <div className="loader">
    <FadeLoader color={"#B8B8B8"} loading={loading} size={150}/>
      </div>
    </div>
    <Header/>
    <div className="centerlogfor">
      <h1>Reset your password</h1>
      <form className="fgt-form">
        <div className="text_field1">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="email" >
            Email
          </label>
        </div>
        <div className="text_field2">
          <input
            type="password"
            id="currentpassword"
            //ref={currentpasswordRef}
            value={currentpassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <label htmlFor="currentpassword" >
            Current Password
          </label>
        </div>
        <div className="text_field3">
          <input
            type="password"
            id="newpassword"
            //ref={newpasswordRef}
            value={newpassword}
            onChange={(e) => {setNewpassword(e.target.value)
            validatePassword(e);
            }}
            required
          />
          <label htmlFor="newpassword" >
            New Password
          </label>
        </div>
        <div className="text_field4">
          <input
            type="password"
            id="confirmpassword"
            //ref={confirmpasswordRef}
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label htmlFor="confirmpassword" >
            Confirm Password
          </label>
        </div>
        <button
          type="submit"
          className="sub-button"
          onSubmit={handleSubmit}
         >
          Reset Password
        </button>
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
