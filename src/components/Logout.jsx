import React, { Component } from 'react'
import Cookies from "universal-cookie";
import {Navigate} from "react-router-dom"

const cookies = new Cookies();

export class Logout extends Component {
    
    render() {
        cookies.remove("user_token", { path: "/" });
        cookies.remove("user_mail", { path: "/" });
        cookies.remove("user_username", { path: "/" });
        return <Navigate to='/signin'/>;
    }
}

export default Logout
