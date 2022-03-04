import React, { useState ,useEffect} from "react";
import { Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { authenticateSignup } from "../service/api";
import Header from "./Header";
import "./SignupPage.css"
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { FadeLoader } from "react-spinners" ;
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { LoginContext } from "../Contexts/ContextProvider" 
import { useContext } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [others,setOthers] =useState('none');
  const [validPass, setValidPass] = useState(false);
  const history = useHistory();
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const [severity,setSeverity]=useState("");
  const [msg,setMsg]=useState("");
  const [ans,setAns]=useState({});
  const {userid,setUserid,setUserEmail,userEmail}=useContext(LoginContext);

  async function handleSubmit(e) {
    e.preventDefault();

    //Email validation & verification
    setOpenSnackBar(true);
    setSeverity("error");
    if (newpassword !== confirmpassword) {
      return setMsg("Passwords do not match");
    }
    if(!validPhone)
    {
      return setMsg("Invalid Phone Number");
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
      let response=await authenticateSignup({
          Email: email,
          GSTINArr: [],
          Company: "",
          CompanyType:"",
          Phone: contact,
          Password:confirmpassword,
          Person:"",
          Whatsapp: "",
          PIN:{},
          Address: "",
          INState: "",
          Trucks:0,
          Revenue:0,
          Exp_Companies:"",
          Sector:[],
          Service:""});

          if(!response){
            setLoading(false);
            setOthers('none');
            setOpenSnackBar(true);
            setSeverity("error");
            setMsg("User with the email already exists!");
          }
          else{
            switchToOrganization(response);
            // console.log(response);
            console.log("redirecting to org page");
          }
    } 
    catch (err) {
      setLoading(false);
      setOthers('none');
      setOpenSnackBar(true);
      setSeverity("error");
      setMsg(err.message);
      return;
    }
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

  function validatePhone(e){

   var num= e.target.value;
   if(num.length==10)
   setValidPhone(true);

  }

  function validatePassword(e){
    var pass=e.target.value;
    if(pass.length>=6)
    setValidPass(true)

    else
    setValidPass(false)

  }

  function switchToOrganization(response){
    console.log(response.data.ID,response.data.EMAIL)
    setOpenSnackBar(true)
    // console.log(openSnackBar);
    setSeverity("success")
    // console.log(severity);
    setMsg("Saved Successfully")
    // console.log(msg);
    const resId=response.data.ID
    const resEmail=response.data.EMAIL
    setUserid(resId)
    setUserEmail(resEmail) 
    setLoading(false)
    history.push("/organization")
  }

  return (

    
    <div>
      <div className="LoadingScreen" style={{display:others}}>
        <div className="loader">
      <FadeLoader color={"#B8B8B8"} loading={loading} size={150}/>
        </div>
      </div>
      <Helmet>
        <title>Transit Pro | Create a new Account</title>
      </Helmet>
    <Header/>
    <div className="centersig" >
     
      <h1>SignUp</h1>

      <form onSubmit={handleSubmit} className="sign-form">
        {error && setOpenSnackBar(true) && setSeverity("error") && setMsg(error) }
        <div className="text_field1" >
          <input
            type="number"
            id="contact"
            value={contact}
            onChange={(e) => {
              setContact(e.target.value);
              validatePhone(e);
            }}
            //ref={contactRef}
            required
          />
          <label htmlFor="contact" >
            Contact Number
          </label> 
        </div>
        <div className="text_field2" >
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            //ref={emailRef}
            required
          />
          <label htmlFor="email">
            Email
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
            Setup Password
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
      <div className="subBut">
      <button
        type="submit"
        className="sub-button"
        disabled={loading}
      >
        Signup
      </button>
      </div>
      <div className="login-link"> 
        Already a customer?
        <Link to="/login"className="reset">Login</Link>
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
