/* eslint-disable react/jsx-no-target-blank */
import React from "react";

function Job(props) {
  return (
    <div className="job-col col col-xs-6 col-lg-6 col-md-12 col-sm-12">
      {/* <a href={props.link} target="_blank"> */}
      <div className="note">
        <h2 className="text-center">{props.title} </h2>
        <h1 className="text-center">{props.company} </h1>
        <div className="d-flex justify-content-between" id="note-row">
          <div>
            <h6>Delhi</h6>
            <h6>LinkedIn</h6>
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
