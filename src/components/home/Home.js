import React from 'react'
import Card from "react-bootstrap/Card";
import "./home.css";
// Images
import political_comp from "./assests/political_comparison.png";
import political_profile from "./assests/political_profile.png"
import usa_map from "./assests/usa_map.png"
import donation from "./assests/donation.png"
import dashboard from "./assests/dashboard.png"
import Usa from './assests/usa.svg';
import FakeProfile  from './assests/fakeProfile.svg'
import verticalLogo from './assests/VerticalLogo.png'
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate();


  return (
    <div className='home'>

      {/*  ||||||||||| new feature section here using react Bootstrap ||||||||||||*/}

     
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >

          {/* Politician Comparision */}
          
          
          {/*  WELCOME COMPONENT  */}

          <div className='welcome-body'>

            <h1>Welcome!</h1>

          </div>


          {/* DISTRICT MAP */}

          <div className='district-show'>
            <div className='district-desc'>
              <h3  onClick ={()=>{navigate('/districtmap')}} style={{cursor:'pointer'}}>District Map</h3>
              <div  onClick ={()=>{navigate('/districtmap')}} style={{cursor:'pointer'}}>View our district map</div>

            </div>
            
            <Usa className='usa-background'/>
     
              
          </div>


             {/* Politician Profile*/}
          <div className='profile-intro'>

          
          <FakeProfile className='profile-card'/>
          <div className='district-desc'>
            
              <h3 onClick ={()=>{navigate('/profile/Ted%20Cruz'); location.reload()}} style={{cursor:'pointer'}}>Politician Profile</h3>
              <div onClick ={()=>{navigate('/profile/Ted%20Cruz'); location.reload()}} style={{cursor:'pointer'}}>View politicians and their profiles.</div>

          </div>

          </div>





          {/* <Card.Link className="card-link" href="/comparison">
            <Card
              className="card-styles"
              style={{ width: "18rem", marginBottom: "1%", height: "200px" }}
            >
              <Card.Img
                variant="bottom"
                src={political_comp}
                alt="political comparison"
              />

              <Card.Body>
                <Card.Title>Politician Comparison</Card.Title>
              </Card.Body>
            </Card>
          </Card.Link>
       

          <Card.Link className="card-link" href="/profile/Ted%20Cruz">
            <Card
              className="card-styles"
              style={{ width: "18rem", marginBottom: "1%", height: "200px" }}
            >
              <Card.Img
                variant="bottom"
                src={political_profile}
                alt="political comparison"
              />
              <Card.Body>
                <Card.Title>Politician Profile</Card.Title>
              </Card.Body>
            </Card>
          </Card.Link>

    

          <Card.Link className="card-link" href="/dashboard">
            <Card
              className="card-styles"
              style={{ width: "18rem", marginBottom: "1%", height: "200px" }}
            >
              <Card.Img
                variant="bottom"
                src={dashboard}
                alt="political comparison"
              />
              <Card.Body>
                <Card.Title>Dashboard</Card.Title>
              </Card.Body>
            </Card>
          </Card.Link>

        

          <Card.Link className="card-link" href="/districtmap">
            <Card
              className="card-styles"
              style={{ width: "18rem", marginBottom: "1%", height: "200px" }}
            >
              <Card.Img
                variant="bottom"
                src={usa_map}
                alt="political comparison"
              />
              <Card.Body>
                <Card.Title>District Map</Card.Title>
              </Card.Body>
            </Card>
          </Card.Link>

     

          <Card.Link className="card-link" href="/donations">
            <Card
              className="card-styles"
              style={{ width: "18rem", marginBottom: "1%", height: "200px" }}
            >
              <Card.Img
                variant="bottom"
                src={donation}
                alt="political comparison"
              />
              <Card.Body>
                <Card.Title>Donations</Card.Title>
              </Card.Body>
            </Card>
          </Card.Link> */}
        </div>
      </div>
    </div>
  );
}

export default Home