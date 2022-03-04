import React from 'react';
import './LiveRfqs.css'

function LiveRfqs() {
    const posts = [
        {
            name:"Nagpur Operations",
            monthlyVol:"560 Tones",
            serviceTyp:"Per kg Basis",
            LastDate:"10/02/2022",
            imgsrc:"",
            logoName:"Exide Industries",
        },
        {
            name:"Bhiwandi Adhoc lanes",
            monthlyVol:"100 Tones",
            serviceTyp:"Per kg Basis",
            LastDate:"02/02/2022",
            imgsrc:"",
            logoName:"Marco Pvt Ltd",
        }
    ];

  return (
    <>
        <div id='liverfq'>
            <div className='left-column'>
                <h4><strong>RFQ : </strong>{posts.at(-1).name}</h4>
                <div className='rfqinfo'>
                    <p><strong>Monthly Volume :</strong>{posts.at(-1).monthlyVol}</p>
                    <p><strong>Service Type :</strong>{posts.at(-1).serviceTyp}</p>
                    <p><strong>Last Date :</strong>{posts.at(-2).LastDate}</p>
                </div>
            </div>
            <div className='right-column'>
                <img src={posts.at(-1).imgsrc} alt="Logo" className='logoRfq'/>
                <h6><strong>{posts.at(-1).logoName}</strong></h6>
                <div className='liverfqbut'>
                    <button className='status' >Status</button>
                    <button className='apply' >Apply</button>
                </div>
            </div>

        </div>
        <div id='liverfq'>
            <div className='left-column'>
                <h4><strong>RFQ : </strong>{posts.at(-2).name}</h4>
                <div className='rfqinfo'>
                    <p><strong>Monthly Volume :</strong>{posts.at(-2).monthlyVol}</p>
                    <p><strong>Service Type :</strong>{posts.at(-2).serviceTyp}</p>
                    <p><strong>Last Date :</strong>{posts.at(-2).LastDate}</p>
                </div>
            </div>
            <div className='right-column'>
                <img src={posts.at(-2).imgsrc} alt="Logo" className='logoRfq'/>
                <h6><strong>{posts.at(-2).logoName}</strong></h6>
                <div className='liverfqbut'>
                    <button className='status' >Status</button>
                    <button className='apply' >Apply</button>
                </div>
            </div>
        </div>
    </>
  
  )}

export default LiveRfqs;
