import React, { Component } from "react";
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { validEmail, validPassword } from "./Regex";

import _ from "lodash";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { deepOrange, deepPurple } from "@mui/material/colors";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ComputerIcon from "@mui/icons-material/Computer";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgress } from "@mui/material";
const cookies = new Cookies();

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export class settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email : cookies.get("user_mail"),
      new_password : "",
      confirmpassword : "",
      profile_expand: false,
      security_expand : false,
      general_expand : false,
      is_loading : false,
    };
  }
  validate_form = () => {
    // console.log("Ghus gaye valid mein");
    if (!validPassword.test(this.state.new_password)) {
      this.password_err = true;
      alert("Invalid Password");
    } else {
      this.password_err = false;
      console.log("Password mein to sb thik");
    }
    if (this.state.password !== this.state.confirmpassword) {
      this.confirm_password_err = true;
      alert("Password should Match");
    } else {
      this.confirm_password_err = false;
    }
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value }); 
   }
  profile_expand_click = () => {
    this.setState({ profile_expand: !this.state.profile_expand });
  };
  general_expand_click = () => {
    this.setState({ general_expand: !this.state.general_expand });
  };
  security_expand_click = () => {
    this.setState({ security_expand: !this.state.security_expand });
  };
  submitHandler = async(e) => {
    e.preventDefault();
    this.setState({is_loading : true});
    this.validate_form();
    if (this.password_err || this.confirm_password_err) {
      console.log("idhar");
      this.setState({is_loading : false});
      return;
    }
    console.log(this.state);
    await axios.patch("https://singularjobapi-dev.herokuapp.com/user_account/change_password/",this.state) 
    .then((res) => {
        if(res.data.status === "201") {
            toast("A mail has been sent to you");
            this.setState({ redirect : true });
        }
        console.log(res)})
    .catch((err) => {console.log(err)})
    this.setState({is_loading : false});
  }
  render() {
    if (!cookies.get("user_token")) {
      return <Navigate to="/signin" />;
    }
    if (cookies.get("user_registered") !== "true") {
      return <Navigate to="/profile" />;
    }
    return (
      <>
      <div class="d-flex justify-content-between" id="avtar-bar">
          <h4>{cookies.get("user_username")}'s settings</h4>
          <Avatar id="avatar" sx={{ bgcolor: deepPurple[500] }} onClick={this.toggle_setting_func}>{cookies.get("user_username")[0].toUpperCase()}</Avatar>
        </div>
      <section className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 ">
            <p>Account Details</p>
            <div className="card ">
              <div className="card-body text-center" id="profile-skill-card">
                <div className="text-center">
                  <CardActions disableSpacing className="">
                    <h4 className="fw-bold text-uppercase" id="skills-section">
                      Profile
                    </h4>
                    <ExpandMore
                      expand={this.state.profile_expand}
                      onClick={this.profile_expand_click}
                      aria-expanded={this.state.profile_expand}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse
                    in={this.state.profile_expand}
                    timeout="auto"
                    unmountOnExit
                  >
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <div className="form-outline">
                          <label
                            className="form-label float-left  mt-3"
                            htmlFor="TechnicalSkills"
                          >
                            UserName
                          </label>
                          <input
                            name="technical_skills"
                            type="text"
                            id="TechnicalSkills inputsm"
                            className="form-control form-control-lg input-sm"
                            value={cookies.get("user_username")}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <div className="form-outline">
                          <label
                            className="form-label float-left  mt-3"
                            htmlFor="TechnicalSkills"
                          >
                            Email
                          </label>
                          <input
                            name="technical_skills"
                            type="text"
                            id="TechnicalSkills inputsm"
                            className="form-control form-control-lg input-sm"
                            value={cookies.get("user_mail")}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>
              </div>
            </div>
            <p className="mt-4">Security Settings</p>
            <div className="card ">
              <div className="card-body text-center" id="profile-skill-card">
                <div className="text-center">
                  <CardActions disableSpacing className="">
                    <h4 className="fw-bold text-uppercase" id="skills-section">
                      Password Reset
                      {/* {this.state.is_loading && <CircularProgress className="ml-2 p-2"/>}{" "} */}
                    </h4>
                    <ExpandMore
                      expand={this.state.security_expand}
                      onClick={this.security_expand_click}
                      aria-expanded={this.state.security_expand}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse
                    in={this.state.security_expand}
                    timeout="auto"
                    unmountOnExit
                  >
                    <form onSubmit={this.submitHandler}>
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <div className="form-outline">
                          <label
                            className="form-label float-left mt-3"
                            htmlFor="TechnicalSkills"
                          >
                            Email
                          </label>
                          <input
                            name="technical_skills"
                            type="text"
                            id="TechnicalSkills inputsm"
                            className="form-control form-control-lg input-sm"
                            value={cookies.get("user_mail")}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <div className="form-outline">
                          <label
                            className="form-label float-left  mt-3"
                            htmlFor="TechnicalSkills"
                          >
                            Password
                          </label>
                          <input
                            name="new_password"
                            type="password"
                            id="TechnicalSkills inputsm"
                            className="form-control form-control-lg input-sm"
                            onChange={this.changeHandler}
                            value={this.state.new_password}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <div className="form-outline">
                          <label
                            className="form-label float-left mt-3"
                            htmlFor="TechnicalSkills"
                          >
                            Confirm Password
                          </label>
                          <input
                            name="confirmpassword"
                            type="password"
                            id="TechnicalSkills inputsm"
                            className="form-control form-control-lg input-sm"
                            onChange={this.changeHandler}
                            value={this.state.confirmpassword}
                            
                          />
                        </div>
                      </div>
                      <div className="col-12 col-lg-6 d-flex justify-content-center">
                      <button
                        className="btn btn-outline-dark btn-lg px-5 mt-5"
                        type="submit"
                      >
                        Submit
                      </button>
                      {this.state.is_loading && <CircularProgress className="ml-2 p-2"/>}{" "}
                        
                      </div>
                    </div>
                    </form>
                  </Collapse>
                </div>
              </div>
            </div>
            <p className="mt-3">General Settings</p>
            <div className="card ">
              <div className="card-body text-center" id="profile-skill-card">
                <div className="text-center">
                  <CardActions disableSpacing className="">
                    <h4 className="fw-bold text-uppercase" id="skills-section">
                      Feedback
                    </h4>
                    <ExpandMore
                      expand={this.state.general_expand}
                      onClick={this.general_expand_click}
                      aria-expanded={this.state.general_expand}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse
                    in={this.state.general_expand}
                    timeout="auto"
                    unmountOnExit
                  >
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <h1>Feedback </h1>
                      </div>
                      <div className="col-12 col-lg-6">
                        <h1>FAQ</h1>
                      </div>
                    </div>
                  </Collapse>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      </>
    );
  }
}

export default settings;
