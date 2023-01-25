import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SocialMediaEmbed from "./socialmediaembed/SocialMediaEmbed";
import DataVisualizationFull from "./datavisualizations/DataVisualizationFull";
import DemographicsFull from "./demographics/DemographicsFull";
import ProfileHeader from "./profileheader/ProfileHeader";

import "./PoliticianProfile.css";

function PoliticianProfile() {
  //Our state for storing fetched api data
  const [politicianInfo, setPoliticianInfo] = useState('');
  //Retrieve our url search parameters
  let { search } = useParams();
  //Fires when component is first rendered
  useEffect(() => {

    fetchPolitician();
  }, [search]);

  function fetchPolitician(){
    
    let api_url = process.env.API_URL;
  
    const url = `${api_url}/politician/${search}`

    fetch(url)
    .then((response) => response.json())
    .then((ourdata) => {
      
      setPoliticianInfo(ourdata)
    
    
    })
    console.log(politicianInfo)
    setTimeout(() => {
      console.log(politicianInfo)
    }, 3000)
}

if (politicianInfo.party === "R") {
  var profileCardBackground = "repbackground col-12 col-md-8 mt-5";
  var profileBanner = {
    backgroundColor: "rgba(255, 0, 0, 0.85)",
    borderRadius: "1px",
    margin: "auto",
  };
} else if (politicianInfo.party === "D") {
  profileCardBackground = "dembackground col-12 col-md-8 mt-5";
  profileBanner = {
    
    borderRadius: "0px",
    margin: "auto",
  };
} else {
  profileCardBackground = "col-12 col-md-8 mt-5";
  profileBanner = {
    backgroundColor: "rgba(255, 194, 0, 0.85)",
    borderRadius: "0px",
    margin: "auto",
  };
}

  return (
    <div className="container-lg" key={politicianInfo}>
      <div className="row"style={{backgroundColor: "rgba(150, 150, 150,0.4)"}}>
                <div className="col-12 card mt-3">
                  <div className="row" style={{backgroundColor: "gray",  border: "3px solid"}}>
                    <ProfileHeader politician={politicianInfo} />

                    <div className={profileCardBackground}>
                      <DemographicsFull politician={politicianInfo} />
                      <div
                        className="alert col-12 col-md-10"
                        style={profileBanner}
                      >
                        <h3
                          className="mt-2"
                          style={{ textAlign: "center", color: "white" }}
                        >
                          Party Affiliation: {politicianInfo.party}
                        </h3>
                      </div>

                      <div
                        className="card col-12 col-md-10"
                        style={{
                          borderRadius: "0px",
                          border: "none",
                          backgroundColor: "rgba(255, 255, 255, 0.7)",
                          margin: "auto",
                        }}
                      >
                        <DataVisualizationFull politician={politicianInfo} />
                      </div>
                    </div>
                  </div>
                </div>
                <SocialMediaEmbed politician={politicianInfo} />


      </div>
    </div>
  );
}

export default PoliticianProfile;
