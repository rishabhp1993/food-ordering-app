import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Home from "./screens/home/Home";
import Checkout from "./screens/checkout/Checkout";
import Details from "./screens/details/Details";
import Profile from "./screens/profile/Profile";
import { BrowserRouter, Route } from "react-router-dom";
import "../node_modules/font-awesome/css/font-awesome.min.css";
ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/details" component={Details} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/profile" component={Profile} />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
