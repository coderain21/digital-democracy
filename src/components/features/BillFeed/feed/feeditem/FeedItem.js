import React from "react";
import './FeedItem.css';



function FeedItem({bill}) {
 var imageUrl = `https://theunitedstates.io/images/congress/450x550/${bill.sponsor_id}.jpg`

  if(bill.sponsor_party === 'R'){
    var textColor = 'text-danger'
  } else if(bill.sponsor_party === 'D'){ 
    var textColor = 'text-primary'
  }
  return (

    <div class="card feedcard mt-1">
      <div class="card-body">
        <h5 style={{textAlign: 'center', fontWeight: 'bold'}}>{bill.short_title}</h5>
        <div className="row">
        <div className="col-12">
        <img src={imageUrl} className="billimage" />
        </div>
        <div className="row mt-2">
        <div className="col-sm-12 col-md-4">
        <p style={{fontWeight: 'bold'}} className={textColor}>{bill.sponsor_name}</p>
        </div>
        <div className="col-sm-12 col-md-4" style={{textAlign: 'center'}}>
            <p style={{fontWeight: 'bold'}}>Date Introduced: {bill.introduced_date}</p>
            <p style={{fontWeight: 'bold'}}>Latest Action: {bill.latest_major_action_date}</p>
          </div>
        <div className="col-4">
        <p style={{fontWeight: 'bold', float: 'right'}} className={textColor}>Sponsoring party: {bill.sponsor_party}</p>
        </div>
        </div>



        </div>
        </div>
        <p style={{textAlign: 'center'}}>{bill.summary.substring(0, 300)}...</p>
      </div>

  

  );
}

export default FeedItem;
