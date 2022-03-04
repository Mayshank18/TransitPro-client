import React, { useState, useRef, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { authenticateOthers } from "../service/api";
import "./OrganizationPage.css"
import "./OtherDetails.css"
import Navbar from "./Navbar";
import Footer from "./Footer";
import Select from 'react-select';
import { Helmet } from "react-helmet";
import { FadeLoader } from "react-spinners";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { LoginContext } from "../Contexts/ContextProvider";
import { useEffect } from "react";

export default function OtherDetails() {
  const truckRef = useRef([]);
  const revRef=useRef(0);
  const expRef=useRef("")
    const sect=useRef("");
    const serv=useRef("");
    const sectot=useRef("");
const [others,setOthers]=useState("none");
  const [error, setError] = useState("");
  const[getSector,setGetSector]=useState();
  const [modalisOpen,setModalisOpen]=useState(false);
  const history = useHistory();
  const [loading,setLoading]=useState(false);
  const [display,setDisplay]=useState('none');
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const [severity,setSeverity]=useState("");
  const [msg,setMsg]=useState("");
  const {userid,userEmail}=useContext(LoginContext);
  const [arr, setArr] = useState([{value:"1"}]);
  const [trucks,setTrucks]=useState([{
    number:"",
    type:""
  }])

  var SectorName=[
    {
      value:1,
      label:"FMCG"
    },
    {
      value:2,
      label:"Ecommerce"
    },
    {
      value:3,
      label:"Manufacturing"
    },
    {
      value:4,
      label:"Others"
    }

  ];

  

  async function handleSubmit(e){
    e.preventDefault();
 
    //console.log(companyRef.current.value+" "+phonenumberRef+" "+addressRef);
    getSector.map((item)=>{
      if(item=="Others"){
        const index=getSector.indexOf(item);
        getSector.splice(index,1);
        getSector.push(sectot.current.value);
      }
    })
    
    setLoading(true);
    setDisplay('block'); 
    setOpenSnackBar(true);
    setSeverity("success");
    setMsg("Saved Successfully");
    await authenticateOthers({
      Email:userEmail,
      Trucks:trucks,
  
      Revenue: revRef.current.value,
      Exp_Companies: expRef.current.value,
      Sector:getSector,
      Service: serv.current.value
    })
    .then(() => {
      history.push("/landing");
    })
    .catch((error) => {
      setLoading(false);
      setDisplay('none');
      setOpenSnackBar(true);
      setSeverity("error");
      setMsg(error.message); 
    });
  
   //console.log(truckRef.current.value+" "+revRef.current.value+" "+expRef.current.value+" "+sect.current.value+" "+serv.current.value);
  
  }

  const addInput = () => {
    console.log("hieeeeeee")
    setArr(s => {
      return [
        ...s,
        {
          value: ""
        }
      ];
    });
  }
 
  function otherSpecify(e){
      e.map((item)=>{
        if(item.label==="Others"){
          setOthers("block");
          console.log("other selected");
        }
        else{
          setOthers("none")
        }
      })
      setGetSector(Array.isArray(e)?e.map(x=>x.label):[]);     
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
  

  const handleChange=(e)=>{
    const value=e.target.value
      setTrucks([
        ...trucks,
        {
          [e.target.name]:value
        }
      ])
  }

  const customStyles={
    indicatorsContainer:()=>({
      width:"30px"
    }),
    multiValue:()=>({
      backgroundColor:"hsl(0, 0%, 90%)",
      borderRadius: "2px",
      display:"flex",
      margin:"2px",
      width:"60px",
      boxSizing: "border-box"
    }),
    multiValueLabel:()=>({
      borderRadius: "2px",
      color: "hsl(0, 0%, 20%)",
      fontSize: "85%",
      overflow: "hidden",
      padding: "3px",
      paddingLeft: "6px",
      whiteSpace: "nowrap",
      boxSizing: "border-box"
    })
    
  }

  return (
    <div>
      <div className="LoadingScreen" style={{display:display}}>
        <div className="loader">
      <FadeLoader color={"#B8B8B8"} loading={loading} size={150}/>
        </div>
      </div>
      <Helmet>
        <title>Transit Pro | Setup your Account</title>
      </Helmet>
     <Navbar/>
     <div className="oth-container">
     
      <h1>Other details</h1>
      <form className="oth-form">
        {error && setOpenSnackBar(true) && setSeverity("error") && setMsg(error) }
        <div className="userMail">
        <strong>Logged in as:</strong> {userEmail}
        </div>
        <p className="vehicleHead">Vehicle:</p>
        
        <div className="text_field1" >
          {arr.map((item)=>{
          return(
            <>
          <input
            type="text"
            id="trucks"
            name="truckNumber"
            placeholder="Numbers"
            onChange={handleChange}
            value={trucks.slice(-1).number}
          />
          <input
            type="text"
            id="trucks"
            name="truckType"
            placeholder="Type"
            onChange={handleChange}
            value={trucks.slice(-1).type}
          />
          <div className="addField" onClick={()=>addInput()}>+</div>
          </>
          );
          })}
        </div>
        <div className="text_field2">
          <label id="revenue">
            Revenue:
          </label>
          <select
          className="rev-select"
          id="rev-select"
          
          ref={revRef}>
              <option value="">Choose..</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3+">3+</option>
              </select>
        </div>
        
        <div className="text_field3"> 
            <input type="text" 
            id="brands"
            ref={expRef}
            />
          <label htmlFor="brands">Brands Associated with:</label>
        </div>
        <div className="text_field4">
            <label id="primary">Primary Sector</label>
            <Select isMulti
          onChange={otherSpecify}
          ref={sect}
          options={SectorName}
                styles={customStyles} >
                     
               </Select>
               {console.log(sect.current.value)}
               
              <input type="text" 
                  placeholder="Please Specify"
                  ref={sectot}
                  style={{display:others}}
             />
        </div>
        <div className="text_field5">
            <label id="service"> Service Type</label>
            <select
            
          className="rev-select"
    
          ref={serv}>
                <option value="">Choose..</option>
              <option value="FTL">FTL</option>
              <option value="PTL">PTL</option>
              <option value="FTL/PTL">Both</option>
              </select>
        </div>
        
        <div className="center">
        <button
          type="submit"
          id="submitbutton"
          onClick={()=>setModalisOpen(true),handleSubmit}>
          Submit
        </button>
        </div>
        <div className="skipNow">
        <Link className="skipWritten" to="/landing" >Skip for now</Link>
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