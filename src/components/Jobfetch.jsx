import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Button from "react-bootstrap/Button";
import JobPage from "./JobsPage/JobPage";
import { Avatar, CircularProgress, Menu, MenuItem } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
// import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const cookies = new Cookies();
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    cursor: "pointer",
    marginTop: theme.spacing(3),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
      },
      "&:active": {
        backgroundColor: theme.palette.primary.main,
        // theme.palette.action.selectedOpacity
      },
    },
  },
}));
export class Jobfetch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isloaded: false,
    };
    this.currSess = 1;

    this.componentWillMount = this.componentWillMount.bind(this);
  }
  // Avatar
  handleClick = (event) => {
    event.preventDefault();
    this.setState({ anchorEl: event.currentTarget });
    this.setState({ open: Boolean(this.state.anchorEl) });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
    this.setState({ open: Boolean(this.state.anchorEl) });
  };
  // Avatar

  componentWillMount() {
    console.log("Function of did mount");
    const token = "Token " + cookies.get("user_token");
    let headers = {
      Authorization: token,
    };
    let data = {
      email: cookies.get("user_mail"),
      jobs_session: this.currSess,
      user_jobs_list_exist: cookies.get("user_profile").user_jobs_list_exist
    };
    axios
      .post(
        "https://singularjobapi-dev.herokuapp.com/user_account/myjobs/",
        data,
        { headers: headers }
      )
      .then((res) => {
        console.log("res data");
        console.log(res);
        const new_dict = {
          ...cookies.get("user_profile"),
          user_jobs_list_exist : "True"
        }
        cookies.set("user_profile", new_dict, { path: "/" });
        this.setState({
          data: res.data.recommend_jobs[0].jobs,
          isloaded: true,
        });
      })
      .catch((err) => console.log(err));
      this.setState({anchorEl : null});
      this.setState({open : false})  
  }
  changeSession = () => {
    console.log("Function of did mount");
    const token = "Token " + cookies.get("user_token");
    console.log(token);
    let headers = {
      Authorization: token,
    };
    let data = {
      email: cookies.get("user_mail"),
      jobs_session: this.currSess,
      user_jobs_list_exist: cookies.get("user_profile").user_jobs_list_exist,
    };
    axios
      .post(
        "https://singularjobapi-dev.herokuapp.com/user_account/myjobs/",
        data,
        { headers: headers }
      )
      .then((res) => {
        console.log("componentdidmount");
        console.log(res);
        this.setState({
          data: res.data.recommend_jobs[0].jobs,
          isloaded: true,
        });
      })
      .catch((err) => console.log(err));
  };

  leftSession = (e) => {
    e.preventDefault();
    console.log(this.currSess);
    if (this.currSess === 1) this.currSess = 12;
    else this.currSess = this.currSess - 1;
    console.log(this.currSess);
    this.setState({ isloaded: false });
    this.changeSession();
  };
  rightSession = (e) => {
    e.preventDefault();
    console.log(this.currSess);
    if (this.currSess === 12) this.currSess = 1;
    else this.currSess = this.currSess + 1;
    console.log(this.currSess);
    this.setState({ isloaded: false });

    this.changeSession();
  };

  render() {
    const isLoaded = this.state.isloaded;
    
    <Avatar
              id="avatar demo-customized-button"
              aria-controls="demo-customized-menu"
              aria-haspopup="true"
              aria-expanded={this.state.open ? "true" : undefined}
              variant="contained"
              disableElevation
              onMouseOver={this.handleClick}
              onClick={this.handleClick}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{ bgcolor: deepPurple[500] }}
            >
              {cookies.get("user_username")[0].toUpperCase()}{" "}
            </Avatar>
    // console.log(isLoaded);
    if (isLoaded === true) {
      console.log(this.currSess);
      return (
        <>
        <div class="d-flex justify-content-between" id="avtar-bar">
          <h4>{cookies.get("user_username")}'s Jobs</h4>
          <div id="avatar-div">
            <Avatar
              id="avatar demo-customized-button"
              aria-controls="demo-customized-menu"
              aria-haspopup="true"
              aria-expanded={this.state.open ? "true" : undefined}
              variant="contained"
              disableElevation
              onMouseOver={this.handleClick}
              onClick={this.handleClick}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{ bgcolor: deepPurple[500] }}
            >
              {cookies.get("user_username")[0].toUpperCase()}{" "}
            </Avatar>

            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={this.state.anchorEl}
              open={this.state.open}
              onClose={this.handleClose}
              onMouseDown={this.handleClose}
            >
              <MenuItem onClick={this.handleClose} disableRipple>
              <Link className="" to="/settings"> <SettingsIcon />
                Settings </Link>
              </MenuItem>
              <MenuItem onClick={this.handleClose} disableRipple>
              <Link className="" to="/logout">
                <LogoutIcon />
                Logout
                </Link>
              </MenuItem>
            </StyledMenu>
          </div>
          </div>
          {this.state.data.length === 0 && (
            <h1>No more jobs in this or previous session</h1>
          )}
          <JobPage data={this.state.data} />
          <div id="session-btn" className="d-flex justify-content-center">
            <Button variant="outline-light" onClick={this.leftSession}>
              {" "}
              Previous Session{" "}
            </Button>
            <Button
              variant="outline-dark"
              onClick={this.rightSession}
              className="ml-2"
            >
              {" "}
              Next Session{" "}
            </Button>
          </div>
        </>
        // <h1>Agraj</h1>
      );
    } else {
      // this.func();
      return (
        <>
        <div class="d-flex justify-content-between" id="avtar-bar">
          <h4>{cookies.get("user_username")}'s Jobs</h4>
          <div>
            <Avatar
              id="avatar demo-customized-button"
              aria-controls="demo-customized-menu"
              aria-haspopup="true"
              aria-expanded={this.state.open ? "true" : undefined}
              variant="contained"
              disableElevation
              onMouseOver={this.handleClick}
              onClick={this.handleClick}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{ bgcolor: deepPurple[500] }}
            >
              {cookies.get("user_username")[0].toUpperCase()}{" "}
            </Avatar>

            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={this.state.anchorEl}
              open={this.state.open}
              onClose={this.handleClose}
              onMouseDown={this.handleClose}
            >
              <MenuItem onClick={this.handleClose} disableRipple>
              <Link className="" to="/settings"> <SettingsIcon />
                Settings </Link>
              </MenuItem>
              <MenuItem onClick={this.handleClose} disableRipple>
              <Link className="" to="/logout">
                <LogoutIcon />
                Logout
                </Link>
              </MenuItem>
            </StyledMenu>
          </div>
          </div>
        <div>
          <h2>
            Your Jobs are Loading...
            <CircularProgress className="ml-2 p-2" />
          </h2>
        </div>
        </>
      );
    }
  }
}

export default Jobfetch;
