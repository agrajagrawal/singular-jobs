import React, { Component } from "react";
// import data from "./data";
import data from "../../linkedin.json";
import Job from './Job'
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";
import PaginatedItems from "./PaginatedJobs";
const cookies = new Cookies();

export class JobPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      go_to_setting: false,
    };
  }
  toggle_setting = () => {
    this.setState({ go_to_setting: true });
  };
  render() {
    const {go_to_setting} = this.state;
    if(go_to_setting) {
      return <Navigate to='/settings' />
    }
    //  count = 0;
    return (
      <>
        <div class="d-flex justify-content-between" id="avtar-bar">
          <h4>{cookies.get("user_username")}'s Jobs</h4>
          <div id="avatar" onClick={this.toggle_setting}></div>
        </div>
        <div id="react-paginate">

        <PaginatedItems itemsPerPage={20} />
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
