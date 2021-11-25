import React, { Component } from "react";
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import _ from "lodash";

const cookies = new Cookies();

export class settings extends Component {
  
  constructor(props) {
    super(props);
    this.state = cookies.get("user_profile");
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    // console.log(this.state);
  };
  submitHandler = (e) => {
    e.preventDefault();
    const token = "Token " + cookies.get("user_token");
    let headers = {
      Authorization: token,
    };
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
  render() {
    if (!cookies.get("user_token")) {
      return <Navigate to="/signin" />;
    }
    if (cookies.get("user_registered") !== "true") {
      return <Navigate to="/profile" />;
    }
    return (
      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card ">
                <div className="card-body p-5 text-center">
                  <div className="pb-5">
                    <h2 className="fw-bold mb-4 text-uppercase">Settings</h2>

                    <form onSubmit={this.submitHandler}>
                      <div className="form-outline">
                        <label className="form-label float-left" htmlFor="typeEmailX">
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
                          onChange={this.changeHandler}
                        />
                      </div>

                      <div className="form-outline  mt-3">
                        <label className="form-label float-left" htmlFor="typePasswordX">
                          Looking for the jobs (True/False)
                        </label>
                        <input
                          type="text"
                          name="looking_for_jobs"
                          id="typePasswordX"
                          className="form-control form-control-lg"
                          value={this.state.looking_for_jobs}
                          onChange={this.changeHandler}
                          placeholder="Yes/No"
                        />
                      </div>

                      <div className="form-outline  mt-3">
                        <label className="form-label float-left" htmlFor="typePasswordX">
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
                    </form>
                    <hr/>
                    <div className="justify-content-center align-items-center mt-4">
                        <button
                          className="btn btn-outline-dark btn-lg px-4"
                          type="submit"
                          onClick={<Navigate to='../logout' />}
                        >
                          Logout
                        </button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default settings;
