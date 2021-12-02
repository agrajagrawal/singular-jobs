/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import data from "../linkedin.json";
import platforms from "./platforms";
import Settings from "./Settings";
import Stands from "./Stands";

import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
export class Jobstand extends Component {
  constructor(props) {
    super(props);

    this.state = {
      go_to_setting : false,
      job_preferences: {
        linkedin : false,
        "naukri.com" : false,
        internshala : false,
        "shine.com" : false
      }
    };
  }
  printf = (obj) => {
    console.log(obj.toLowerCase());
    obj = obj.toLowerCase();
    const new_data = {
      ...this.state.job_preferences,
       [obj] : !this.state.job_preferences[obj],
    };
    const new_dict = { ...this.state, job_preferences: new_data };
    this.setState(new_dict);
  } 
  toggle_setting = () => {
    console.log("Clicked");
    this.setState({go_to_setting : true});
  };
  render() {
    console.log(this.state);
    const {go_to_setting} = this.state;
    if (go_to_setting) {
      return <Navigate to='/settings' />;
    }
    return (
      <div>
        <div className="d-flex justify-content-between" id="avtar-bar">
          <h4>agraj's Jobstand</h4>
          <div id="avatar" onClick={this.toggle_setting}></div>
        </div>
        <div className="row job-row">
          {platforms.map((job) => {
            const { id, company, description, image } = job;
            return (
              <Stands
                id={id}
                company={company}
                description={description}
                image={image}
                printf={this.printf}
              />
            );
          })}
          
        </div>
      </div>
    );
  }
}

export default Jobstand;
