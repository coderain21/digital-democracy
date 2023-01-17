import React, { useState, useEffect } from "react";
import axios from 'axios';
import Feed from "./feed/Feed";

function BillFeed() {
  const [bills, setBills] = useState(null);
  const [interestOne, setInterestOne] = useState('');
  const [interestTwo, setInterestTwo] = useState('');

    //Fires when component is first rendered
    useEffect(() => {
      async function getBillData(){
        //Our first request is to propublicas environment bills
        const requestOne = axios.get('https://api.propublica.org/congress/v1/bills/search.json?query=education', {
          headers: {
            "X-API-Key": '8N5NFIfZ4vGdW3Imr72RcIjBHhBhL7xKtRAqx8WK'
          }
        })
        //Our second request is to probublicas science bills
        const requestTwo = axios.get('https://api.propublica.org/congress/v1/bills/search.json?query=science', {
          headers: {
            "X-API-Key": '8N5NFIfZ4vGdW3Imr72RcIjBHhBhL7xKtRAqx8WK'
          }
        })
      
        //We need to use axios.all to combine our two requests and then spread the responses into one....
        axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
         const response = [...responses[0].data.results[0].bills, ...responses[1].data.results[0].bills];
      

          //We then set the bills state to the response data
          setBills(response);
      setTimeout(() => {
        console.log(bills)
        console.log(response)
      }, 1000)
      
        }))
      }
      getBillData()
    }, [])

async function getBills(topic){
  const request = axios.get(`https://api.propublica.org/congress/v1/bills/search.json?query=${topic}`, {
    headers: {
      "X-API-Key": '8N5NFIfZ4vGdW3Imr72RcIjBHhBhL7xKtRAqx8WK'
    }
  })
  const response = await request;
  setBills(response.data.results[0].bills);
  setTimeout(() => {
    console.log(bills)
    console.log(response)
  }, 1000)
}
  return (
    <div className="container">
      <div className="row mt-3"></div>
      <div className="row" style={{"marginTop":'10px'}}>
        <div className="col-sm-12 col-lg-8" style={{ margin: "auto" }}>
          <div class="card">
            <div class="card-body" style={{margin: 'auto', textAlign: 'center'}}>
              <p style={{ textAlign: "center" }}>
                Sign in or select an interest to view bill info.
              </p>
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Select a topic
                </button>
                <ul class="dropdown-menu">
                  <li className="dropdown-item" onClick={() => getBills('education')}>
                      Education
                  </li>
                  <li className="dropdown-item" onClick={() => getBills('science')}>
                      Science
                  </li>
                  <li className="dropdown-item" onClick={() => getBills('technology')}>
                      Technology
                  </li>
                  <li className="dropdown-item" onClick={() => getBills('agriculture')}>
                      Agriculture
                  </li>
                  <li className="dropdown-item" onClick={() => getBills('culture')}>
                      Culture
                  </li>
                  <li className="dropdown-item" onClick={() => getBills('commerce')}>
                      Commerce
                  </li>
                  <li className="dropdown-item" onClick={() => getBills('international affairs')}>
                      International Affairs
                  </li>
                  <li className="dropdown-item" onClick={() => getBills('environment')}>
                      Environment
                  </li>
                  <li className="dropdown-item" onClick={() => getBills('health')}>
                      Health
                  </li>
                  <li className="dropdown-item" onClick={() => getBills('government')}>
                      Government
                  </li>

                </ul>
              </div>
              <div className="col-12" style={{ textAlign: "center" }}>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => console.log(bills)}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-sm-12" style={{ margin: "auto" }}>
          <Feed bills={bills} />
        </div>
      </div>
    </div>
  );
}

export default BillFeed;
