import React, { Component } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'
export class Forgot extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email : "",
             new_password : "",
             confirmpassword : "",
             redirect : false
        }
    }
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    submitHandler = (e) => {
        e.preventDefault();
        console.log(this.state);
        axios.patch("https://singularjobapi-dev.herokuapp.com/user_account/change_password/",this.state) 
        .then((res) => {
            if(res.data.status === "201") {
                toast("A mail has been sent to you");
                this.setState({ redirect : true });
            }
            console.log(res)})
        .catch((err) => {console.log(err)})
    }
    render() {
        const {redirect} = this.state;
        if (redirect) {
            return <Navigate to='/signin'/>;
          }
        return (
            <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card ">
                <div className="card-body p-5 text-center">
                  <div className="pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Forgot</h2>
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
                          id="typeEmailX"
                          className="form-control form-control-lg"
                          onChange={this.changeHandler}
                        />
                      </div>

                      <div className="form-outline  ">
                        <label className="form-label float-left mt-3" htmlFor="typePasswordX">
                          Password
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
                          Confirm Password
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


                      <div className="justify-content-center align-items-center mt-2">
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
        )
    }
}

export default Forgot
