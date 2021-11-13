/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import JobPage from "./JobPage";
import Login from "./Login";
import Profile from "./Profile";
import Signup from "./Signup";
import { CookiesProvider } from "react-cookie";
function Main() {
  return (
    <Router>
      <div className="wrapper">
        <nav id="sidebar">
          <div className="sidebar-header">
            <h3>Singular Jobs</h3>
          </div>

          <ul className="list-unstyled components">
            <li>
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/profile">
                {" "}
                Profile
              </Link>
              {/* <a href="#">Profile</a> */}
            </li>
            <li>
              <Link className="nav-link" to="/faq">
                {" "}
                FAQ
              </Link>
              {/* <a href="#">FAQ</a> */}
            </li>
            <li>
              <Link className="nav-link" to="/signin">
                {" "}
                Sign In
              </Link>
              {/* <a href="#">SignIn</a> */}
            </li>
            <li>
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
            </li>
          </ul>

          <ul className="list-unstyled CTAs">
            <li>
              <a
                href="https://bootstrapious.com/p/bootstrap-sidebar"
                className="article"
              >
                Log Out
              </a>
            </li>
          </ul>
        </nav>

        {/* <!-- Page Content Holder --> */}
        <div id="content">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <button
                type="button"
                id="sidebarCollapse"
                className="navbar-btn btn-link"
              >
                <i className="fas fa-cog" id="sidebarCollapse"></i>
              </button>
              <h1 id="navbar-head">Singular Jobs</h1>
              <div id="faltu"></div>
            </div>
          </nav>

          <div className="main-content">
            <Routes>
              <Route path="/" element={<JobPage />} />
              <Route path="/faq" element={<Login />} />
              <Route
                path="/signin"
                element={
                  <CookiesProvider>
                    <Login />
                  </CookiesProvider>
                }
              />
              <Route path="signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<JobPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default Main;
