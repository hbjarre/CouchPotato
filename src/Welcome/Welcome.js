import React, { Component } from "react";
import "./Welcome.css";
import fire from "../config/Fire";

class Welcome extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <p>The home page!</p>
      </div>
    );
  }
}

export default Welcome;
