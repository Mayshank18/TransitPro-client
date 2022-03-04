import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar'

import "./LandingPage.css"
import { NavLink } from 'react-router-dom'
import Footer from './Footer'
import truck from "../images/truck2.png"
import "./MyQuotation.css"
import Popup from './Popup';
import {BiDownload} from 'react-icons/bi'

import { getDownloadURL, listAll, ref, uploadBytesResumable } from '@firebase/storage';
import { Helmet } from 'react-helmet';
import { GrDownload, GrRefresh } from 'react-icons/gr';
import { FaFileDownload } from 'react-icons/fa';
import {  GoArrowRight } from 'react-icons/go';
import LoadingScreen from './LoadingScreen';
import { bringInData,sendInData } from '../service/api'
import { authenticateGetDetail } from '../service/api'
import { LoginContext } from "../Contexts/ContextProvider";
import { useContext } from 'react'
import { bringInDataPerTon,sendInDataPerTon } from '../service/api'
import { bringInDataFreqLanes,sendInDataFreqLanes } from '../service/api'

function MyQuotation() {
  
        const [loading,setLoading]=useState(true);
        const [posts,setPosts]=useState([]);
        const [isOpenKg,setIsopenKg]=useState(false);
        const [isOpenTonne,setIsopenTonne]=useState(false);
        const [isOpenLanes,setIsopenLanes]=useState(false);
        const [progress,setProgress]=useState(0);
        const [uploadPc,setUploadPc]=useState("none");
        const [lastFileKg,setLastFileKg]=useState("");
        const [lastFileUrlKg,setLastFileUrlKg]=useState("");
        const [lastFileTn,setLastFileTn]=useState("");
        const [lastFileUrlTn,setLastFileUrlTn]=useState("");
        const [lastFileLanes,setLastFileLanes]=useState("");
        const [lastFileUrlLanes,setLastFileUrlLanes]=useState("");
        const [userDetails,setUserDetails]=useState('');
        const [numberItems,setNumberItems]=useState(3);
        const [items,setItems]=useState([{
            name:"Nagpur Operations",
            monthlyVol:"560 Tones",
            serviceTyp:"Per kg Basis",
            LastDate:"10/02/2022",
            imgsrc:"",
            logoName:"Exide Industries",
            days:'8',
            text:'What a Day!',
            status:'LIVE'
        },
        {
            name:"Nagpur Operations",
            monthlyVol:"560 Tones",
            serviceTyp:"Per kg Basis",
            LastDate:"10/02/2022",
            imgsrc:"",
            logoName:"Exide Industries",
            days:'8',
            text:'What a Day!',
            status:'LIVE'
        },
        {
            name:"Nagpur Operations",
            monthlyVol:"560 Tones",
            serviceTyp:"Per kg Basis",
            LastDate:"10/02/2022",
            imgsrc:"",
            logoName:"Exide Industries",
            days:'8',
            text:'What a Day!',
            status:'CLOSED'
        },
        {
            name:"Bhiwandi Adhoc lanes",
            monthlyVol:"100 Tones",
            serviceTyp:"Per kg Basis",
            LastDate:"02/02/2022",
            imgsrc:"",
            logoName:"Marco Pvt Ltd",
            days:'9',
            text:'What a Day!',
            status: 'MODIFY'
        },
        {
            name:"Bhiwandi Adhoc lanes",
            monthlyVol:"100 Tones",
            serviceTyp:"Per kg Basis",
            LastDate:"02/02/2022",
            imgsrc:"",
            logoName:"Marco Pvt Ltd",
            days:'9',
            text:'What a Day!',
            status: 'MODIFY'
        },
        {
            name:"Nagpur Operations",
            monthlyVol:"560 Tones",
            serviceTyp:"Per kg Basis",
            LastDate:"10/02/2022",
            imgsrc:"",
            logoName:"Exide Industries",
            days:'8',
            text:'What a Day!',
            status:'LIVE'
        },
        {
            name:"Bhiwandi Adhoc lanes",
            monthlyVol:"100 Tones",
            serviceTyp:"Per kg Basis",
            LastDate:"02/02/2022",
            imgsrc:"",
            logoName:"Marco Pvt Ltd",
            days:'9',
            text:'What a Day!',
            status: 'MODIFY'
        }]);
        const [isOpenRfqs,setIsOpenRfqs]=useState(false);
    const {userEmail,account,setAccount}=useContext(LoginContext);

       
    useEffect(() => {
            try{
                authenticateGetDetail({email:userEmail}).then((response)=>{setAccount(response.data)})
                
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
    }, [])
    


    function formHandlerKg(e){
            e.preventDefault();
            const file=e.target[0].files[0];
     

            var fileInput = 
            document.getElementById('file-inp-kg');
            var filePath = fileInput.value;
             //Allowing file type
             var allowedExtensions = 
             /(\.xlsx)$/i;
   
     if (!allowedExtensions.exec(filePath)) {
         alert('No file found or Invalid File Format (.xlsx only allowed)');
   
     }
       else
       {
        // alert("file uploaded")
      
            fileHandlerKg(file);
            setUploadPc("block");
            // fetchFiles();
  
     
       }
        }
    
         const fileHandlerKg = async(file)=>{
              if(!file) return;


             // Math.round(new Date().getTime()/1000)
             const d=new Date();
         
             var time=d.getTime();
             var day=d.getDate();
             var month=d.getMonth();
             var yr=d.getFullYear();
             const filetime=time+""+day+""+month+""+yr+".xlsx";
             const data=new FormData();
             data.append('file',file);
            data.append('email',userEmail);
             const response=await sendInData(data).then(()=>{
                 console.log("Success");
             }).catch((e)=>{
                 console.log('Error', e);
             })
             console.log(response);
             console.log(filetime);
           
        };

        async function fetchFilesKg(){
            console.log("fetch kg")
            const response=await bringInData({email:userEmail}).then(()=>{
                 console.log("Success");
             }).catch((e)=>{
                 console.log('Error', e);
             });
             console.log(response);
        }
    
        function formHandlerTonne(e){
            e.preventDefault();
            const file=e.target[0].files[0];
     

            var fileInput = 
            document.getElementById('file-inp-tonne');
            var filePath = fileInput.value;

             // Allowing file type
             var allowedExtensions = 
             /(\.xlsx)$/i;
   
     if (!allowedExtensions.exec(filePath)) {
         alert('No file found or Invalid File Format (.xlsx only allowed)');
   
     }
       else
       {
        // alert("file uploaded")
      
          fileHandlerTonne(file);
            setUploadPc("block");
            // fetchFiles();
  
     
       }
        }
    
         const fileHandlerTonne = async(file)=>{
            if(!file) return;


             // Math.round(new Date().getTime()/1000)
             const d=new Date();
         
             var time = d.getTime();
             var day = d.getDate();
             var month = d.getMonth();
             var yr = d.getFullYear();
             const filetime=time+""+day+""+month+""+yr+".xlsx";
            const data=new FormData();
             data.append('file',file);
            data.append('email',userEmail);
             const response=await sendInDataPerTon(data).then(()=>{
                 console.log("Success");
             }).catch((e)=>{
                 console.log('Error', e);
             })
             console.log(response);
             console.log(filetime);
        
           
        };

         async function fetchFilesTonne(){
            console.log("fetch Tn")
            const response=await bringInDataPerTon({email:userEmail}).then(()=>{
                 console.log("Success");
             }).catch((e)=>{
                 console.log('Error', e);
             });
             console.log(response);
        }

        //Tonne End

     //Lanes Start
     function formHandlerLanes(e){
        e.preventDefault();
        const file=e.target[0].files[0];
 

        var fileInput = 
        document.getElementById('file-inp-lanes');
        var filePath = fileInput.value;

         // Allowing file type
         var allowedExtensions = 
         /(\.xlsx)$/i;

    if (!allowedExtensions.exec(filePath)) {
     alert('No file found or Invalid File Format (.xlsx only allowed)');

    }
    else
    {
    // alert("file uploaded")
  
      fileHandlerLanes(file);
        setUploadPc("block");
        // fetchFiles();

 
    }
    }
    const fileHandlerLanes = async(file)=>{
          if(!file) return;


         //Math.round(new Date().getTime()/1000)
         const d=new Date();
     
         var time=d.getTime();
         var day=d.getDate();
         var month=d.getMonth();
         var yr=d.getFullYear();
         const filetime=time+""+day+""+month+""+yr+".xlsx";
         const data=new FormData();
         data.append('file',file);
        data.append('email',userEmail);
         const response=await sendInDataFreqLanes(data).then(()=>{
            console.log("Success");
         }).catch((e)=>{
            console.log('Error', e);
         })
         console.log(response);
         console.log(filetime);
    };

    async function fetchFilesLanes(){
        console.log("fetch Fl")
        const response=await bringInDataFreqLanes({email:userEmail}).then(()=>{
             console.log("Success");
         }).catch((e)=>{
             console.log('Error', e);
         });
         console.log(response);    

    }
    if (loading)
    {
        return(
            
        <LoadingScreen/>
        )
    }
    function checkStatus(item){
        if(item){
            if(item.status==="LIVE"){
                return "rgba(242, 193, 6, 1)";
            }
            else if(item.status==="MODIFY"){
                return "rgba(8, 128, 166, 1)";
            }
            else if(item.status==="CLOSED"){
                return "rgba(188, 188, 188, 1)";
            }
        }
    }
    function handleViewMore(){
        setNumberItems(numberItems+3);
    }
 
    return (

 
        <div className='entirePage'>
            <Helmet>
            <title>Transit Pro | Home</title>
            </Helmet>
            <Navbar/>
            <div id="row" >
            <div className="column-landing  col-left">
            <div className="miniProfile">
            {
                posts.length>0?
                (posts.map((post)=><div key={post.key}>
                <h2>{post.Company}</h2>
                </div>) ):
                <h2>Company pvt. Ltd.</h2>
            }

             
            <NavLink exact to="/profile" className="prof-link">View Profile</NavLink>
            <div id="prof-data">
               <h6>Competitive Rate</h6>
               <p>No Data Available</p>
            </div>
            <div id="prof-data">
               <h6>SLA Rating</h6>
               <p>No Data Available</p>
            </div>
            <div id="prof-data">
               <h6>Market Presence</h6>
               <p>No Data Available</p>
            </div>

           <div className="member">
           <h5>Membership: Platinum</h5>
           </div>
         </div>
            <div className='rfqslive'>
                 <div className='Rfqs-ap'>
                    <p>No. of RFQs applied</p>
                 </div>
                 <div className='Rfqs-pe'>
                    <p>Pending Decisions</p>
                 </div>
             </div>
         </div>
         {/* middle Column */}
         <div className="column-landing col-mid">
            <div className="rfq-Box ">
                
                <h2><strong>My Quotations</strong></h2>
                {<div className='quot-btn-div1'>
                    {items.slice(0,numberItems).map((item)=>(
                    <div id='livequot'>
                        <div className='left-column'>
                            <div className='quotationNameDay'>
                            <h4><strong>RFQ : </strong>Title</h4>
                            <p className='daysLeft'>{item.days} days left</p>
                            </div>
                            <div className='rfquotinfo'>
                                <p className='text'><u><strong>{item.text}</strong></u></p>
                                <p className='modifiedData'><strong>Last Modified:</strong>{item.LastDate}</p>
                            </div>
                        </div>
                        <div className='right-column'>
                            <img src={item.imgsrc} alt="Logo" className='logoRfq'/>
                            <div className='livequotbut'>
                                <button className='statusquotRfq' style={{backgroundColor:checkStatus(item)}}>{item.status}</button>
                                <button className='applyquot' >AnalyticsReport</button>
                                <button className='downloadQuot'><BiDownload/></button>
                            </div>
                        </div>

                    </div>
                    ))}
                    <Popup  trigger={isOpenRfqs} setTrigger={setIsOpenRfqs} style="popup-inner1">
                        <div className='popup-rfqs-parent'>
                            <h2>Hello</h2>
                        </div>

                    </Popup>
                    <div className='viewMore' onClick={handleViewMore}>View More</div>
                </div>}

            </div>

         </div>

         {/* Right col */}
         <div className="column-landing col-right ">
             {/* Util */}
             <div className="util">
                 <h3>My Utilities</h3>
                <Link className="bt-util" to="/RFQ"><span>RFQs</span></Link>
                 
                 <Link className="bt-util" to="/Analytics"><span>My Analytics</span></Link>
                 
                 <Link className="bt-util" to="/Quotations"><span>My Quotations</span></Link>
             </div>

             {/* Data */}
             <div className="data">
             <h3>My Data</h3>
             <button className="bt-data" onClick={()=>setIsopenKg(true)}>Per Kg</button>


             <Popup trigger={isOpenKg} setTrigger={setIsopenKg} style="popup-inner">
               <h2>My Data Per Kg</h2>
               <form className="pop-form" onSubmit={formHandlerKg}>
                   <div id="row-pop">
            <a id="upl-btn" href="https://firebasestorage.googleapis.com/v0/b/transit-pro-fdf25.appspot.com/o/files%2FTransit%20template%2FTransit%20TemplateKg.xlsx?alt=media&token=fa2f1606-6ede-49d9-b585-23f3647486a8">Download Template</a>
                   <div id="row-pop-inner"><GoArrowRight className="ico-pop"/>
                
                     <input type="file" id="file-inp-kg" />
                 <GoArrowRight className="ico-pop"/>
                 </div>
                    <button type="submit" id="upl-btn" >Upload</button>
                    </div>
                </form>
                    <p style={{display: uploadPc}}>Uploaded {progress}%</p>
                  
                  
                      
                  
                <div >
                    <h5>Last Uploaded File</h5>
                    <button onClick={(e)=>{fetchFilesKg();
                    e.preventDefault();
                    
                    } }className="sub-btn btn-rfrsh" type="button"><GrRefresh/></button>
                    {
                        (lastFileKg=="")?
                        <span href={lastFileUrlKg} className="last-upld">File Not Found<FaFileDownload className="ico-dwnld"/></span>
                        :<a href={lastFileUrlKg} className="last-upld">Download File: {lastFileKg}<FaFileDownload className="ico-dwnld"/></a>
                    }
                        
                  
                  
                </div>

                          
               
             </Popup>
             
                 
                 <button className="bt-data"onClick={()=>setIsopenTonne(true)}>Per Tonne</button>

                 <Popup trigger={isOpenTonne} setTrigger={setIsopenTonne} style="popup-inner">
                     <h2>My Data Per Tonne</h2>
                     <form className="pop-form" onSubmit={formHandlerTonne}>
                   <div id="row-pop">
            <a id="upl-btn" href="https://firebasestorage.googleapis.com/v0/b/transit-pro-fdf25.appspot.com/o/files%2FAdmin_Transit_Templates%2FPer%20tonne%20Data.xlsx?alt=media&token=f9a85c94-6f0e-407d-bb6d-3ee6136f9e2d">Download Template</a>
                   <div id="row-pop"><GoArrowRight className="ico-pop"/>
                 <input type="file" id="file-inp-tonne" style={{display:"block"}}/>
                 <GoArrowRight className="ico-pop"/>
                 </div>
                    <button type="submit" id="upl-btn" >Upload</button>
                    </div>
                </form>
                    <p style={{display: uploadPc}}>Uploaded {progress}%</p>
                  
         
                <div >
                    <h5>Last Uploaded File</h5>
                    <button onClick={(e)=>{fetchFilesTonne();
                    e.preventDefault();
                    } }className="sub-btn btn-rfrsh" type="button"><GrRefresh/></button>
                            {
                        (lastFileTn=="")?
                        <span href={lastFileUrlTn} className="last-upld">File Not Found<FaFileDownload className="ico-dwnld"/></span>
                        :<a href={lastFileUrlTn} className="last-upld">Download File: {lastFileTn}<FaFileDownload className="ico-dwnld"/></a>
                    }
                  
                </div>
                        
                          
             </Popup>


             {/* Lanes  */}
                 
                 <button className="bt-data"onClick={()=>setIsopenLanes(true)}>Favourite Lanes</button>
                 <Popup trigger={isOpenLanes} setTrigger={setIsopenLanes} style="popup-inner">
                     <h2>Frequent Lanes</h2>
                     <form className="pop-form" onSubmit={formHandlerLanes}>
                   <div id="row-pop">
            <a id="upl-btn" href="https://firebasestorage.googleapis.com/v0/b/transit-pro-fdf25.appspot.com/o/files%2FAdmin_Transit_Templates%2FMy%20Frequent%20Lanes.xlsx?alt=media&token=2348381a-a27f-406b-ab3f-74125cd73fd4">Download Template</a>
                   <div id="row-pop"><GoArrowRight className="ico-pop"/>
                 <input type="file" id="file-inp-lanes" style={{display:"block"}}/>
                 <GoArrowRight className="ico-pop"/>
                 </div>
                    <button type="submit" id="upl-btn" >Upload</button>
                    </div>
                </form>
                    <p style={{display: uploadPc}}>Uploaded {progress}%</p>
                  
         
                <div >
                    <h5>Last Uploaded File</h5>
                    <button onClick={(e)=>{fetchFilesLanes();
                    e.preventDefault();
                    } }className="sub-btn btn-rfrsh" type="button"><GrRefresh/></button>
                            {
                        (lastFileLanes=="")?
                        <span href={lastFileUrlLanes} className="last-upld">File Not Found<FaFileDownload className="ico-dwnld"/></span>
                        :<a href={lastFileUrlLanes} className="last-upld">Download File: {lastFileLanes}<FaFileDownload className="ico-dwnld"/></a>
                    }
                  
                </div>
                        
                          
               
             </Popup>
             </div>
         </div>
     </div>
     <Footer/>
     </div>
    )
}

export default MyQuotation
