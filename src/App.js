// import Login from './components/Login'
import './App.css';
import Main from './components/Main';
import Home from './components/Home'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
// import JobPage from "./components/JobPage";

import Login from "./components/Login";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
// import Main from './components/Main';
import Logout from "./components/Logout";
import Forgot from "./components/Forgot";
import Settings from "./components/Settings";
import Jobstand from "./components/Jobstand";
import Jobfetch from "./components/Jobfetch";
import FaqPage from './components/FaqPage';
import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
  return (
    <>


      <Main />
    </>
  );
}

export default App;
