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
            <Route path="/details/:restaurantid" exact component={Details} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
