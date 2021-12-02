import React, { Component } from "react";
// import data from "./data";
import data from "../../linkedin.json";
import Job from './Job'
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";
import PaginatedItems from "./PaginatedJobs";
import axios from "axios";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
const cookies = new Cookies();

export class JobPage extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      go_to_setting: false,
      to_login : false,
      data : []
    };
  }
  toggle_setting = () => {
    this.setState({ go_to_setting: true });
  };
 
  render() {
    console.log("JobsPage");
    console.log(this.state.data);
    const {go_to_setting} = this.state;
    if(go_to_setting) {
      return <Navigate to='/settings' />
    }
    if(!cookies.get("user_token")) {
      // return <Navigate to='/signin' />
    }
    //  count = 0;
    console.log("JobsPage");
    console.log(this.props.data);
    return (
      <>
        <div class="d-flex justify-content-between" id="avtar-bar">
          <h4>{cookies.get("user_username")}'s Jobs</h4>
          <Avatar id="avatar" sx={{ bgcolor: deepPurple[500] }} onClick={this.toggle_setting_func}>{cookies.get("user_username")[0].toUpperCase()}</Avatar>


          {/* <div id="avatar" onClick={this.toggle_setting}></div> */}
        </div>
        <div id="react-paginate">

        <PaginatedItems className="d-flex justify-content-center" itemsPerPage={10} items= {this.props.data}/>
        </div>
        {/* <div className="row job-row">
          {data.map((job) => {
            // count = count + 1;
            const { id, company_name, title, location, platform, url } = job;
            return (
              <Job
                // count = {count}
                id={id}
                company={company_name}
                title={title}
                location={location}
                platform={platform}
                link={url}
              />
            );
          })}
        </div> */}
      </>
    );
  }
}

export default JobPage;
