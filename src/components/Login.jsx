/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Navigate} from "react-router-dom"
import CircularProgress from "@mui/material/CircularProgress";

toast.configure();
const cookies = new Cookies();
export class Login extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      redirect : false,
      forgot : false,
      new_acc : false,
      is_loading: false,

    };
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = async (e) => {
    e.preventDefault();
    this.setState({ is_loading: true });
    console.log(this.state);
    console.log("idhar");
    await axios
      .post(
        "https://singularjobapi-dev.herokuapp.com/user_account/login/",
        this.state
      )
      .then((res) => {
        if (res.data.api_status === 202) {
          toast(res.data.message[0]);
          cookies.set("user_token", res.data.token, { path: "/" });
          cookies.set("user_mail", res.data.email, { path: "/" });
          cookies.set("user_username", res.data.username, { path: "/" });
          this.setState({ redirect: true })
          cookies.set("visit_profile", false , { path: "/" });
          window.location.reload();
        } else {
          alert(res.data.message[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
      this.setState({ is_loading: false });
  };
  already_reg = () => {
    // toast("Signed In as " + cookies.get("user_username"));
  }
  forgot = () => {
    this.setState({ forgot: true })
  }
  new_acc = () => {
    this.setState({ new_acc : true })
  }
  render() {
    const { email, password } = this.state;
    const { redirect , forgot , new_acc} = this.state;
    if(new_acc) {
      return <Navigate to='/signup' />;
    }
    if (redirect) {
      return <Navigate to='/profile'/>;
    }
    if (forgot) {
      return <Navigate to='/forgot'/>
    }
    if(cookies.get("user_token"))
    {
      //  this.setState({redirect : true});
       return <Navigate to='/profile'/>;
    }
    console.log(this.state.is_loading);
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
              <div className="card">
                <div className="card-body p-5 text-center">
                  <div className="">
                    <h2 className="fw-bold mb-2 text-uppercase">Welcome Back!</h2>
                    {/* <p className="mb-5">
                      Please enter your login and password!
                    </p> */}
                    <form onSubmit={this.submitHandler} className="mt-5">
                      <div className="form-outline">
                        <label className="form-label float-left" htmlFor="typeEmailX">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="typeEmailX"
                          className="form-control form-control-lg"
                          value={email}
                          placeholder="john@gmail.com"
                          onChange={this.changeHandler}
                          required
                        />
                      </div>

                      <div className="form-outline  ">
                        <label className="form-label float-left mt-4" htmlFor="typePasswordX">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="typePasswordX"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={this.changeHandler}
                          required
                        />
                      </div>

                      <p className="small pb-lg-2 mt-3">
                        <a className="" href="#!" onClick={this.forgot}>
                          Forgot password?
                        </a>
                      </p>

                      <div className="justify-content-center align-items-center mt-2">
                        <button
                          className="btn btn-outline-dark btn-lg px-5"
                          type="submit"
                        >
                          Login
                        </button>
                        
          
                        <p className="mb-5" id="para">
                          <a className="" href="#!" onClick={this.new_acc}>
                           New User? <strong> SignUp </strong>
                           </a>
                        </p>
                      </div>
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

export default Login;
