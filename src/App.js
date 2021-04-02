import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Pnf from './Screens/component/Pnf'
import Product from "./Screens/Product"
import Cart from './Screens/Cart'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Product} />
          <Route exact path="/products" component={Product} />
          <Route exact path="/pnf" component={Pnf} />
          <Route exact path="/cart" component={Cart} />
          <Redirect from="/*" to="Pnf" />
        </Switch>
      </BrowserRouter>
    );
  }
}
