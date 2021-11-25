/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import data from "../linkedin.json";
import platforms from "./platforms";
import Settings from "./Settings";
import Stands from "./Stands";
export class Jobstand extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             go_to_setting : false
        }
    }
    toggle_setting = () => {
        this.setState({go_to_setting : true});
    } 
  render() {
      const {go_to_setting} = this.state;
      if(go_to_setting) {
          return <Navigate to='/settings'/>
      }
    let count = 0;
    return (
      <div>
        <div className="d-flex justify-content-between" id="avtar-bar">
          <h4>Platform for Jobs</h4>
          <div id="avatar" onClick={this.toggle_setting}></div>
        </div>
        <div className="row job-row">
          {platforms.map((job) => {
            count = count + 1;
            const { id, company, description, image } = job;
            return (
              <Stands
                id={id}
                company={company}
                description={description}
                image={image}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Jobstand;
