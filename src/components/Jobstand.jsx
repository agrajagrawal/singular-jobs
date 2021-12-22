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
import { CircularProgress} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios"
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
      preferred_platforms: cookies.get("user_profile").preferred_platforms,
      // preferred_platforms :{
      //   platforms : ['linkedin']
      // }
      is_loading : false
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

  componentDidMount() {
    this.setState({ anchorEl: null });
    this.setState({ open: false });
  }
  clicked = (obj) => {
    // console.log(obj.toLowerCase());
    // console.log((this.state.preferred_platforms.platforms[1]));
    const array = this.state.preferred_platforms.platforms;
    if (array.find((ele) => ele === obj.toLowerCase())) {
      console.log("Yes");
      const index = array.indexOf(obj.toLowerCase());
      array.splice(index, 1);
      // console.log(array);
      const new_obj = {
        platforms: array,
      };
      this.setState({ preferred_platforms: new_obj });
      // console.log(this.state);
    } else {
      console.log("No");
      array.push(obj.toLowerCase());
      console.log(array);
      const new_obj = {
        platforms: array,
      };
      this.setState({ preferred_platforms: new_obj });
      // console.log(this.state);
    }
    // console.log((this.state.preferred_platforms.platforms).find((ele) => ele === obj.toLowerCase()))
  };
  toggle_setting = () => {
    console.log("Clicked");
    this.setState({ go_to_setting: true });
  };
  submitHandle = (e) => {
    e.preventDefault();
    this.setState({is_loading : true});
    const dict = {
      ...cookies.get("user_profile"),
      preferred_platforms : this.state.preferred_platforms
    }
    console.log(dict)
    cookies.set("user_profile", dict , { path: "/" });
    const token = "Token " + cookies.get("user_token");
    let headers = {
      Authorization: token,
    };
    axios
        .patch(
          "https://singularjobapi-dev.herokuapp.com/user_account/update/",
           cookies.get("user_profile"),
          { headers: headers }
        )
        .then((res) => {
          console.log(res);
          this.setState({ is_loading: false });
          toast(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          this.setState({ is_loading: false });
        });

  }
  render() {
    // console.log("yes");
    // console.log(this.state);
    const { go_to_setting } = this.state;
   
    if (go_to_setting) {
      return <Navigate to="/settings" />;
    }
    // console.log(this.state);
    return (
      <>
      {this.state.is_loading && (
        <>
          <CircularProgress className="ml-2 p-2 spinning-wheel" size="10" />
          <div id="overlay"></div>
        </>
      )}
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
                <Link className="" to="/settings">
                  {" "}
                  <SettingsIcon />
                  Settings{" "}
                </Link>
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
                followed={Boolean(
                  this.state.preferred_platforms.platforms.find(
                    (ele) => ele === company.toLowerCase()
                  )
                )}
                clicked={this.clicked}
              />
            );
          })}
        </div>
        <div className="d-flex justify-content-center align-items-center mt-2">
          <form action="" onSubmit={this.submitHandle}>
          <button className="btn btn-outline-dark btn-lg px-5" type="submit">
            Update
          </button>
          </form>
        </div>
      </div>
      </>
    );
  }
}

export default Jobstand;
