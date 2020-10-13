import React, { Component } from "react";
import Checkout from "./screens/checkout/Checkout";
import Details from "./screens/details/Details";
import Profile from "./screens/profile/Profile";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./screens/header/Header";
import Home from "./screens/home/Home.js";

class App extends Component {
  constructor(props) {
    super();
    this.state = { searchtext: "" };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    console.log = console.warn = console.error = () => {};
  }
  handleSearchChange(srchtxt) {
    this.setState({ searchtext: srchtxt }, this.filterCards);
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/">
            <Header searchhandler={this.handleSearchChange}></Header>
          </Route>
          <Switch>
            <Route path="/" exact>
              <Home searchtxt={this.state.searchtext} />
            </Route>
            <Route
              path="/details/:restaurantid"
              exact
              component={(props) => <Details {...props} />}
            />
            <Route
              path="/checkout"
              component={(props) => <Checkout {...props} />}
            />
            <Route
              path="/details"
              exact
              component={(props) => <Home {...props} />}
            />
            <Route
              path="/profile"
              component={(props) => <Profile {...props} />}
            />
            <Route path="/home" component={(props) => <Home {...props} />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
