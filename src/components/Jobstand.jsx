/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import data from "../linkedin.json";
import platforms from "./platforms";
import Settings from "./Settings";
import Stands from "./Stands";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import Cookies from "universal-cookie";
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
export class Jobstand extends Component {
  constructor(props) {
    super(props);

    this.state = {
      go_to_setting: false,
      job_preferences: {
        linkedin: false,
        "naukri.com": false,
        internshala: false,
        "shine.com": false,
      },
    };
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

  componentDidMount () {
    this.setState({anchorEl : null});
      this.setState({open : false})  
  }
  clicked = (obj) => {
    console.log(obj.toLowerCase());
    obj = obj.toLowerCase();
    const new_data = {
      ...this.state.job_preferences,
      [obj]: !this.state.job_preferences[obj],
    };
    const new_dict = { ...this.state, job_preferences: new_data };
    this.setState(new_dict);
  };
  toggle_setting = () => {
    console.log("Clicked");
    this.setState({ go_to_setting: true });
  };
  render() {
    console.log(this.state);
    const { go_to_setting } = this.state;
    if (go_to_setting) {
      return <Navigate to="/settings" />;
    }
    return (
      <div>
        <div class="d-flex justify-content-between mb-2" id="avtar-bar">
          <h4>{cookies.get("user_username")}'s jobstand</h4>
          <div id="avatar-div">
            <Avatar
              id="avatar demo-customized-button"
              aria-controls="demo-customized-menu"
              // aria-haspopup="true"
              aria-expanded={this.state.open ? "true" : undefined}
              variant="contained"
              disableElevation
              // onMouseOver={this.handleClick}
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
        <div className="row job-row">
          {platforms.map((job) => {
            const { id, company, description, image } = job;
            return (
              <Stands
                id={id}
                company={company}
                description={description}
                image={image}
                clicked={this.clicked}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Jobstand;
