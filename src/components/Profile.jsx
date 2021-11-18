import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      technical_skills: "",
      soft_skills: "",
      subject_interests: "",
      job_type: "",
      linkedin_profile: "",
      email: cookies.get("user_mail"),
    };
  }
  changeHandler = (e) => {
    // console.log(e.target.value);
    this.setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);
    const token = "Token " + cookies.get("user_token");
    let headers = {
      Authorization: token,
    };
    //  let data = this.state;
    axios
      .post(
        "https://singularjobapi-dev.herokuapp.com/user_account/create/",
        this.state,
        { headers: headers }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <section className="vh-100">
        <form onSubmit={this.submitHandler}>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 ">
                <div className="card ">
                  <div className="card-body text-center">
                    <div className="card-body p-5 text-center">
                      <div className=" pb-5">
                        <h2 className="fw-bold mb-2 text-uppercase">Profile</h2>
                        <p className=" mb-5">
                          Keep Your profile updated for better Feed!
                        </p>
                        <div className="row">
                          <div className="col col-lg-6 col-sm-12">
                            <div className="form-outline">
                              <label
                                className="form-label mt-2"
                                for="TechnicalSkills"
                              >
                                Technical Skills
                              </label>
                              <input
                                name="technical_skills"
                                type="text"
                                id="TechnicalSkills"
                                className="form-control form-control-lg"
                                onChange={this.changeHandler}
                              />
                              <div className="form-outline  ">
                                <label
                                  className="form-label mt-2"
                                  for="SoftSkills"
                                >
                                  Soft Skills
                                </label>
                                <input
                                  name="soft_skills"
                                  type="text"
                                  id="SoftSkills"
                                  className="form-control form-control-lg"
                                  onChange={this.changeHandler}
                                />
                              </div>
                              <div className="form-outline  ">
                                <label
                                  className="form-label mt-2"
                                  for="SubjectInterest"
                                >
                                  Subject Interest
                                </label>
                                <input
                                  name="subject_interests"
                                  type="text"
                                  id="SubjectInterest"
                                  className="form-control form-control-lg"
                                  onChange={this.changeHandler}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col col-lg-6 col-sm-12">
                            <div className="form-outline">
                              <label className="form-label mt-2" for="JobType">
                                Job Type
                              </label>
                              <input
                                name="job_type"
                                type="text"
                                id="JobType"
                                className="form-control form-control-lg"
                                onChange={this.changeHandler}
                              />
                              <div className="form-outline  ">
                                <label
                                  className="form-label mt-2"
                                  for="LinkedInProfile"
                                >
                                  LinkedIn Profile
                                </label>
                                <input
                                  name="linkedin_profile"
                                  type="text"
                                  id="LinkedInProfile"
                                  className="form-control form-control-lg"
                                  onChange={this.changeHandler}
                                />
                              </div>
                              <div className="col-lg-6 mt-2">
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
