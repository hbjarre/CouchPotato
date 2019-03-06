import React, { Component } from "react";
import Header from "../Header/Header";
import SearchResults from "../SearchResultView/SearchResultView"
import "./Welcome.css";
import fire from "../config/Fire";

class Welcome extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <SearchResults search={this.props.match.params.str} />
      </div>
    );
  }
}

export default Welcome;
