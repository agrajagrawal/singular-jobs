/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import { validEmail, validPassword } from "./Regex";
import axios from "axios";
// import Cookies from 'universal-cookie'
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const cookies = new Cookies();
toast.configure();

// const cookies = new Cookies();
export class Signup extends Component {
  constructor(props) {
    super(props);

    this.password_err = false;
    this.email_err = true;
    this.username_err = true;
    this.password_err = true;
    this.confirm_password_err = true;
    this.form_valid = false;

    this.state = {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      redirect: false,
      jobs_serializer: {},
      profile_serializer: {
        user_interests: {},
        jobs_per_session: 40,
        preferred_platforms: JSON.stringify({ 
         platforms : ['linkedin','shine.com','internshala','naukri.com'],
        }) , 
        looking_for_job: "true",
      },
      to_login: false,
      is_loading: false,
    };
  }
  validate_form = () => {
    console.log("Ghus gaye valid mein");
    if (!validEmail.test(this.state.email)) {
      this.email_err = true;
      alert("Invalid EmailId");
    } else {
      console.log("Email mein to sb thik");
      this.email_err = false;
    }
    if (!validPassword.test(this.state.password)) {
      this.password_err = true;
      alert("Invalid Password");
    } else {
      this.password_err = false;
      console.log("Password mein to sb thik");
    }
    if (this.state.password !== this.state.confirm_password) {
      this.confirm_password_err = true;
      alert("Password should Match");
    } else {
      this.confirm_password_err = false;
    }
  };
  changeHandler = (e) => {
    // console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };
  to_login = () => {
    this.setState({ to_login: true });
  };
  submitHandler = async (e) => {
    e.preventDefault();
    this.setState({ is_loading: true });
    this.validate_form();
    console.log(this.state);
    if (this.email_err || this.password_err || this.confirm_password_err) {
      console.log("idhar");
      this.setState({ is_loading: false });
      return;
    }
    await axios
      .post(
        "https://singularjobapi-dev.herokuapp.com/user_account/register/",
        this.state
      )
      .then((res) => {
        console.log("andar");
        console.log(res);
        if (res.data.api_status === 201) {
          alert(res.data.message[0]);
          console.log(res.data.message[0]);
          // toast(res.data.message[0]);
          this.setState({ redirect: true });
          this.setState({ is_loading: false });
        } else {
          alert(res.data.message[0]);
          this.setState({ is_loading: false });

          // console.log(res.data.message[0]);
          // toast(res.data.message[0]);
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ is_loading: false });
      });
    console.log("bahar");
    // this.is_loading = false;
    // this.setState({ is_loading: false });
  };
  render() {
    const { username, email, password, confirm_password } = this.state;
    const { redirect, to_login } = this.state;
    if (to_login) {
      console.log("Here");
      return <Navigate to="/signin" />;
    }
    if (cookies.get("user_token")) {
      return <Navigate to="/signin" />;
    }
    if (redirect) {
      return <Navigate to="/signin" />;
    }
    return (
      <>
      {this.state.is_loading && <>
        <CircularProgress className="ml-2 p-2 spinning-wheel" size="10" />
        <div id="overlay"></div>
      </>}{" "}
      <section className="vh-100 upper-gap-error">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card ">
                <div className="card-body p-5 text-center">
                  <div className="pb-2">
                    <h2 className="fw-bold text-uppercase">
                      Create Account
                      
                    </h2>

                    <form onSubmit={this.submitHandler}>
                      <div className="form-outline mt-5">
                        <label
                          className="form-label float-left"
                          htmlFor="typeEmailX"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="typeEmailX"
                          className="form-control form-control"
                          placeholder="john@gmail.com"
                          value={email}
                          onChange={this.changeHandler}
                          required
                        />
                      </div>
                      <div className="form-outline mt-3">
                        <label
                          className="form-label float-left"
                          htmlFor="typeUserameX"
                        >
                          Username
                        </label>
                        <input
                          type="username"
                          name="username"
                          id="typeUsernameX"
                          className="form-control form-control"
                          placeholder="john19"
                          value={username}
                          onChange={this.changeHandler}
                          required
                        />
                      </div>

                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-outline mt-3 ">
                            <label
                              className="form-label float-left"
                              htmlFor="typePasswordX"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              name="password"
                              id="typePasswordX"
                              className="form-control form-control"
                              value={password}
                              onChange={this.changeHandler}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-outline mt-3">
                            <label
                              className="form-label float-left"
                              htmlFor="typeConfirmPasswordX"
                            >
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              name="confirm_password"
                              id="typeConfirmPasswordX"
                              className="form-control form-control"
                              value={confirm_password}
                              onChange={this.changeHandler}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        className="btn btn-outline-dark btn-lg px-5 mt-5"
                        type="submit"
                      >
                        Submit
                      </button>
                      

                      <p className="mb-5" id="para">
                        <a className="" href="#!" onClick={this.to_login}>
                          Already have account? <strong> Login </strong>
                        </a>
                      </p>
                    </form>
                  </div>
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

export default Signup;
