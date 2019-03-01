import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import Header from "./Header/Header";
import Login from "./Login/Login"
import "./App.css";
import fire from "./config/Fire";
import Settings from "./Settings/Settings"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
      else {
        this.setState({ user: null })
      }
    })
  }

  render() {
    return (

      <div className="App">
        {this.state.user ? (
          <div>
            <Header />
            <Route exact path="/" render={() => <Welcome />} />
            <Route path="/settings" render={() => <Settings />} />
          </div>
        ) : (<Login />)}
      </div>

    );
  }
}

export default App;
