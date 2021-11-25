import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";
const cookies = new Cookies();
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
    };
  }
  
  componentDidMount() {
    if (cookies.get("user_profile")) {
      this.setState(cookies.get("user_profile"));
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
            this.setState({ user_interests: res.data.user_profile });
            cookies.set("user_profile", this.state, { path: "/" });
          }
        })
        .catch((err) => console.log(err));
    }
  }
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
        <form onSubmit={this.submitHandler} className="">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 ">
                <div className="card ">
                  <div className="card-body text-center">
                    <div className=" p-1 text-center">
                      <div className=" pb-2">
                        <h4 className="fw-bold mb-2 text-uppercase align-left">Profile</h4>
                        <div className="row">
                          <div className="col-12 col-sm-12 col-xs-12 col-lg-6 col-xl-6">
                          <div className="form-outline">
                                <label
                                  className="form-label mt-3 float-left"
                                  htmlFor="SoftSkills"
                                >
                                  UserName
                                </label>
                                <input
                                  // name="soft_skills"
                                  type="text"
                                  // id="SoftSkills"
                                  className="form-control form-control-lg"
                                  value={cookies.get("user_username")}
                                  readOnly
                                />
                              </div>

                          </div>
                          <div className="col-12  col-sm-12 col-xs-12 col-lg-6 col-xl-6">
                          <div className="form-outline  ">
                                <label
                                  className="form-label mt-3 float-left"
                                  htmlFor="SoftSkills"
                                >
                                  EmailId
                                </label>
                                <input
                                  // name="soft_skills"
                                  type="text"
                                  // id="SoftSkills"
                                  className="form-control form-control-lg"
                                  value={cookies.get("user_mail")}
                                  // onChange={this.changeHandler}
                                  readOnly
                                />
                              </div>
                            
                          </div>
                        </div>
                        <hr/>
                        <h4 className="fw-bold mt-5 text-uppercase" id="skills-section">Skills</h4>

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
                      </div>
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
