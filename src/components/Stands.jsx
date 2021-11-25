/* eslint-disable react/jsx-no-target-blank */
import React from "react";

function Stands(props) {
  return (
    <div className="job-col col col-xs-6 col-lg-6 col-md-12 col-sm-12">
      {/* <a href={props.link} target="_blank"> */}
      <div className="note">
        <div className="d-flex justify-content-between" id="note-row">
          <div>
            <img src={props.image} alt="Linkedin Logo" height="50px" />
            <div className="p-3">
            <input type="checkbox" className="" name="" id="" />

            </div>
          </div>
          <div className="pl-5 pr-5">
            <h1 className="text-center">{props.company} </h1>
            <p id="job-stand-desc">"{props.description}"</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stands;
