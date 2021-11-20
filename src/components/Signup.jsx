/* eslint-disable no-unused-expressions */
import React, { Component } from 'react'
import axios from 'axios'
// import Cookies from 'universal-cookie'
import {toast} from 'react-toastify';
import {Navigate} from "react-router-dom"
import Cookies from 'universal-cookie';
const cookies = new Cookies();
toast.configure();

// const cookies = new Cookies();
export class Signup extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       username : '',
       email : '',
       password : '',
       confirm_password : '',
       redirect : false,
       jobs_serializer : {},
       profile_serializer : {
        user_interests : {},
        jobs_per_session : 40,
        preferred_platforms : "all",
        looking_for_job : "true"
       }


    }
  }
  changeHandler = e => {
    // console.log(e.target.value);
    this.setState({[e.target.name] : e.target.value})
  }
  submitHandler = e => {
    e.preventDefault();
    console.log(this.state)
    axios.post('https://singularjobapi-dev.herokuapp.com/user_account/register/',this.state)
    .then( res => {
      console.log(res);
      if(res.data.api_status === 201) {
        console.log(res.data.message[0]);
        toast(res.data.message[0]);
        this.setState({ redirect: true })
      } else  {
        console.log(res.data.message[0]);
        toast(res.data.message[0]);
      }
    })
    .catch(err => {console.log(err)})
  }
  render() {
    const {username , email , password , confirm_password } = this.state;
    const { redirect } = this.state;
    if(cookies.get("user_token")) {
      // toast("Already SignedIn");
      return <Navigate to='/signin' />
    }
    if (redirect) {
      return <Navigate to='/signin'/>;
    }
    return (
      <section className="vh-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card ">
              <div className="card-body text-center">
                <div className="pb-2">
                  <h2 className="fw-bold text-uppercase">Register</h2>
                    <form onSubmit={this.submitHandler}>
                    <div className="form-outline mt-5">
                      <label className="form-label" htmlFor="typeEmailX">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="typeEmailX"
                        className="form-control form-control"
                        placeholder="xyz@gmail.com"
                        value={email}
                        onChange={this.changeHandler}
                      />
                    </div>
                    <div className="form-outline mt-3">
                      <label className="form-label" htmlFor="typeUserameX">
                        Username
                      </label>
                      <input
                        type="username"
                        name="username"
                        id="typeUsernameX"
                        className="form-control form-control"
                        placeholder=""
                        value={username}
                        onChange={this.changeHandler}
                      />
                    </div>
                  

                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-outline mt-3">
                        <label className="form-label" htmlFor="typePasswordX">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="typePasswordX"
                          className="form-control form-control"
                          value={password}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-outline mt-3">
                        <label
                          className="form-label"
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
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    )
  }
}

export default Signup

