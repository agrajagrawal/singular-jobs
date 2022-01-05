/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import JobPage from "./JobsPage/JobPage";
import Login from "./Login";
import Profile from "./Profile";
import Signup from "./Signup";
import Logout from "./Logout";
import Forgot from "./Forgot";
import Settings from "./Settings";
import Jobstand from "./Jobstand";
import Jobfetch from "./Jobfetch";
import Cookies from "universal-cookie";
import { Avatar, CircularProgress } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import FaqPage from "./FaqPage";
const cookies = new Cookies();
// import Cookies from "universal-cookie";
// const cookies = new Cookies();


export class Main extends Component {

   constructor(props) {
     super(props)
   
     this.state = {
        
     }
   }
   
  render() {
    console.log("Cookies hu mein");
    console.log(cookies.get("user_token"));
    return (
      <Router>
        <div className="outer-wrapper">
         { cookies.get("user_token") && (
            <div id="nav-sidebar">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
               
                  <button
                    type="button"
                    id="sidebarCollapse"
                    className="navbar-btn"
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </button> 
                  <h1>Singular Jobs</h1>
                 
                  <div>
                    <ul className="nav navbar-nav ml-auto">
                      <li className="nav-item active">
                        <a className="nav-link" href="#">
                          <i class="fas fa-user fa-2x"></i>{" "}
                          {/* Drop Down Menu */}
                        </a>
                      </li>
                    </ul>
                  </div> 
                  
                </div>
              </nav>
            </div>
        )}
          <div className="wrapper">
            {cookies.get("user_token") && (
              <>
                <nav id="sidebar">
                  <div className="sidebar-header">
                    <h3>Singular Jobs</h3>
                  </div>
                  
                  <ul className="list-unstyled components px-3 p-4">
                    <h5 className="ml-2">User Specifics</h5>
                    <li>
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        to="/jobs"
                      >
                        My Jobs
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="/profile">
                        {" "}
                        Skills
                      </Link>
                      {/* <a href="#">Profile</a> */}
                    </li>
                    <li>
                      <Link className="nav-link" to="/jobstand">
                        {" "}
                        Jobstand
                      </Link>
                      {/* <a href="#">Profile</a> */}
                    </li>
                    <li>
                      <Link className="nav-link" to="/settings">
                        {" "}
                        Settings
                      </Link>
                      {/* <a href="#">FAQ</a> */}
                    </li>
                    <hr className="sidemenu-hr"/>
                    <h5 className="ml-2 mt-4">General</h5>
                    <li>
                      <Link className="nav-link" to="/logout">
                        {" "}
                        Logout
                      </Link>
                      {/* <a href="#">SignIn</a> */}
                    </li>
                    <li>
                      <Link className="nav-link" to="/faq">
                        {" "}
                        FAQ
                      </Link>
                      {/* <a href="#">SignIn</a> */}
                    </li>
                    {/* <li>
                      <Link className="nav-link" to="/signup">
                        {" "}
                        Sign Up
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="/settings">
                        {" "}
                        Settings
                      </Link>
                    </li> */}
                  </ul>
  
                  {/* <ul className="list-unstyled CTAs">
                    <li>
                      <Link className="" to="/logout">
                        {" "}
                        <a
                          // href="https://bootstrapious.com/p/bootstrap-sidebar"
                          className="article"
                        >
                          Log Out
                        </a>
                      </Link>
                    </li>
                  </ul> */}
                </nav>
              </>
            )}
            {/* { !cookies.get("user_token") &&
             <nav  id="sidebar-login">
               Agraj
             </nav>
            } */}
            {/* <!-- Page Content Holder --> */}
  
            <div id="content">
              <nav className="navbar navbar-expand-lg navbar-light bg-light middle-nav">
                <div className="container-fluid justify-content-center">
                  <button
                    type="button"
                    id="sidebarCollapse"
                    className="navbar-btn btn-link"
                  >
                    <i className="fas fa-cog" id="sidebarCollapse"></i>
                  </button>
                  <h1 id="navbar-head">Singular Jobs</h1>
                  {/* <div id="faltu"></div> */}
                </div>
              </nav>
              
              
                <div className="main-content">
                  
                  <Routes>
                    {/* <Route path="/" element={<Login />} /> */}
                    { this.props.which==="signup" && <Route path="/" element={<Signup />} />} 
                    { this.props.which==="signin" && <Route path="/" element={<Login />} />} 
                    <Route path="/jobs" element={<Jobfetch />} />
                    <Route path="/faq" element={<FaqPage />} />
                    <Route path="/signin" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/forgot" element={<Forgot />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/jobstand" element={<Jobstand />} />
                  </Routes>
                </div>
              
            </div>
          </div>
          {cookies.get("user_token") && (
            <nav className="mobile-bottom-nav" id="bottom-nav-bar">
              <div className="mobile-bottom-nav__item ">
                <div className="mobile-bottom-nav__item-content">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/jobs"
                  >
                    Jobs
                  </Link>
                </div>
              </div>
              <div className="mobile-bottom-nav__item ">
                <div className="mobile-bottom-nav__item-content">
                  <Link className="nav-link active" to="/jobstand">
                    {" "}
                    Jobstand
                  </Link>
                </div>
              </div>
              <div className="mobile-bottom-nav__item">
                <div className="mobile-bottom-nav__item-content">
                  <Link className="nav-link" to="/profile">
                    {" "}
                    Skills
                  </Link>
                </div>
              </div>
  
              <div className="mobile-bottom-nav__item">
                <div className="mobile-bottom-nav__item-content">
                  <Link className="nav-link" to="/settings">
                    {" "}
                    Settings
                  </Link>
                </div>
              </div>
            </nav>
          )}
        </div>
      </Router>
    );
  }
  
}

export default Main

