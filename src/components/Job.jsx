/* eslint-disable react/jsx-no-target-blank */
import React from "react";

function Job(props) {
  return (
    <div className="job-col col col-xs-6 col-lg-6 col-md-12 col-sm-12">
    {/* <a href={props.link} target="_blank"> */}
      <div className="note">
        <h2>{props.count}.{props.title} </h2>
        <h1>{props.company} </h1>
        <h6>Delhi</h6>
        <div className="row">
          <div className="col"><p>LinkedIn</p></div>
          <div className="col">
          <a href={props.link} target="_blank">
            <button type="submit" id="job-btn">View Job</button>
          </a>
          </div>
        </div>
        
        
      </div>
    {/* </a> */}
    </div>
  );
}

export default Job;
