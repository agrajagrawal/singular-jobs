/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from "react";
// import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Star, StarBorder } from "@mui/icons-material";

export class Stands extends Component {
  constructor(props) {
    super(props);
    this.label = { inputProps: { "aria-label": "Checkbox demo" } };
    this.state = {};
  }
  handleChange = () => {
    this.props.clicked(this.props.company);
  };
  render() {
    return (
      <div className="job-col col col-xs-6 col-lg-6 col-md-12 col-sm-12">
        {/* <a href={props.link} target="_blank"> */}
        <div className="note" id="jobstand-note">
          <div className="d-flex justify-content-between" id="note-row">
            <div className="d-flex flex-fill justify-content-center align-middle">
              <img
                src={process.env.PUBLIC_URL + this.props.image}
                alt="Company Logo"
                height="50px"
              />
            </div>
            <div className="d-flex flex-fill justify-content-center align-middle">
              <h1 className="text-center">{this.props.company}</h1>
            </div>
            <div className="d-flex flex-fill justify-content-center align-middle">
              <div>
                <div className="d-flex justify-content-center">
                  <Checkbox
                    {...this.label}
                    icon={<StarBorder id="follow-btn" />}
                    title="Follow"
                    checkedIcon={<Star id="follow-btn" />}
                    id="follow-btn"
                    onChange={this.handleChange}
                    // onClick={this.props.printf(this.props.company)}
                    defaultChecked={this.props.followed}
                    // ng-checked="{{true}}"
                  />
                </div>
                {/* <br /> */}
                <p className="px-1">
                  {this.props.followed ? "Following" : "Follow"}
                </p>
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
    );
  }
}

export default Stands;
