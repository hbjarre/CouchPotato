import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
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
          <Route exact path="/" component={Welcome} />
      </div>
    );
  }
}

export default App;
