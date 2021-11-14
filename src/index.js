import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import Login from "./login";
import Register from "./register";
import Forget from "./forgetPassword";

import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

class Root extends React.Component {
  render(){
    return (
      <Router>
        <Routes>
            <Route path = "/App/:firstName/:id" element={<App/>} />;
          <Route exact path="/" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/ForgetPassword" element={<Forget/>} />
        </Routes>
        </Router>
    );
  }
}



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
ReactDOM.render(<Root />, document.getElementById("root"));
serviceWorker.unregister();
