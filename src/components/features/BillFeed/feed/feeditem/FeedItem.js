import React from "react";
import './feeditem.css';



function FeedItem({bill}) {
 var imageUrl = `https://theunitedstates.io/images/congress/450x550/${bill.sponsor_id}.jpg`

  if(bill.sponsor_party === 'R'){
    var textColor = 'text-danger'
  } else if(bill.sponsor_party === 'D'){ 
    var textColor = 'text-primary'
  }
  return (

    <div style={{backgroundColor: "rgba(0,0,0,0.2)", border: "2px solid black", boxShadow: "10px 5px 5px gray" }} class="card feedcard mt-1">
      <div class="card-body">
        <h5 className="billsummary" style={{textAlign: 'center', fontWeight: 'bold'}}>{bill.short_title}</h5>
       <img src={imageUrl} className="billimage" />
    
        <div className="row mt-2">
        <div className="col-sm-12 col-md-4">
        <p style={{fontWeight: 'bold', color: "black"}}>{bill.sponsor_name}</p>
        <p style={{fontWeight: 'bold'}} className={textColor}>Sponsoring party: {bill.sponsor_party}</p>
        </div>
        <div >
            <p style={{fontWeight: 'bold', color: "grey"}}>Date Introduced: {bill.introduced_date}</p>
            <p style={{fontWeight: 'bold', color: "grey"}}>Latest Action: {bill.latest_major_action_date}</p>
          </div>
        
        </div>

        </div>
        <p style={{textAlign: 'center'}}>{bill.summary.substring(0, 600)}...</p>
      </div>

  

  );
}

export default FeedItem;
