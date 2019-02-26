import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import Header from "./Header/Header";
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
          <Header />
          <div className="container">
          <Route exact path="/" component={Welcome} />
          </div>
      </div>
    );
  }
}

export default App;
