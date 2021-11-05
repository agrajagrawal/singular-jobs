/* eslint-disable react/jsx-no-target-blank */
import React from "react";

function Job(props) {
  return (
    <a href={props.link} target="_blank">
      <div className="note">
        <h1>{props.title} </h1>
        <h2>{props.company} </h2>
        <h6>{props.location}</h6>
        <p>{props.platform}</p>
      </div>
    </a>
  );
}

export default Job;
