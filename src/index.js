import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import Main from './components/Main'
import RecipeReviewCard from './components/RecipeReviewCard';
import Jobfetch from './components/Jobfetch'
import App from './App';
// import data from './components/data'
// console.log(data);

ReactDOM.render(
  <React.StrictMode>
    {/* <Main /> */}
    <App />
    {/* <RecipeReviewCard /> */}
    {/* <Jobfetch /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
