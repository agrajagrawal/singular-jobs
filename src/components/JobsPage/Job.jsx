/* eslint-disable react/jsx-no-target-blank */
import React from "react";

function Job(props) {
  let comapnyName = props.company;
  if(comapnyName.length > 25) {
    comapnyName = comapnyName.substr(0,25) + "...";
  }
  let comapnyTitle = props.title;
  if(comapnyTitle.length > 25) {
    comapnyTitle = comapnyTitle.substr(0,25) + "...";
  }
  
  return (
    <div className="job-col col col-xs-6 col-lg-6 col-md-12 col-sm-12">
      {/* <a href={props.link} target="_blank"> */}
      <div className="note">
        <h2 className="text-center">{comapnyTitle} </h2>
        <h1 className="text-center">{comapnyName} </h1>
        <div className="d-flex justify-content-between" id="note-row">
          <div>
            <h6>Delhi</h6>
            <div className="d-flex">
            <h6>{props.platform + " "}</h6>
              <img src={process.env.PUBLIC_URL + "/images/" + props.platform.toLowerCase() + ".png" } className="ml-2" alt="" srcset="" height="20px" />

            </div>
          </div>

          <div className="align-middle">
            <div className="apply-button">
            <a href={props.link} target="_blank" >
              <button type="submit" id="job-btn">
                View Job
              </button>
            </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Job;
