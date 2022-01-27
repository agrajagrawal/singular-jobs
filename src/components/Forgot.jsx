import React, { Component } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { validEmail, validPassword } from "./Regex";

export class Forgot extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email : "",
             new_password : "",
             confirmpassword : "",
             redirect : false,
             is_loading: false,
        }
    }
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
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
      console.log(this.state);
      console.log(this.state.new_password + this.state.confirmpassword)
      if (this.state.new_password !== this.state.confirmpassword) {
        this.confirm_password_err = true;
        alert("Password should Match");
      } else {
        this.confirm_password_err = false;
      }
    };
    submitHandler = async(e) => {
        e.preventDefault();
        this.setState({is_loading : true});
        this.validate_form();
    if (this.password_err || this.confirm_password_err) {
      console.log("idhar");
      this.setState({is_loading : false});
      return;
    }
        console.log(this.state);
        await axios.patch("https://singularjobapi-dev.herokuapp.com/user_account/change_password/",this.state) 
        .then((res) => {
            if(res.data.status === "201") {
                toast("Kindly click on the link sent to your registered mail");
                this.setState({ redirect : true });
            }
            console.log(res)})
        .catch((err) => {console.log(err)})
        this.setState({is_loading : false});

    }
    render() {
        const {redirect} = this.state;
        if (redirect) {
            return <Navigate to='/signin'/>;
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
            {/* <h1>Singular Jobs</h1> */}
              <div className="card ">
                <div className="card-body p-5 text-center">
                  <div className="pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Forgot Password</h2>
                    <p className="mb-5">
                      Please enter your login and password!
                    </p>
                    <form onSubmit={this.submitHandler}>
                      <div className="form-outline">
                        <label className="form-label float-left" htmlFor="typeEmailX">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder='john19@gmail.com'
                          id="typeEmailX"
                          className="form-control form-control-lg"
                          onChange={this.changeHandler}
                        />
                      </div>

                      <div className="form-outline  ">
                        <label className="form-label float-left mt-3" htmlFor="typePasswordX">
                          New Password
                        </label>
                        <input
                          type="password"
                          name="new_password"
                          id="typePasswordX"
                          className="form-control form-control-lg"
                        //   value={}
                          onChange={this.changeHandler}
                        />
                      </div>
                      <div className="form-outline  ">
                        <label className="form-label mt-3 float-left" htmlFor="typeConfirmPasswordX">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          name="confirmpassword"
                          id="typeConfirmPasswordX"
                          className="form-control form-control-lg"
                        //   value={}
                          onChange={this.changeHandler}
                        />
                      </div>


                      <div className="justify-content-center align-items-center mt-4">
                        <button
                          className="btn btn-outline-dark btn-lg px-5"
                          type="submit"
                        >
                          Change 
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
      </>
        )
    }
}

export default Forgot
