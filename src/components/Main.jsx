/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import JobPage from "./JobPage";

function Main() {
  return (
    <div className="wrapper">
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>Singular Jobs</h3>
        </div>

        <ul className="list-unstyled components">
          {/* <p>
            <strong>Menu</strong>
          </p> */}

          <li>
            <a href="#">Jobs</a>
          </li>
          <li>
            <a href="#">Profile</a>
          </li>
          <li>
            <a href="#">FAQ</a>
          </li>
          <li>
            <a href="#">SignIn</a>
          </li>
          <li>
            <a href="#">Settings</a>
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
          <JobPage />
        </div>
      </div>
      
    </div>
  );
}

export default Main;
