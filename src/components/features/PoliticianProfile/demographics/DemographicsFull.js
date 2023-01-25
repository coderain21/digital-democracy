import React from "react";

function DemographicsFull({politician}) {
  return (
    <div
      className="card col-12 col-md-10"
      style={{
        margin: "auto",
        borderRadius: "0px",
        border: "none",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
      }}
    >
      <h1 className="namefont mb-3" style={{ textAlign: "center", backgroundColor: "transparent" }}>
        {politician.first_name} {politician.last_name}
      </h1>
      <h2 className="mt-2" style={{ textAlign: "center" }}>
        {politician.title}
      </h2>
      <h3 className="mt-2" style={{ textAlign: "center" }}>
        DOB: {politician.date_of_birth}
      </h3>
      <h2 className="mt-3 mb-5" style={{ textAlign: "center" }}>
        State: {politician.state}
      </h2>
    </div>
  );
}

export default DemographicsFull;
