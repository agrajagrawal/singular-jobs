import React, { Component } from "react";
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { validEmail, validPassword } from "./Regex";

import _ from "lodash";

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
import { Button, CircularProgress, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
const cookies = new Cookies();

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    cursor: "pointer",
    marginTop: theme.spacing(3),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
      },
      "&:active": {
        backgroundColor: theme.palette.primary.main,
        // theme.palette.action.selectedOpacity
      },
    },
  },
}));
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
      email: cookies.get("user_mail"),
      new_password: "",
      number_of_mails: 4,
      confirmpassword: "",
      profile_expand: false,
      security_expand: false,
      general_expand: false,
      email_expand: false,
      is_loading: false,
      logout: false,
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
  componentDidMount() {
    this.setState({
      number_of_mails: Number(cookies.get("user_profile").mails_one_day),
    });
    this.setState({ anchorEl: null });
    this.setState({ open: false });
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
  };
  profile_expand_click = () => {
    this.setState({ profile_expand: !this.state.profile_expand });
  };
  general_expand_click = () => {
    this.setState({ general_expand: !this.state.general_expand });
  };
  security_expand_click = () => {
    this.setState({ security_expand: !this.state.security_expand });
  };
  email_expand_click = () => {
    this.setState({ email_expand: !this.state.email_expand });
  };
  submitHandler2 = async (e) => {
    e.preventDefault();
    this.setState({ is_loading: true });
    const token = "Token " + cookies.get("user_token");
    let headers = {
      Authorization: token,
    };
    const new_profile = {
      ...cookies.get("user_profile"),
      mails_one_day: Number(this.state.number_of_mails),
    };
    cookies.set("user_profile", new_profile, { path: "/" });
    await axios
      .patch(
        "https://singularjobapi-dev.herokuapp.com/user_account/update/",
        cookies.get("user_profile"),
        { headers: headers }
      )
      .then((res) => {
        toast(res.data.message);
        console.log(res);
        console.log("third");
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ is_loading: false });
  };
  submitHandler = async (e) => {
    e.preventDefault();
    this.setState({ is_loading: true });
    this.validate_form();
    if (this.password_err || this.confirm_password_err) {
      console.log("idhar");
      this.setState({ is_loading: false });
      return;
    }
    console.log(this.state);
    await axios
      .patch(
        "https://singularjobapi-dev.herokuapp.com/user_account/change_password/",
        this.state
      )
      .then((res) => {
        if (res.data.status === "201") {
          toast("A mail has been sent to you");
          this.setState({ redirect: true });
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ is_loading: false });
  };
  isLogout = () => {
    this.setState({ logout: true });
  };
  render() {
    if (!cookies.get("user_token")) {
      return <Navigate to="/signin" />;
    }
    if (cookies.get("user_registered") !== "true") {
      return <Navigate to="/profile" />;
    }
    if (this.state.logout) {
      return <Navigate to="/logout" />;
    }
    return (
      <>
        <div class="d-flex justify-content-between" id="avtar-bar">
          <h4>{cookies.get("user_username")}'s Settings</h4>
          <div id="avatar-div">
            <Avatar
              id="avatar demo-customized-button"
              aria-controls="demo-customized-menu"
              aria-haspopup="true"
              aria-expanded={this.state.open ? "true" : undefined}
              variant="contained"
              disableElevation
              onMouseOver={this.handleClick}
              onClick={this.handleClick}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{ bgcolor: deepPurple[500] }}
            >
              {cookies.get("user_username")[0].toUpperCase()}{" "}
            </Avatar>

            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={this.state.anchorEl}
              open={this.state.open}
              onClose={this.handleClose}
              onMouseDown={this.handleClose}
            >
              <MenuItem onClick={this.handleClose} disableRipple>
                <Link className="" to="/settings">
                  {" "}
                  <SettingsIcon />
                  Settings{" "}
                </Link>
              </MenuItem>
              <MenuItem onClick={this.handleClose} disableRipple>
                <Link className="" to="/logout">
                  <LogoutIcon />
                  Logout
                </Link>
              </MenuItem>
            </StyledMenu>
          </div>
        </div>
        <section className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 ">
              <p>Account Details</p>
              <div className="card ">
                <div className="card-body text-center" id="profile-skill-card">
                  <div className="text-center">
                    <CardActions disableSpacing className="">
                      <h4
                        className="fw-bold text-uppercase"
                        id="skills-section"
                      >
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
              {/* Emails in one day  */}
              <p className="mt-4">Emails Notification</p>
              <div className="card ">
                <div className="card-body text-center" id="profile-skill-card">
                  <div className="text-center">
                    <CardActions disableSpacing className="">
                      <h4
                        className="fw-bold text-uppercase"
                        id="skills-section"
                      >
                        Number of mails
                        {/* {this.state.is_loading && <CircularProgress className="ml-2 p-2"/>}{" "} */}
                      </h4>
                      <ExpandMore
                        expand={this.state.email_expand}
                        onClick={this.email_expand_click}
                        aria-expanded={this.state.email_expand}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                    <Collapse
                      in={this.state.email_expand}
                      timeout="auto"
                      unmountOnExit
                    >
                      <form onSubmit={this.submitHandler2}>
                        <div className="row">
                          <div className="col-12 col-lg-6">
                            <div className="form-outline">
                              <label
                                className="form-label float-left mt-3"
                                htmlFor="TechnicalSkills"
                              >
                                Mails you want to recieve in one day
                              </label>
                              <input
                                name="number_of_mails"
                                type="number"
                                min="0"
                                max="4"
                                id="TechnicalSkills inputsm"
                                className="form-control form-control-lg input-sm"
                                onChange={this.changeHandler}
                                value={this.state.number_of_mails}
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
                            {this.state.is_loading && (
                              <CircularProgress className="ml-2 p-2" />
                            )}{" "}
                          </div>
                        </div>
                      </form>
                    </Collapse>
                  </div>
                </div>
              </div>
              {/* Security Settings Comment */}
              <p className="mt-4">Security Settings</p>
              <div className="card ">
                <div className="card-body text-center" id="profile-skill-card">
                  <div className="text-center">
                    <CardActions disableSpacing className="">
                      <h4
                        className="fw-bold text-uppercase"
                        id="skills-section"
                      >
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
                            {this.state.is_loading && (
                              <CircularProgress className="ml-2 p-2" />
                            )}{" "}
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
                      <h4
                        className="fw-bold text-uppercase"
                        id="skills-section"
                      >
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
          <div className="d-flex justify-content-center px-5 pb-5 mt-3 mb-5">
            <Button onClick={this.isLogout}> Logout </Button>
          </div>
        </section>
      </>
    );
  }
}

export default settings;
