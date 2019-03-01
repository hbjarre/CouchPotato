import React, { Component } from "react";
import Header from "../Header/Header";
import "./Welcome.css";
import fire from "../config/Fire";
import Header from "../Header/Header"

class Welcome extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <p>The home page!</p>
      </div>
      </div>
    );
  }
}

export default Welcome;
