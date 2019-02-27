import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import Login from "./Login/Login";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
          <div className="container">
          <Route exact path="/" component={Welcome} />
          </div>
          <Route exact path="/login" component={Login} />
      </div>
    );
  }
}

export default App;
