import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Button from "react-bootstrap/Button";
import JobPage from "./JobsPage/JobPage";
import { Avatar, CircularProgress } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
const cookies = new Cookies();

export class Jobfetch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isloaded: false,
    };
    this.currSess = 7;

    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    console.log("Function of did mount");
    const token = "Token " + "8ecaf39a5a0b2e2e20cf0c4bd969de714f3dcafb";
    let headers = {
      Authorization: token,
    };
    let data = {
      email: "anshlehri0599@gmail.com",
      jobs_session: this.currSess,
      user_jobs_list_exist: "True",
    };
    axios
      .post(
        "https://singularjobapi-dev.herokuapp.com/user_account/myjobs/",
        data,
        { headers: headers }
      )
      .then((res) => {
        console.log(res);
        this.setState({
          data: res.data.recommend_jobs,
          isloaded: true,
        });
      })
      .catch((err) => console.log(err));
  }
  changeSession = () => {
    console.log("Function of did mount");
    const token = "Token " + "8ecaf39a5a0b2e2e20cf0c4bd969de714f3dcafb";
    let headers = {
      Authorization: token,
    };
    let data = {
      email: "anshlehri0599@gmail.com",
      jobs_session: this.currSess,
      user_jobs_list_exist: "True",
    };
    axios
      .post(
        "https://singularjobapi-dev.herokuapp.com/user_account/myjobs/",
        data,
        { headers: headers }
      )
      .then((res) => {
        console.log("componentdidmount");
        console.log(res);
        this.setState({
          data: res.data.recommend_jobs,
          isloaded: true,
        });
      })
      .catch((err) => console.log(err));
  };

  leftSession = (e) => {
    e.preventDefault();
    console.log(this.currSess);
    if (this.currSess === 7) this.currSess = 12;
    else this.currSess = this.currSess - 1;
    console.log(this.currSess);
    this.setState({ isloaded: false });
    this.changeSession();
  };
  rightSession = (e) => {
    e.preventDefault();
    console.log(this.currSess);
    if (this.currSess === 12) this.currSess = 7;
    else this.currSess = this.currSess + 1;
    console.log(this.currSess);
    this.setState({ isloaded: false });

    this.changeSession();
  };

  render() {
    const isLoaded = this.state.isloaded;
    // console.log(isLoaded);
    if (isLoaded === true) {
      console.log(this.currSess);
      return (
        <>
          <div class="d-flex justify-content-between" id="avtar-bar">
            <h4>{cookies.get("user_username")}'s Jobs</h4>
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown button
              </button>
              
            </div>
            <Avatar
              id="avatar"
              sx={{ bgcolor: deepPurple[500] }}
              onClick={this.toggle_setting_func}
            >
              {cookies.get("user_username")[0].toUpperCase()}
            </Avatar>
          </div>
          {this.state.data.length === 0 && (
            <h1>No more jobs in this or previous session</h1>
          )}
          <JobPage data={this.state.data} />
          <div id="session-btn" className="d-flex justify-content-center">
            <Button variant="outline-light" onClick={this.leftSession}>
              {" "}
              Previous{" "}
            </Button>
            <Button
              variant="outline-dark"
              onClick={this.rightSession}
              className="ml-2"
            >
              {" "}
              Next{" "}
            </Button>
          </div>
        </>
        // <h1>Agraj</h1>
      );
    } else {
      // this.func();
      return (
        <>
          <div class="d-flex justify-content-between" id="avtar-bar">
            <h4>{cookies.get("user_username")}'s Jobs</h4>
            <Avatar
              id="avatar"
              sx={{ bgcolor: deepPurple[500] }}
              onClick={this.toggle_setting_func}
            >
              {cookies.get("user_username")[0].toUpperCase()}
            </Avatar>
          </div>
          <div>
            <h2>
              Your Jobs are Loading...
              <CircularProgress className="ml-2 p-2" />
            </h2>
          </div>
        </>
      );
    }
  }
}

export default Jobfetch;
