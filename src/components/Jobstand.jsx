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
import { Avatar, Menu, MenuItem } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SettingsIcon from "@mui/icons-material/Settings";
import { CircularProgress} from "@mui/material";
import { toast } from "react-toastify";
import {Dropdown} from "react-bootstrap"
// import { Navigate } from "react-router-dom";

import axios from "axios"
import LogoutIcon from "@mui/icons-material/Logout";
const cookies = new Cookies();

export class Jobstand extends Component {
  constructor(props) {
    super(props);

    this.state = {
      go_to_setting: false,
      preferred_platforms: "",
      is_loading : false,
      backToProfile : false
    };
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
    if(!cookies.get("user_profile")) {
      this.setState({backToProfile : true});
      toast("Create you profile First");
      return ;
    }
    this.setState({ anchorEl: null });
    this.setState({ open: false });
    this.setState({ preferred_platforms : cookies.get("user_profile").preferred_platforms});
    console.log(this.state);
  }
  clicked = (obj) => {
    // console.log(obj.toLowerCase());
    // console.log((this.state.preferred_platforms.platforms[1]));
    const array = this.state.preferred_platforms.platforms;
    if (array.find((ele) => ele === obj.toLowerCase())) {
      console.log("Yes");
      const index = array.indexOf(obj.toLowerCase());
      array.splice(index, 1);
      // console.log(array);
      const new_obj = {
        platforms: array,
      };
      this.setState({ preferred_platforms: new_obj });
      // console.log(this.state);
    } else {
      console.log("No");
      array.push(obj.toLowerCase());
      console.log(array);
      const new_obj = {
        platforms: array,
      };
      this.setState({ preferred_platforms: new_obj });
      // console.log(this.state);
    }
    // console.log((this.state.preferred_platforms.platforms).find((ele) => ele === obj.toLowerCase()))
  };
  toggle_setting = () => {
    console.log("Clicked");
    this.setState({ go_to_setting: true });
  };
  submitHandle = (e) => {
    e.preventDefault();
    this.setState({is_loading : true});
    const dict = {
      ...cookies.get("user_profile"),
      preferred_platforms : this.state.preferred_platforms
    }
    console.log(dict)
    cookies.set("user_profile", dict , { path: "/" });
    const token = "Token " + cookies.get("user_token");
    let headers = {
      Authorization: token,
    };
    axios
        .patch(
          "https://singularjobapi-dev.herokuapp.com/user_account/update/",
           cookies.get("user_profile"),
          { headers: headers }
        )
        .then((res) => {
          console.log(res);
          this.setState({ is_loading: false });
          toast(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          this.setState({ is_loading: false });
        });

  }
  render() {
    if(this.state.backToProfile) {
      return <Navigate to="/profile"/>
    }
    console.log("yes");
    // console.log(this.state);
    console.log(cookies.get("user_profile"));
    // console.log(this.state.preferred_platforms.platforms);
    const { go_to_setting } = this.state;
   
    if (go_to_setting) {
      return <Navigate to="/settings" />;
    }
    // console.log(this.state);
    return (
      <>
      {this.state.is_loading && (
        <>
          <CircularProgress className="ml-2 p-2 spinning-wheel" size="10" />
          <div id="overlay"></div>
        </>
      )}
      <div>
        <div class="d-flex justify-content-between mb-2" id="avtar-bar">
          <h4>{cookies.get("user_username")}'s jobstand</h4>
          <div id="avatar-div" >
              <Dropdown>
                <Dropdown.Toggle className="dropdown-basic" style={{ borderRadius: "50px", backgroundColor: "#363064", color: "#363064" , fontSize : "0px" }} >
                  
                  <i class="fas fa-user fa-1x" ></i>{" "}

                </Dropdown.Toggle>

                <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">
                    <Link className="nav-link" to="/faq">
                      {" "}
                      <strong style={{ color: "#363064" }}>FAQ </strong>

                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-1">
                    <Link className="nav-link" to="/logout">
                      {" "}
                      <strong style={{ color: "#363064" }}>Sign Out</strong>
                    </Link>
                  </Dropdown.Item>
                  

                </Dropdown.Menu>
              </Dropdown>
            </div>
        </div>
        <p style={{padding : "0 30px"}}>Unselect Your Non Trusted Platforms.</p>
        <div className="row job-row">
          
          {platforms.map((job) => {
            const { id, company, description, image } = job;
            return (
              <Stands
                id={id}
                company={company}
                description={description}
                image={image}
                // followed={true}
                followed={Boolean(
                  this.state.preferred_platforms.platforms.find(
                    (ele) => ele === company.toLowerCase()
                  )
                )}
                clicked={this.clicked}
              />
            );
          })}
        </div>
        <div className="d-flex justify-content-center align-items-center mt-2">
          <form action="" onSubmit={this.submitHandle} className="mb-5">
          <button className="btn btn-outline-dark btn-lg px-5" type="submit">
            Update
          </button>
          </form>
        </div>
      </div>
      </>
    );
  }
}

export default Jobstand;
