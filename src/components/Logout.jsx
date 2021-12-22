/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import React, { Component } from 'react'
import Cookies from "universal-cookie";
import {Navigate} from "react-router-dom"
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';

const cookies = new Cookies();

export class Logout extends Component {
    func = () => {
        toast("Successfully Loged out")
        cookies.remove("user_token", { path: "/" });
        cookies.remove("user_mail", { path: "/" });
        cookies.remove("user_username", { path: "/" });
        cookies.remove("user_registered", {path:"/"});
        cookies.remove("user_profile" , {path : "/"});
        cookies.remove("profile_changed"  , {path : "/"});
        cookies.remove("user_job_list_exits"  , {path : "/"});
        cookies.remove("view_profile" , {path : "/"});
        window.location.reload();
    };
    render() {
        if(cookies.get("user_token")) {
            this.func();
        }
        return (<>
        
        <Navigate to='/signin'/></>);
    }
}

export default Logout
