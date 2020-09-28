import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Header from "./screens/header/Header";
import Home from "./screens/home/Home";
import Details from "./screens/details/Details";
import { BrowserRouter, Route } from "react-router-dom";
import "../node_modules/font-awesome/css/font-awesome.min.css";

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Header />
      <Route path="/" exact component={Home} />
      <Route path="/details" component={Details} />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
