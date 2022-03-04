import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { authenticateOrganization } from "../service/api";
import "./OrganizationPage.css"
import HomeHeader from "./HomeHeader";
import Footer from "./Footer";
import { Checkbox } from "react-bootstrap";
import { Helmet } from "react-helmet";
import Pincode from "./Pincode.js";
import { FadeLoader } from "react-spinners";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { LoginContext } from "../Contexts/ContextProvider";
import { useContext } from "react";


const GSTDict={
  "35":"Andaman and Nicobar Islands" ,
  "28":"Andhra Pradesh"  ,
  "37":"Andhra Pradesh" ,
  "12":"Arunachal Pradesh",
  "18": "Assam",
    "10": "Bihar",
    '04': "Chandigarh", 
     "22": " Chattisgarh",
    "26" :"Dadra and Nagar Haveli",
     "25" :"Daman and Diu",
    "07":"Delhi" ,
 "30":"Goa" ,
 "24":"Gujarat", 
 "06": "Haryana"  ,
  "02":"Himachal Pradesh" ,
  "01":"Jammu and Kashmir" ,
   "20":"Jharkhand" ,
 "29":"Karnataka",
 "32": "Kerala"  ,
  "31":"Lakshadweep Islands" ,
   "23":"Madhya Pradesh" ,
   "27": "Maharashtra" ,
   "14": "Manipur" ,
   "17":"Meghalaya" ,
   "15":"Mizoram" ,
   "13":"Nagaland" ,
   "21":"Odisha"  ,
   "34":"Pondicherry" ,
   "03":"Punjab"  ,
   "08": "Rajasthan" ,
    "11":"Sikkim" ,
    "33":"Tamil Nadu" ,
    "36":"Telangana"  ,
    "16":"Tripura" ,
    "09":"Uttar Pradesh" ,
    "05": "Uttarakhand" ,
    "19": "West Bengal" ,
}
const codes=Object.keys(GSTDict);

export default function OrganizationPage() {
  const companyRef = useRef();
  const compTypeRef =useRef();
  const phonenumberRef = useRef();
  const whatsappnumberRef = useRef();
  const addressRef = useRef();
  const GSTRef = useRef();
  const personRef=useRef();
  const [error, setError] = useState("");
  const [stateValue,setStatevalue]=useState("");
  const [Gst,setGst]=useState("");
  const history = useHistory();
  const [invalidGst,setInvalidGst]=useState(true);
  const [dispWhatsapp,setdispWhatsapp]=useState('none');
  const [isChecked, setIsChecked] = useState(true);
  const [pincodeData, setPincodeData] = useState('');
  const [loading, setLoading] = useState(false);
  const [others,setOthers] =useState('none');
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const [severity,setSeverity]=useState("");
  const [msg,setMsg]=useState("");
  const {userid,userEmail}=useContext(LoginContext)

  async function handleSubmit(e){
    e.preventDefault();
    validateCode();
    //console.log(companyRef.current.value+" "+phonenumberRef+" "+addressRef);
    console.log(pincodeData);
    setOpenSnackBar(true);
    setSeverity("error");
    if(invalidGst){
      setMsg("Please provide valid Gst");
    }
    else{
    setLoading(true);
    setOthers('block');
    setOpenSnackBar(true);
    setSeverity("success");
    setMsg("Saved Successfully");
    if(whatsappnumberRef.current.value=="")
    {
      await authenticateOrganization({
        Email:userEmail,
        Company: companyRef.current.value,
        CompanyType:compTypeRef.current.value,
        PIN: {pincodeData},
        Address: addressRef.current.value,
        GSTINArr: [GSTRef.current.value],
        Person:personRef.current.value,
        Whatsapp: "NA",  
        INState: stateValue,
        
      })
      .then(() => {
        history.push("/otherdetails");
      })
      .catch((error) => {
        setLoading(false);
        setOthers('none');
        setOpenSnackBar(true);
        setSeverity("error");
        setMsg(error.message);   
      });
    }
    else
    {
    await authenticateOrganization({
      Email:userEmail,
      Company: companyRef.current.value,
      CompanyType:compTypeRef.current.value,
      Address: addressRef.current.value,
      PIN: {pincodeData},
      GSTINArr: [GSTRef.current.value],
      Person:personRef.current.value,
      Whatsapp: whatsappnumberRef.current.value,  
      INState: stateValue,  
    })
    .then(() => {
      history.push("/otherdetails");
    })
    .catch((error) => { 
      setLoading(false);
      setOthers('none');
      setOpenSnackBar(true);
      setSeverity("error");
      setMsg(error.message);
      
    });
  }
  }//else
  }

  
  function validateCode(){
    //console.log(Gst);
   
    if(Gst.length==15 && Gst.charAt(13)=="Z")
    {
      //check state
      var state=Gst.substring(0,2);
      if(state in GSTDict){
        setStatevalue(GSTDict[state]);
        console.log(" valid Gst");
        setInvalidGst(false);
      }
      else{
        console.log("invalid state");
        setStatevalue("Invalid State code");
      }
     
      //valid length and checksum
    }
    else{
      //invalid length or Z missing
      console.log("invalid length");
      setStatevalue("Invalid GST");
      
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

  function handleCheck(){
    setIsChecked(!isChecked);
    if(isChecked)
    {
      setdispWhatsapp("block");
    }
    else{
      setdispWhatsapp("none");
    }
  }


  return (
    <div>
      {console.log(userid,userEmail,"PROPS")}
      <div className="LoadingScreen" style={{display:others}}>
        <div className="loader">
      <FadeLoader color={"#B8B8B8"} loading={loading} size={150}/>
        </div>
      </div>
      <Helmet>
        <title>Transit Pro | Setup your Account</title>
      </Helmet>
     <HomeHeader/>
     <div className="org-container"> 
      <h1>Organization Details</h1>
      <form onSubmit={handleSubmit} className="org-form">
        {error && setOpenSnackBar(true) && setSeverity("error") && setMsg(error) }
        <div className="userMail">
        <strong>Logged in as:</strong> {userEmail}
        </div>
        <div className="text_field1">
          <input
            type="text"
            id="company"
            ref={companyRef}
            required
          />
          <label htmlFor="company" >
            Company Name
          </label>
        </div>
        <div className="text_field1_5">
          <label id="revenue">
            Company Type:
          </label>
          <select
          className="rev-select"
          id="rev-select"
          
          ref={compTypeRef}>
              <option value="">Choose..</option>
              <option value="Partnership">Partnership</option>
              <option value="Sole Proprietorship">Sole Proprietorship</option>
              <option value="Limited Liability Partnership">Limited Liability Partnership</option>
              <option value="Private Limited Companies">Private Limited Companies</option>
              <option value="Public Limited Companies">Public Limited Companies</option>
              <option value="One-Person Companies">One-Person Companies</option>
              </select>
        </div>
        <div className="text_field2">
          <input
            type="text"
            id="address"
            ref={addressRef}
            required
          />
          <label htmlFor="address" >
            Address
          </label>
          <Pincode required invalidError="Please check pincode" lenghtError="Pincode should be atleast 6 digits" 
          getData={(data) =>setPincodeData(data)} present={false}
          showArea={false} showCity={false} stateInput={{color:'#d3d3d3',borderBottom:'double'}} districtInput={{color:'#d3d3d3',borderBottom:'double'}}/>
        </div>
        <div className="text_field3">
          <input
            type="text"
            onChange={(e)=>{
              setGst(e.target.value)
            if(e.target.value.length!=15 ||e.target.value.charAt(13)!="Z")
            {
              setInvalidGst(true);
              console.log(invalidGst);
            }
            }}
            id="GSTIN"
            ref={GSTRef}
            required
          />
            <label htmlFor="GSTIN" >
              GSTIN
            </label>
          </div>
        <h5 className="stateName">{stateValue}</h5>
        <button id="validateGST" onClick={validateCode}>Validate Gst</button>
        <div className="text_field4">
          <input
            type="text"
            id="person"
            ref={personRef}
            required
          />
          <label htmlFor="person" >
            Person of Contact
          </label>
        </div>
        <div id="check">
          <label id="checkbox">Whatsapp on Primary Number</label>
          <input type="checkbox"
          id="checkboxinput"
          checked={isChecked}
          onChange={handleCheck}
          />          
        </div>
        <div className="text_field5" style={{display:dispWhatsapp}}>
          <input
            type="number"
            id="whatsappnumber"
            ref={whatsappnumberRef}         
          />
          <label htmlFor="whatsappnumber" >
            Whatsapp Number
          </label>
        </div>
        <div className="center">
        <button
          type="submit"
          id="sub-button"
          >
          Submit
        </button>
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
