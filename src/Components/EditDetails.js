import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import "./EditDetails.css"
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Checkbox } from "react-bootstrap";
import { GrEdit } from "react-icons/gr";
import { Helmet } from "react-helmet";
import Pincode from "./Pincode";
import Select from "react-select";
import { FadeLoader } from "react-spinners";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { LoginContext } from "../Contexts/ContextProvider";
import { useContext } from 'react'
import { authenticateGetDetail,authenticateSetDetail } from "../service/api";

const GSTDict={
  "35":"Andaman and Nicobar Islands" ,
  "28":"Andhra Pradesh"  ,
  "37":"Andhra Pradesh" ,
  "12":"Arunachal Pradesh",
  "18": "Assam",
    "Bihar": "10",
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

export default function EditDetails() {
 
  
  const phoneRef= useRef();
 
  const addressRef = useRef();

  const personRef=useRef();
  const [error, setError] = useState("");
  const wapRef=useRef();
  const compRef=useRef();
  const revRef=useRef();
  const truRef=useRef();
  const sect=useRef();
  const sectot=useRef("");
  const serv=useRef();
  const history = useHistory();
  const [invalidGst,setInvalidGst]=useState(true);
  const [dispWhatsapp,setdispWhatsapp]=useState("none");
  const [isChecked, setIsChecked] = useState(true);
  const [posts,setPosts]=useState({});
  const [others,setOthers]=useState("none");
  const [pincodeData, setPincodeData] = useState('');
  const [isDefaultPresent,setIsDefaultPresent]=useState(false);
  const [getSector,setGetSector]=useState([]);
  const [loading,setLoading]=useState(false);
  const [display,setDisplay]=useState('none');
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const [severity,setSeverity]=useState("");
  const [msg,setMsg]=useState("");
  const {userEmail}=useContext(LoginContext);

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

  useEffect(() => {
        try{
            authenticateGetDetail({email:userEmail}).then((response)=>{setPosts(response.data);
            console.log("positive response from API")
            setIsDefaultPresent(true)})
            setGetSector([...posts.Sector])
        }
        catch(err){
            console.log(err);
        }     
}, [])

async function handleSubmit(e){
    e.preventDefault();
    console.log(getSector);
    getSector.map((item)=>{
      if(item=="Others"){
        const index=getSector.indexOf(item);
        getSector.splice(index,1);
        getSector.push(sectot.current.value);
      }
    })
    //console.log("submitted "+addressRef.current.value+" "+phoneRef.current.value+" "+personRef.current.value+" "+sect.current.value);
      setLoading(true);
      setDisplay('block');
      setOpenSnackBar(true);
      setSeverity("success");
      setMsg("Saved Successfully"); 
      await authenticateSetDetail({
        Email:userEmail,
        Address: addressRef.current.value,
        PIN:{pincodeData},
        Person:personRef.current.value,
        Phone:phoneRef.current.value,
        Exp_Companies:compRef.current.value,
        Revenue:revRef.current.value,
        Sector:sect.current.value,
        Service:serv.current.value,
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


  function defaultSpecify(arr){
    const arr2=[];
    var present=false;
    for(var i=0;i<arr.length;i++){
      for(var j=0;j<SectorName.length;j++){
        if(arr[i]===SectorName[j].label){
          present=true;
        }
      }
      if(present===false){
        arr2.push(arr[i]);
      }
      present=false;
    }
    return arr2;
  }
  
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway'){
      return;
    }

    setOpenSnackBar(false);
  };

  function defaultFunc(arr){
    console.log("inside def func");
    const arr1=[];
    SectorName.map((item)=>{
      arr.map((item1)=>{
        if(item.label===item1){
          arr1.push(item);
        }
      })
    })
    return arr1;
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
    <div >
      {console.log(posts)}
      <div className="LoadingScreen" style={{display:display}}>
        <div className="loader">
      <FadeLoader color={"#B8B8B8"} loading={loading} size={150}/>
        </div>
      </div>
      <Helmet>
        <title>Transit Pro | Edit Details</title>
      </Helmet>
     <Navbar/>
     <div className="edit-container">
     
      <h1>Edit details</h1>
      <form onSubmit={handleSubmit} noValidate className="edit-form">
        {error && setOpenSnackBar(true) && setSeverity("error") && setMsg(error) }
        
        {
                Object.keys(posts).length!==0?
                <p className="userMail"><strong>Logged in as: </strong>
                    {posts.Company}
                  </p>:
              <p className="userMail"> <strong>Logged in as: </strong>{userEmail}</p>
            }

        <div className="text_field1">
            
          <div className="address1">
            {
                Object.keys(posts).length!==0?
                <input
            type="text"
           
            id="address"
          ref={addressRef}
            required               
            // style={{display: af1}}               
            defaultValue= {posts.Address}/> 
            :
               <input type="text" id="address"/>
            }
          <label htmlFor="address" >
            Address
          </label>
           <div id="icon-edit" ><GrEdit /></div>                  
        </div> 

          <div>
            {
                    Object.keys(posts).length!==0?
                    <Pincode required defaultValue={posts.PIN[0].pincodeData} present={isDefaultPresent} invalidError="Please check pincode" lenghtError="Pincode should be atleast 6 digits" 
                    getData={(data) => setPincodeData(data)} 
                    showArea={false} showCity={false} stateInput={{color:'#d3d3d3',borderBottom:'double'}} districtInput={{color:'#d3d3d3',borderBottom:'double'}}/>
                    :
                    <Pincode required invalidError="Please check pincode" lenghtError="Pincode should be atleast 6 digits" 
                    getData={(data) => setPincodeData(data)} present={isDefaultPresent}
                    showArea={false} showCity={false} stateInput={{color:'#d3d3d3',borderBottom:'double'}} districtInput={{color:'#d3d3d3',borderBottom:'double'}}/>
            }
          </div>
        </div>
        
        <div className="text_field2" >
          
          <div >
            {
                Object.keys(posts).length!==0?
                
                <input
            type="text"
           
            id="add1"
          ref={phoneRef}
            required               
            // style={{display: af1}}               
            defaultValue= {posts.Phone}/> 
            :
               <input type="text" id="add1" />
            }
          <label htmlFor="add1">
            Phone
          </label>
           <div id="icon-edit" ><GrEdit /></div>
        </div>
         
          
        </div>
        {/* wap */}
        <div className="text_field3" >

          <div >
            {
                Object.keys(posts).length!==0?  
                
                <input
            type="text"
            id="person1"
         ref={wapRef}
            required               
                          
            defaultValue= {posts.Whatsapp}/> 
            
           :
               <input type="text" id="person1" />
            }
          <label htmlFor="person1">
           Whatsapp Number
            </label>
           <div id="icon-edit" ><GrEdit /></div>
        </div>
        </div>

        <div className="text_field4">
          
          <div >
            {
                Object.keys(posts).length!==0?
                 
                <input
            type="text"
           
            id="person1"
         ref={personRef}
            required               
                          
            defaultValue= {posts.Person}/> 
            :
               <input type="text" id="person1" />
            }
          <label htmlFor="person1">
            Person of Contact
          </label>

           <div id="icon-edit" ><GrEdit /></div>
        </div>
        </div>
        <div className="text_field5">
          <div >
            {
                Object.keys(posts).length!==0?
                
                <input
            type="text"
           
            id="person2"
         ref={compRef}
            required               
                          
            defaultValue= {posts.Exp_Companies}/> 
            :
               <input type="text" id="person2" />
            }
          <label htmlFor="person2" >
           Companies Associated
          </label>
           <div id="icon-edit" ><GrEdit /></div>
        </div>
        </div>
        {/* Trucks */}
        
        {/* Revenue */}
        <div className="text_field7">
          <label id="revenueEd">
            Revenue:
          </label>
          {
                Object.keys(posts).length!==0?
                 
                
          <select
          className="rev-select"
          id="rev-select"
          defaultValue={posts.Revenue}
          ref={revRef}>
              <option value="">Choose..</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3+">3+</option>
              </select>:""
}             
        </div>
    
           {/* sect,serv */}
           <div className="text_field8">
            <label id="primaryEd">Primary Sector</label>
            {
                Object.keys(posts).length!==0?
                 
             <div>
            <Select
            defaultValue={defaultFunc(posts.Sector)}
            isMulti
                onChange={otherSpecify}
                name="sector"
                ref={sect}
                className="basic-multi-select"
                options={SectorName}
                styles={customStyles}>
               </Select>
                  <input type="text" 
                  placeholder="Please Specify"
                  ref={sectot}
                  defaultValue={defaultSpecify(posts.Sector)}
                  className="SpecifyBox"
                  style={{display:others}}/>
                  </div>
               :""
               
              

              }
           
          
        
           
           
        </div>
        <div className="text_field9">
            <label id="serviceEd"> Service Type</label>
            {
                Object.keys(posts).length!==0?
                 
                
            <select
            
          className="rev-select"
              defaultValue={posts.Service}
          ref={serv}>
                <option value="">Choose..</option>
              <option value="FTL">FTL</option>
              <option value="PTL">PTL</option>
              <option value="FTL/PTL">Both</option>
              </select>:""
}
        </div>
        
        

    
        
        <div className="center">
        <button
          type="submit"
          className="sub-button"
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
