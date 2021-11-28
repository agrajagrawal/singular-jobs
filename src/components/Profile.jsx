import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";

// Collapsive Imports
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
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
      preferred_platforms: "all",
      looking_for_jobs: "True",
      user_jobs_list_exist: "False",
      mails_one_day: 4,
      expanded1: false,
      expanded2: false,
    };
  //  this.expanded1 = false;
  //  this.expanded2 = false;

  }
  // Collapsive Imports

  handleExpandClick1 = () => {
    // this.expanded1 = !this.expanded1;
    this.setState({ expanded1: !this.state.expanded1 });
  };
  handleExpandClick2 = () => {
    // this.expanded1 = !this.expanded1;

    this.setState({ expanded2: !this.state.expanded2 });
  };

  componentDidMount() {
    if (cookies.get("user_profile")) {
      this.setState(cookies.get("user_profile"));
      console.log(this.state);
    } else {
      const data_here = JSON.stringify({ email: cookies.get("user_mail") });
      axios
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
          console.log(res);
          // toast(res.data.message);
          if (Math.floor(res.data.user_status / 100) === 4) {
            cookies.set("user_registered", false, { path: "/" });
          } else {
            cookies.set("user_registered", true, { path: "/" });
            console.log("User ka data check profile ke baad");
            console.log(res.data);
            this.setState({ user_interests: res.data.user_profile.user_interests });
            this.setState({ jobs_per_session : res.data.user_profile.jobs_per_session});
            this.setState({ looking_for_jobs : res.data.user_profile.looking_for_jobs});
            // jobs_per_session: 40,
            // preferred_platforms: "all",
            // looking_for_jobs: "True",
            // user_jobs_list_exist: "False",
            // mails_one_day: 4,
            // this.setState(res.data);
            cookies.set("user_profile", this.state, { path: "/" });
          }
        })
        .catch((err) => console.log(err));
    }
  }
  changeHandler2 = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };
  submitHandler2 =  (event) => {
    event.preventDefault();
    // e.preventDefault();
    // e.preventDefault();
    // e.preventDefault();
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
        })
        .catch((err) => {
          console.log(err);
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

  submitHandler = async (e) => {
    e.preventDefault();
    console.log(cookies.get("user_registered"));
    const token = "Token " + cookies.get("user_token");
    let headers = {
      Authorization: token,
    };
    if (cookies.get("user_registered") === "true") {
      console.log("Yes I am registered");
      if (
        _.isEqual(
          JSON.stringify(this.state),
          JSON.stringify(cookies.get("user_profile"))
        )
      ) {
        toast("Nothing to update");
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
          })
          .catch((err) => {
            console.log(err);
          });
        console.log("second");
        await axios
          .patch(
            "https://singularjobapi-dev.herokuapp.com/user_account/update/",
            this.state,
            { headers: headers }
          )
          .then((res) => {
            // toast(res.data.message);
            console.log(res);
            console.log("third");
            cookies.set("user_profile", this.state, { path: "/" });
          })
          .catch((err) => {
            console.log(err);
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
          console.log(res);
          cookies.set("user_registered", true, { path: "/" });
          cookies.set("profile_changed", true, { path: "/" });
          cookies.set("user_job_list_exits", false, { path: "/" });
          cookies.set("user_profile", this.state, { path: "/" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  render() {
    if (!cookies.get("user_token")) {
      return <Navigate to="/signin" />;
    }
    return (
      <section className="vh-100">
        <div class="d-flex justify-content-between mb-2" id="avtar-bar">
          <h4>{cookies.get("user_username")}'s profile</h4>
          <div id="avatar" onClick={this.toggle_setting}></div>
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
                  <div className="card-body text-center">
                    <div className=" p-1 text-center">
                      <div className=" pb-2">
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
                            <div className="col col-lg-6 col-sm-12">
                              <div className="form-outline">
                                <label
                                  className="form-label mt-3 float-left"
                                  htmlFor="TechnicalSkills"
                                >
                                  Technical Skills
                                </label>
                                <input
                                  name="technical_skills"
                                  type="text"
                                  id="TechnicalSkills inputsm"
                                  className="form-control form-control-lg input-sm"
                                  value={
                                    this.state.user_interests.technical_skills
                                  }
                                  onChange={this.changeHandler}
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
                                  className="form-control form-control-lg"
                                  value={this.state.user_interests.soft_skills}
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
                                  className="form-control form-control-lg"
                                  value={
                                    this.state.user_interests.subject_interests
                                  }
                                  onChange={this.changeHandler}
                                />
                              </div>
                            </div>
                            <div className="col col-lg-6 col-sm-12">
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
                                    className="form-control form-control-lg"
                                    value={
                                      this.state.user_interests.linkedin_profile
                                    }
                                    onChange={this.changeHandler}
                                  />
                                </div>
                                <div className="col-lg-6 mt-3 profile-button">
                                  <button
                                    className="btn btn-dark btn-lg px-5 ml-5 mt-3"
                                    type="submit"
                                  >
                                    Update Profile
                                  </button>
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
                  <div className="card-body text-center">
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
                          <div className="form-outline">
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

                          <div className="form-outline  mt-3">
                            <label
                              className="form-label float-left"
                              htmlFor="typePasswordX"
                            >
                              Looking for the jobs (True/False)
                            </label>
                            <input
                              type="text"
                              name="looking_for_jobs"
                              id="typePasswordX"
                              className="form-control form-control-lg"
                              value={this.state.looking_for_jobs}
                              onChange={this.changeHandler2}
                              placeholder="Yes/No"
                            />
                          </div>

                          <div className="form-outline  mt-3">
                            <label
                              className="form-label float-left"
                              htmlFor="typePasswordX"
                            >
                              Mails in One day
                            </label>
                            <input
                              type="number"
                              name="password"
                              id="typePasswordX"
                              min="0"
                              max="5"
                              className="form-control form-control-lg"
                              // value={}
                              // onChange={this.changeHandler}
                            />
                          </div>

                          <div className="justify-content-center align-items-center mt-4">
                            <button
                              className="btn btn-outline-dark btn-lg px-5"
                              type="submit"
                            >
                              Submit
                            </button>
                          </div>
                        {/* </form> */}
                      </Collapse>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    );
  }
}

export default Profile;
