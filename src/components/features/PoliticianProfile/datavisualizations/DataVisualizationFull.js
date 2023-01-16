import React from 'react'

function DataVisualizationFull({politician}) {
  return (
    <div className="col-12" style={{ textAlign: "center" }}>
    <h3 className="votingHistory">Voting History</h3>

    <div className="politicanVote">
      <div className="col-12 col-lg-6 mt-4">
        <h5
          className="mt-3"
          style={{ textAlign: "center" }}
        >
          Total Votes:{" "}
          <span style={{ color: "green" }}>
            {politician.total_votes}
          </span>
        </h5>
        <h5
          className="mt-3"
          style={{ textAlign: "center" }}
        >
          Missed Votes:{" "}
          <span style={{ color: "red"}}>
            {politician.missed_votes}
          </span>
        </h5>
        <h5
          className="mt-3 mb-5"
          style={{ textAlign: "center" }}
        >
          % of votes missed:{" "}
          <span style={{ color: "red" }}>
            {politician.missed_votes_pct}
          </span>
        </h5>
      </div>
      <div className="col-12 col-lg-6 mt-4">
        <h5
          className="mt-3"
          style={{ textAlign: "center" }}
        >
          Votes With Party:{" "}
          <span style={{ color: "green" }}>
            {politician.votes_with_party}%
          </span>{" "}
          of the time.
        </h5>
        <h5
          className="mt-3 mb-5"
          style={{ textAlign: "center" }}
        >
          Votes Against Party :{" "}
          <span style={{ color: "red" }}>
            {politician.votes_against_party}%
          </span>{" "}
          of the time.
        </h5>
      </div>
    </div>
  </div>
  )
}

export default DataVisualizationFull