/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from 'react'
// import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Star, StarBorder } from "@mui/icons-material";



export class Stands extends Component {
  constructor(props) {
    super(props)
    this.label = { inputProps: { "aria-label": "Checkbox demo" } };
    this.state = {
       
    }
  }
  
  render() {
    return (
      <div className="job-col col col-xs-6 col-lg-6 col-md-12 col-sm-12">
      {/* <a href={props.link} target="_blank"> */}
      <div className="note" id="jobstand-note">
        <div className="d-flex justify-content-between" id="note-row">
          <div className="d-flex flex-fill justify-content-center align-middle">
            <img src={this.props.image} alt="Linkedin Logo" height="50px" />
          </div>
          <div className="d-flex flex-fill justify-content-center align-middle">
            <h1 className="text-center">{this.props.company}</h1>
          </div>
          <div className="d-flex flex-fill justify-content-center align-middle">
            <div>
            <Checkbox
              {...this.label}
              icon={<StarBorder id="follow-btn" />}
              title="Follow"
              checkedIcon={<Star id="follow-btn" />}
              id="follow-btn"
              onChange={this.props.printf(this.props.company)}
              // onClick={this.props.printf(this.props.company)}
            />
            <br/>
            <p className="px-1">Follow</p>

            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between" id="note-row">
        <div className="d-flex px-4 mt-2 justify-content-center">
              <h6>Tags: </h6>
              <ul className="d-flex popular">
                <li className="px-2 ml-1">Freshers</li>
                <li className="px-2 ml-1">Interns</li>
                {/* <li className="px-2 ml-1"></li> */}

              </ul>
            </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Stands


// function Stands(props) {
//   const 
//   return (
    
//   );
// }

// export default Stands;

{
  /* <div>
            
            <div className="p-3">
            </div>
          </div>
          <div className="pl-5 pr-5">
            <h1 className="text-center">{props.company} 
            <Checkbox
                {...label}
                icon={<StarBorder id="follow-btn" />}
                title="Follow"
                checkedIcon={<Star id="follow-btn" />}
                id="follow-btn"
              />
            </h1>
            <div className="d-flex mt-5">
              <strong> Tags: </strong>
              <ul className="d-flex popular">
                <li className="px-2 ml-1">Freshers</li>
                <li className="px-2 ml-1">Interns</li>
              </ul>
            </div>
          </div> */
}
