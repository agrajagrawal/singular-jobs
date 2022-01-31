import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import _ from "lodash";

// Collapsive Imports
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
import { CircularProgress, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Main from './Main'
import { Dropdown } from 'react-bootstrap';

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
export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: cookies.get("user_mail"),
      user_interests: {
        technical_skills: "",
        soft_skills: "",
        subject_interests: "",
        job_type: "",
        linkedin_profile: "",
      },
      jobs_per_session: 40,
      preferred_platforms: { 
        platforms : ['linkedin','shine.com','internshala','naukri.com'],
      },
      looking_for_jobs: true,
      user_jobs_list_exist: "False",
      mails_one_day: 4,
      expanded1: false,
      expanded2: false,
      toggle_setting: false,
      is_loading: false,
      anchorEl: null,
      open: false,
      // new_obj : '["linkedin","star"]'
    };
    this.is_loading = false;
  }

  // Avatar;
  handleClick = (event) => {
    event.preventDefault();
    this.setState({ anchorEl: event.currentTarget });
    this.setState({ open: Boolean(this.state.anchorEl) });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
    this.setState({ open: Boolean(this.state.anchorEl) });
  };
  // Avatar;

  // Collapsive Imports
  toggle_setting_func = () => {
    this.setState({ toggle_setting: true });
  };
  handleExpandClick1 = () => {
    this.setState({ expanded1: !this.state.expanded1 });
  };
  handleExpandClick2 = () => {
    this.setState({ expanded2: !this.state.expanded2 });
  };

  async componentDidMount() {
    this.setState({ is_loading: true });
    // toast("You are being redirected to update skills.");
    cookies.set("visit_profile", true, { path: "/" });
    if (cookies.get("user_profile")) {
      this.setState(cookies.get("user_profile"));
      this.setState({ is_loading: false });
      console.log(this.state);
    } else {
      const data_here = JSON.stringify({ email: cookies.get("user_mail") });
      await axios
        .post(
          "https://singularjobapi-dev.herokuapp.com/user_account/check_userprofile/",
          data_here,
          {
            headers: {
              "content-type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log("API Data");
          console.log(res);
          // toast(res.data.message);
          if (Math.floor(res.data.user_status / 100) === 4) {
            cookies.set("user_registered", false, { path: "/" });
            this.setState({ is_loading: false });
          } else {
            cookies.set("user_registered", true, { path: "/" });
            console.log("User ka data check profile ke baad");
            console.log(res.data);
            this.setState({
              user_interests: res.data.user_profile.user_interests,
            });
            this.setState({
              jobs_per_session: res.data.user_profile.jobs_per_session,
            });
            this.setState({
              looking_for_jobs: res.data.user_profile.looking_for_jobs,
            });
            this.setState({
              mails_one_day: Number(res.data.user_profile.mails_one_day),
            });
            this.setState({
              preferred_platforms :  {
                platforms : res.data.user_profile.preferred_platforms
              }
            });
            cookies.set("user_profile", this.state, { path: "/" });
            this.setState({ is_loading: false });
            console.log(cookies.get("user_profile") );
            console.log( (res.data.user_profile.mails_one_day));
          }
        })
        .catch((err) => {
          console.log(err);
          this.setState({ is_loading: false });
        });
    }
    this.setState({ anchorEl: null });
    this.setState({ open: false });
    // this.setState({ is_loading: false });
  }
  changeHandler2 = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };
  submitHandler2 = (event) => {
    event.preventDefault();
    this.setState({ is_loading: true });
    if (this.state.jobs_per_session % 10 !== 0) {
      alert("Jobs per Session shoule be multiple of 10");
      return;
    }
    this.is_loading = !this.is_loading;
    const token = "Token " + cookies.get("user_token");
    let headers = {
      Authorization: token,
    };
    console.log(token);
    if (
      _.isEqual(
        JSON.stringify(this.state),
        JSON.stringify(cookies.get("user_profile"))
      )
    ) {
      toast("Nothing to update");
      this.is_loading = !this.is_loading;

      this.setState({ is_loading: false });
    } else {
      axios
        .patch(
          "https://singularjobapi-dev.herokuapp.com/user_account/update/",
          this.state,
          { headers: headers }
        )
        .then((res) => {
          toast(res.data.message);
          console.log(res);
          cookies.set("user_profile", this.state, { path: "/" });
          this.is_loading = !this.is_loading;
          this.setState({ is_loading: false });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ is_loading: false });
        });
    }
  };
  changeHandler = (e) => {
    const new_data = {
      ...this.state.user_interests,
      [e.target.name]: e.target.value,
    };
    const new_dict = { ...this.state, user_interests: new_data };
    this.setState(new_dict);
  };
  validate = () => {
    if (
      this.state.looking_for_jobs === "Yes" ||
      this.state.looking_for_jobs === "No" ||
      this.state.looking_for_jobs === true ||
      this.state.looking_for_jobs === false
    ) {
      if (
        this.state.looking_for_jobs === "Yes" ||
        this.state.looking_for_jobs === true
      )
        this.setState({ looking_for_jobs: true });
      else this.setState({ looking_for_jobs: false });
      return false;
    } else {
      alert("Looking for jobs can only have value Yes/No");
      return true;
    }
  };
  submitHandler = async (e) => {
    e.preventDefault();
    this.setState({ is_loading: true });

    if (this.state.jobs_per_session % 10 !== 0) {
      alert("Jobs per Session shoule be multiple of 10");
      this.setState({ is_loading: false });

      return;
    }
    this.is_loading = !this.is_loading;

    if (this.validate()) {
      this.setState({ is_loading: false });
      return;
    }
    // this.setState({ is_loading: true });
    console.log(cookies.get("user_registered"));
    const token = "Token " + cookies.get("user_token");
    let headers = {
      Authorization: token,
    };
    if (cookies.get("user_registered") === "true") {
      console.log("Yes I am registered");
      if (
        _.isEqual(
          JSON.stringify(this.state.user_interests),
          JSON.stringify(cookies.get("user_profile").user_interests)
        ) &&
        _.isEqual(
          JSON.stringify(this.state.looking_for_jobs),
          JSON.stringify(cookies.get("user_profile").looking_for_jobs)
        ) &&
        _.isEqual(
          JSON.stringify(this.state.jobs_per_session),
          JSON.stringify(cookies.get("user_profile").jobs_per_session)
        )
      ) {
        toast("Nothing to update");
        this.is_loading = !this.is_loading;

        this.setState({ is_loading: false });
      } else {
        console.log(typeof this.state.user_interests.technical_skills);
        await axios
          .post(
            "https://singularjobapi-dev.herokuapp.com/user_account/entity_matching/",
            this.state.user_interests
          )
          .then((res) => {
            console.log("entity ka data");
            console.log(res);
            const new_data = {
              ...this.state.user_interests,
              technical_skills: res.data.technical_skills,
            };
            const new_dict = { ...this.state, user_interests: new_data };
            this.setState(new_dict);
            console.log(this.state);
            cookies.set("user_profile", this.state, { path: "/" });
            console.log("first");
            // this.is_loading = !this.is_loading;
            // this.setState({ is_loading: false });

            // this.setState({ is_loading: false });
          })
          .catch((err) => {
            console.log(err);
            this.setState({ is_loading: false });
          });
        console.log("second");
        await axios
          .patch(
            "https://singularjobapi-dev.herokuapp.com/user_account/update/",
            this.state,
            { headers: headers }
          )
          .then((res) => {
            toast(res.data.message);
            console.log(res);
            console.log("third");
            cookies.set("user_profile", this.state, { path: "/" });
            this.is_loading = !this.is_loading;
            this.setState({ is_loading: false });
          })
          .catch((err) => {
            console.log(err);
            this.setState({ is_loading: false });
          });
        console.log("fourth");
      }
    } else {
      console.log("Yes I am no registered");
      await axios
        .post(
          "https://singularjobapi-dev.herokuapp.com/user_account/entity_matching/",
          this.state.user_interests
        )
        .then((res) => {
          console.log(res);
          const new_data = {
            ...this.state.user_interests,
            technical_skills: res.data.technical_skills,
          };
          const new_dict = { ...this.state, user_interests: new_data };
          this.setState(new_dict);
          console.log(this.state);
          cookies.set("user_profile", this.state, { path: "/" });
        })
        .catch((err) => {
          console.log(err);
        });

      await axios
        .post(
          "https://singularjobapi-dev.herokuapp.com/user_account/create/",
          this.state,
          { headers: headers }
        )
        .then((res) => {
          toast(res.data.message);
          console.log(res);
          cookies.set("user_registered", true, { path: "/" });
          cookies.set("profile_changed", true, { path: "/" });
          cookies.set("user_job_list_exits", false, { path: "/" });
          cookies.set("user_profile", this.state, { path: "/" });
          this.is_loading = !this.is_loading;
          this.setState({ is_loading: false });

          // this.setState({ is_loading: false });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ is_loading: false });
        });
    }
  };
  render() {
    // console.log(JSON.parse(this.state.new_obj))
    console.log(cookies.get("user_profile"));
    if (!cookies.get("user_token")) {
      return <Navigate to="/signin" />;
    }
    if (this.state.toggle_setting) {
      return <Navigate to="/settings" />;
    }
    return (
      <>
        {this.state.is_loading && (
          <>
            <CircularProgress className="ml-2 p-2 spinning-wheel" size="10" />
            <div id="overlay"></div>
          </>
        )}{" "}
        <section className="vh-100">
          <div class="d-flex justify-content-between mb-2" id="avtar-bar">
            <h4>{cookies.get("user_username")}'s profile</h4>

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
          <p className="px-3 text-center mt-3">
            {" "}
            Your preferences are used to organise list of suitable jobs for you.{" "}
          </p>
          <form onSubmit={this.submitHandler} className="">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 ">
                  <div className="card ">
                    <div
                      className="card-body text-center"
                      id="profile-skill-card"
                    >
                      <div className="text-center">
                        <div className="">
                          <CardActions disableSpacing className="">
                            {/* <IconButton aria-label="add to favorites">
                            </IconButton> */}
                            {/* <FavoriteIcon /> */}
                            {/* <IconButton aria-label="share">
                              <ShareIcon />
                            </IconButton> */}
                            <h4
                              className="fw-bold text-uppercase"
                              id="skills-section"
                            >
                              {/* <FavoriteIcon /> */}
                              {/* <ComputerIcon size="10px"/> */}
                              Skills and Interests
                            </h4>
                            <ExpandMore
                              expand={this.state.expanded1}
                              onClick={this.handleExpandClick1}
                              aria-expanded={this.state.expanded1}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse
                            in={this.state.expanded1}
                            timeout="auto"
                            unmountOnExit
                          >
                            <div className="row">
                              <div className="col-12 col-lg-6 col-sm-12">
                                <div className="form-outline">
                                  <label
                                    className="form-label mt-3 float-left"
                                    htmlFor="TechnicalSkills"
                                  >
                                    Technical Skills <span style={{color:"red"}}>*</span>
                                  </label>
                                  <input
                                    name="technical_skills"
                                    type="text"
                                    placeholder="reactJs,nodejs"
                                    id="TechnicalSkills inputsm"
                                    className="form-control form-control-lg input-sm"
                                    value={
                                      this.state.user_interests.technical_skills
                                    }
                                    onChange={this.changeHandler}
                                    required
                                  />
                                </div>
                                <div className="form-outline  ">
                                  <label
                                    className="form-label mt-3 float-left"
                                    htmlFor="SoftSkills"
                                  >
                                    Soft Skills
                                  </label>
                                  <input
                                    name="soft_skills"
                                    type="text"
                                    id="SoftSkills"
                                    placeholder="leadership,gd"
                                    className="form-control form-control-lg"
                                    value={
                                      this.state.user_interests.soft_skills
                                    }
                                    onChange={this.changeHandler}
                                  />
                                </div>
                                <div className="form-outline  ">
                                  <label
                                    className="form-label mt-3 float-left"
                                    htmlFor="SubjectInterest"
                                  >
                                    Subject Interest
                                  </label>
                                  <input
                                    name="subject_interests"
                                    type="text"
                                    id="SubjectInterest"
                                    placeholder="os,ml"
                                    className="form-control form-control-lg"
                                    value={
                                      this.state.user_interests
                                        .subject_interests
                                    }
                                    onChange={this.changeHandler}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-lg-6 col-sm-12">
                                <div className="form-outline">
                                  <label
                                    className="form-label mt-3 float-left"
                                    htmlFor="JobType"
                                  >
                                    Job Type
                                  </label>
                                  <input
                                    name="job_type"
                                    type="text"
                                    placeholder="intern,full-time"
                                    id="JobType"
                                    className="form-control form-control-lg"
                                    value={this.state.user_interests.job_type}
                                    onChange={this.changeHandler}
                                  />
                                  <div className="form-outline  ">
                                    <label
                                      className="form-label mt-3 float-left"
                                      htmlFor="LinkedInProfile"
                                    >
                                      LinkedIn Profile
                                    </label>
                                    <input
                                      name="linkedin_profile"
                                      type="text"
                                      id="LinkedInProfile"
                                      placeholder="https://www.linkedin.com/in/john19/"
                                      pattern="^http(s)?:\/\/(www\.)?linkedin\.com\/in\/.*$" 
                                      className="form-control form-control-lg"
                                      value={
                                        this.state.user_interests
                                          .linkedin_profile
                                      }
                                      onChange={this.changeHandler}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Collapse>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mt-2">
                    <div
                      className="card-body text-center"
                      id="profile-skill-card"
                    >
                      <div className="">
                        <CardActions disableSpacing className="">
                          <h4 className="fw-bold text-uppercase">
                            Job Defaults
                          </h4>
                          <ExpandMore
                            expand={this.state.expanded2}
                            onClick={this.handleExpandClick2}
                            aria-expanded={this.state.expanded2}
                            aria-label="show more"
                          >
                            <ExpandMoreIcon />
                          </ExpandMore>
                        </CardActions>

                        <Collapse
                          in={this.state.expanded2}
                          timeout="auto"
                          // unmountOnExit
                        >
                          {/* <form onSubmit={this.submitHandler} className=""> */}
                          <div className="d-flex justify-content-center row">
                            <div className="col-12 col-lg-6">
                              <div className="form-outline mt-3">
                                <label
                                  className="form-label float-left"
                                  htmlFor="typeEmailX"
                                >
                                  Number of Jobs per Session
                                </label>
                                <input
                                  type="number"
                                  min="10"
                                  max="50"
                                  name="jobs_per_session"
                                  id="typeEmailX"
                                  className="form-control form-control-lg"
                                  // value="30"
                                  value={this.state.jobs_per_session}
                                  onChange={this.changeHandler2}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="form-outline  mt-3">
                                <label
                                  className="form-label float-left"
                                  htmlFor="typePasswordX"
                                >
                                  Looking for the jobs (Yes/No)
                                </label>
                                {/* <select
                                name="looking_for_jobs"
                                id=""
                                className="form-control form-control-lg"
                                value={this.state.looking_for_jobs}
                                onChange={this.changeHandler2}
                              >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                              </select> */}
                                <input
                                  type="text"
                                  name="looking_for_jobs"
                                  id="typePasswordX"
                                  className="form-control form-control-lg"
                                  value={
                                    this.state.looking_for_jobs === true
                                      ? "Yes"
                                      : this.state.looking_for_jobs === false
                                      ? "No"
                                      : this.state.looking_for_jobs
                                  }
                                  onChange={this.changeHandler2}
                                  // placeholder="Yes/No"
                                />
                              </div>
                            </div>
                          </div>

                          {/* </form> */}
                        </Collapse>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-4">
              <button
                className="btn btn-outline-dark btn-lg px-5"
                type="submit"
              >
                Update
              </button>
              {
                // console.log("IS_LOADING" + this.is_loading)
                // this.is_loading && <CircularProgress className="ml-2 p-2" />
              }{" "}
            </div>
          </form>
        </section>
      </>
    );
  }
}

export default Profile;
