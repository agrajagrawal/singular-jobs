/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './Profile'
toast.configure()
const cookies = new Cookies();
export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }
  changeHandler = (e) => {
    // console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);
    axios
    .post(
      "https://singularjobapi-dev.herokuapp.com/user_account/login/",
      this.state
      )
      .then((res) => {
        console.log(res);
        cookies.set("cookie", this.state, { path: "/" });
        console.log(res.data.message[0]);
        // toast(res.data.message[0]);
      })
      .catch((err) => {
        console.log(err);
      });
      
    };
    autoSubmit = (e) => {
      console.log(this.state);
    axios
    .post(
      "https://singularjobapi-dev.herokuapp.com/user_account/login/",
      this.state
      )
      .then((res) => {
        console.log(res);
        cookies.set("cookie", this.state, { path: "/" });
        console.log(res.data.message[0]);
        toast(res.data.message[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    };
  render() {
    const { username, password } = this.state;
    const cookie_here = cookies.get("cookie");
    // eslint-disable-next-line react/no-direct-mutation-state
    if (cookie_here) {
      // eslint-disable-next-line react/no-direct-mutation-state
      this.state = cookie_here;
      this.autoSubmit();
      return ( <Profile /> );
    }
    else {
    return (
      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card ">
                <div className="card-body p-5 text-center">
                  <div className="pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="mb-5">
                      Please enter your login and password!
                    </p>
                    <form onSubmit={this.submitHandler}>
                      <div className="form-outline">
                        <label className="form-label" for="typeEmailX">
                          Email
                        </label>
                        <input
                          type="email"
                          name="username"
                          id="typeEmailX"
                          className="form-control form-control-lg"
                          value={username}
                          onChange={this.changeHandler}
                        />
                      </div>

                      <div className="form-outline  ">
                        <label className="form-label" for="typePasswordX">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="typePasswordX"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={this.changeHandler}
                        />
                      </div>

                      <p className="small pb-lg-2">
                        <a className="" href="#!">
                          Forgot password?
                        </a>
                      </p>
                      {/* text-white-50 */}

                      <div className="justify-content-center align-items-center mt-2">
                        <button
                          className="btn btn-outline-dark btn-lg px-5"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                    </form>
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
}

export default Login;
