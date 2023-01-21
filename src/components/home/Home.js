import React from 'react'
import Card from "react-bootstrap/Card";
import "./home.css";
// Images
import political_comp from "./assests/political_comparison.png";
import political_profile from "./assests/political_profile.png"
import usa_map from "./assests/usa_map.png"
import donation from "./assests/donation.png"
import dashboard from "./assests/dashboard.png"

function Home() {


  return (
    <div className="container-lg">

      {/*  ||||||||||| new feature section here using react Bootstrap ||||||||||||*/}

      <div className="card-header mt-5 mb-3" style={{ textAlign: "center" }}>
        <h4>FEATURES</h4>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {/* Politician Comparision */}

          <Card.Link className="card-link" href="/comparison">
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
          {/* Politician Profile */}

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

          {/* Dashboard */}

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

          {/* Disrict Map */}

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

          {/* Donation */}

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
          </Card.Link>
        </div>
      </div>
    </div>
  );
}

export default Home