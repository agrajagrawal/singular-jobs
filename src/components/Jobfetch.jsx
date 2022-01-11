import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Button from "react-bootstrap/Button";
import JobPage from "./JobsPage/JobPage";
import { Avatar, CircularProgress, Menu, MenuItem } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
// import { styled } from "@mui/system";
import { Link, Navigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { toast } from "react-toastify";
import { height } from "@mui/system";

const cookies = new Cookies();

export class Jobfetch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isloaded: false,
      backToProfile: false
    };
    this.currSess = 1;

    this.componentWillMount = this.componentWillMount.bind(this);
  }
  // Avatar
  handleClick = (event) => {
    event.preventDefault();
    this.setState({ anchorEl: event.currentTarget });
    this.setState({ open: Boolean(this.state.anchorEl) });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
    this.setState({ open: Boolean(this.state.anchorEl) });
  };
  // Avatar
  componentWillMount() {
    if (!cookies.get("user_profile")) { this.setState({ backToProfile: true }); return; }
    console.log("Function of did mount");
    const token = "Token " + cookies.get("user_token");
    let headers = {
      Authorization: token,
    };
    let data = {
      email: cookies.get("user_mail"),
      jobs_session: this.currSess,
      user_jobs_list_exist: cookies.get("user_profile").user_jobs_list_exist
    };
    axios
      .post(
        "https://singularjobapi-dev.herokuapp.com/user_account/myjobs/",
        data,
        { headers: headers }
      )
      .then((res) => {
        console.log("res data");
        console.log(res);
        const new_dict = {
          ...cookies.get("user_profile"),
          user_jobs_list_exist: "True"
        }
        cookies.set("user_profile", new_dict, { path: "/" });
        this.setState({
          data: res.data.recommend_jobs[0].jobs,
          isloaded: true,
        });
      })
      .catch((err) => console.log(err));
    this.setState({ anchorEl: null });
    this.setState({ open: false })
  }
  changeSession = () => {
    console.log("Function of did mount");
    const token = "Token " + cookies.get("user_token");
    console.log(token);
    let headers = {
      Authorization: token,
    };
    let data = {
      email: cookies.get("user_mail"),
      jobs_session: this.currSess,
      user_jobs_list_exist: cookies.get("user_profile").user_jobs_list_exist,
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
          data: res.data.recommend_jobs[0].jobs,
          isloaded: true,
        });
      })
      .catch((err) => console.log(err));
  };

  leftSession = (e) => {
    e.preventDefault();
    console.log(this.currSess);
    if (this.currSess === 1) this.currSess = 12;
    else this.currSess = this.currSess - 1;
    console.log(this.currSess);
    this.setState({ isloaded: false });
    this.changeSession();
  };
  rightSession = (e) => {
    e.preventDefault();
    console.log(this.currSess);
    if (this.currSess === 12) this.currSess = 1;
    else this.currSess = this.currSess + 1;
    console.log(this.currSess);
    this.setState({ isloaded: false });

    this.changeSession();
  };

  render() {
    const isLoaded = this.state.isloaded;
    if (this.state.backToProfile) {
      // toast("Create Your Profile First");
      return <Navigate to="/profile" />
    }
    // console.log(isLoaded);
    if (isLoaded === true) {
      console.log(this.currSess);
      return (
        <>
          <div class="d-flex justify-content-between" id="avtar-bar" style={{ height: "100%" }}>
            <h4>{cookies.get("user_username")}'s Session {this.currSess} Jobs</h4>
            <div id="avatar-div" >
              <Avatar
                id="avatar demo-customized-button"
                aria-controls="demo-customized-menu"
                aria-expanded={this.state.open ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={this.handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{ bgcolor: deepPurple[500] }}
              >
                {cookies.get("user_username")[0].toUpperCase()}{" "}
              </Avatar>

            </div>
          </div>
          {this.state.data.length === 0 && (
            <div className="d-flex justify-content-center" >

            <h1 style={{ fontSize: "2rem" , padding: "0 30px" }}>No more jobs in this or previous session</h1>
            </div>
          )}
          <JobPage data={this.state.data} />
          <div id="session-btn" className="d-flex justify-content-center" >
            <Button variant="outline-light" onClick={this.leftSession}>
              {" "}
              Previous Session{" "}
            </Button>
            {/* <p className="currSessionP">{this.currSess}</p> */}
            <Button
              variant="outline-dark"
              onClick={this.rightSession}
              className="ml-2"
            >
              {" "}
              Next Session{" "}
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
            <div id="avatar-div" >
              <Avatar
                id="avatar demo-customized-button"
                aria-controls="demo-customized-menu"
                aria-expanded={this.state.open ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={this.handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{ bgcolor: deepPurple[500] }}
              >
                {cookies.get("user_username")[0].toUpperCase()}{" "}
              </Avatar>
            </div>
          </div>
          <div > 
            <h2 style={{padding : "0 30px"}}>
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
