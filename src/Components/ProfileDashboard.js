import React, { useEffect, useRef, useState } from 'react'
import "./ProfileDashboard.css"
import { useHistory } from "react-router-dom";
import {BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import loadgif from "../images/load.gif"
import {GrAdd,GrEdit} from "react-icons/gr"
import { FcBusinessman } from "react-icons/fc";
import {BsFileEarmarkPerson} from "react-icons/bs"
import { Helmet } from 'react-helmet';
import LoadingScreen from './LoadingScreen';
import { LoginContext } from "../Contexts/ContextProvider";
import { useContext } from 'react'
import { authenticateGetDetail } from '../service/api';

function ProfileDashboard() {
  
    const [error, setError] = useState("");
        const [loading,setLoading]=useState(true);
        const [posts,setPosts]=useState({});
        const history = useHistory();
        const [disp,setDisp]=useState("none");
        const {userEmail,account}=useContext(LoginContext);
        

        useEffect(() => {
                try{
                    console.log(userEmail);
                    authenticateGetDetail({email:userEmail}).then((response)=>{setPosts(response.data);
                    console.log(response.data)})
                    
                    setLoading(false);
                }
                catch(err){
                    console.log(err);
                }

            //return ()=>sub();
        }, [])
        
        if (loading)
        {
            return(
            
               <LoadingScreen/>
                )
        }
        // async function handleLogout() {
        //     setError("");
        
        //     try {
        //       await logout();
        //       history.push("/");
        //     } catch (err) {
        //       setError(err.message);
        //     }
        //   }
          function handleEdit(){
                history.push("/editdetails")

          }
          function handleList(){
              if(disp=="none")
              {
                  setDisp("block");
              }
              else
              setDisp("none");
          }

    return (
        <div style={{ alignItems:"center"}}>
            {console.log(posts)}
    <Helmet>
        <title>Transit Pro | Profile Dashboard</title>
      </Helmet>
    <Navbar/>
    <div className="profile-container">
    <div className="profile">
      
        {/* columns */}
        <div id="row-profile" style={{ height:"100vh"}}>
         <div className="column  ">
         <div className="avatar">
           

           {
            Object.keys(posts).length!==0?
               <h3 key={posts.key} >
                   
                      {posts.Company}
                   
                   </h3> :
               <h3>Company Name</h3>
           }

       </div>
        {
                Object.keys(posts).length!==0?
                <h6 key={posts.key} className="state">
                    
                       {posts.INState}
                    
                    </h6>:
               <h6 className="state">FTL/PTL</h6>
            }
         <h6>Services</h6>
         {
                Object.keys(posts).length!==0?
                <h6 key={posts.key} className="ftl-ptl" >
                    
                       {posts.Service}
                    
                    </h6>:
               <h6 className="ftl-ptl">FTL/PTL</h6>
            }
         
             </div>

             <div className="column  contact-person">
                 <h6>Person of Contact</h6>
                
                 <FcBusinessman className="person-avatar"/>
                 {
                Object.keys(posts).length!==0?
                <h6 className='persoName' key={posts.key} >
                    
                       {posts.Person}
                    
                    </h6>:
                <h6 className='persoName'>Joe Carlson</h6>
            }
            
             </div>

             <div className="column">
                 <h6>Experienced Sectors</h6>
                <div className='column-writ'>
                {
                Object.keys(posts).length!==0?
                (posts.Sector.map((item)=><li id='written-sector' key={posts.key} >
                        {item}
                        {console.log(item)}
                    </li>)
                    
                       
                    
                 ) :
                <li>Sector</li>
            }
                </div>
                 
                
            
                 
             </div>
             <div className="column">
                 <h6>Companies Associated</h6>
                <div className='column-writ'>
                 {
                Object.keys(posts).length!==0?
                <li key={posts.key} >
                    
                       {posts.Exp_Companies}
                    
                    </li>:
               <li>Company</li>
            }
                </div>
             </div>

             </div>
                </div>
               

                 {/* profile card over */}
             {/* details card below */}
            <div className="tab-parent">
             <div className="detail-Tab">
                 <h2 >My Details</h2>
                    <div className="icon-edit" ><GrEdit style={{cursor:"pointer"}} onClick={handleEdit}/></div>
                    <div  className="icon-add" ><GrAdd style={{cursor:"pointer"}} onClick={handleList}/></div>
                    </div>
                 <div className="detailsListParent" style={{display:disp}}>
                 {
                Object.keys(posts).length!==0?
                <div key={posts.key} className="detailsList">
                    
                    <h4>Company:  <span> {posts.Company}</span></h4>
                    <h4>Address: <span>{posts.Address}</span></h4>
                    <h4>PIN: <span>{posts.PIN[0].pincodeData.pincode}</span></h4>
                    <h4>Person of Contact: <span>{posts.Person}</span></h4>
                    <h4>State of Business: <span>{posts.INState}</span></h4>
                    <h4>GSTIN: {posts.GSTINArr}</h4>
                    <h4>Revenue: <span>{posts.Revenue}</span></h4>
                    <h4>Email: <span>{posts.Email}</span></h4>
                    <h4>Phone: <span>{posts.Phone}</span></h4>
                    {(posts.Whatsapp=="NA")?<h4>Whatsapp: <span>{posts.Phone}</span></h4>:<h4>Whatsapp: <span>{posts.Whatsapp}</span></h4>}
                   

                   
                    
                    </div>:
                <h1>No details yet.</h1>
            }
                 </div>

                 <div className="detailTab ">
                 <h2 >My Analytics</h2>
                    <div className="icon" ><GrAdd /></div>
                    </div>
                    <div className="detailTab">
                 <h2 >My Activity</h2>
                    <div className="icon" ><GrAdd /></div>
                    </div>
                    </div>
                    </div>
                <Footer/>
             


               
            
        </div>
    )
}

export default ProfileDashboard
