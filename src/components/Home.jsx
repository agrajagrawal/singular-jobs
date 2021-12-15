import React, { Component } from "react";
import Button from "@mui/material/Button";
// import Button from "@restart/ui/esm/Button";
import Demo from "./Demo";
export class Home extends Component {
  render() {
    return (
      <div id="landing-outer">
        <div
          className="d-flex justify-content-between"
          style={{ padding: "20px 50px" }}
        >
          <h3 className="landing-upper-heading">Singular Jobs</h3>
          <Button variant="contained" className="landing-upper-button">
            Login
          </Button>
        </div>
        <div
          className="d-flex justify-content-between mt-2 landing-blue-div"
          style={{ margin: " 0 50px" }}
        >
          <div id="landing-img-left">
            <h1>
              Your Personal Assistant <br /> to Search Jobs For
            </h1>
            <p className="mt-5">
              Presents a personalized list of links of jobs organised from{" "}
              <br /> different platform updated in every 6 hours
            </p>
            <div className="row d-flex justify-content-center mt-5">
              <Button
                variant="contained"
                style={{
                  maxWidth: "120px",
                  maxHeight: "50px",
                  minWidth: "120px",
                  minHeight: "50px",
                  backgroundColor: "rgb(238, 238, 238)",
                  color: "#5b5586",
                }}
                className="landing-left-button mr-2 col-6 col-sm-12"
              >
                {" "}
                Login{" "}
              </Button>
              <Button
                variant="contained"
                style={{
                  maxWidth: "120px",
                  maxHeight: "50px",
                  minWidth: "120px",
                  minHeight: "50px",
                  backgroundColor: "rgb(238, 238, 238)",
                  color: "#5b5586",
                }}
                className="landing-left-button mr-2 col-6 col-sm-12"
              >
                {" "}
                SignUp{" "}
              </Button>
            </div>
          </div>
          <div>
            <div className="landing-img">
            <div className="landing-img-text">Singular Jobs</div>

            <lottie-player
              src="https://assets2.lottiefiles.com/packages/lf20_lqge6px5.json"
              // className="landing-img"
              style={{ width: "600px" }}
              background="transparent"
              speed="1"
              loop
              autoplay
            ></lottie-player>
            </div>
          </div>
        </div>
        <div
          className="row d-flex mt-5"
          style={{ padding: "20px 60px" }}
        >
          <div className="d-flex justify-content-center col-12 col-lg-6">
            <h1 className="">Why Singular Jobs ?</h1>
          </div>
          <iframe
            height="300"
            // width="600"
            title="video"
            src="https://www.youtube.com/embed/il_t1WVLNxk"
            className="col-12 col-lg-6"
          ></iframe>
        </div>

        <div
          className="d-flex justify-content-between mt-5 row"
          style={{ padding: "20px 60px" }}
        >

          <h1 style={{ padding: "120px 120px" }} >How to Use ?</h1>
          <div className="d-flex justify-content-center px-5">
            <Demo className="px-5" />
          </div>
        </div>
        <div className="landing-blue-div" style={{ padding: "15px 0" }}>
          <p>
            {" "}
            Copyright Singular Jobs <br />
            &copy; 2021-2022{" "}
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
