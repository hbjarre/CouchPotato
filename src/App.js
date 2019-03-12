import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import Header from "./Header/Header";
import Login from "./Login/Login"
import "./App.css";
import fire from "./config/Fire";
import Settings from "./Settings/Settings"
import Wish_list from "./Wish_list/Wish_list";
import Rated_list from "./Rated_list/Rated_list";
import SearchResults from "./SearchResultView/SearchResultView";
import DetailView from "./DetailView/DetailView";

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
            <Route exact path="/" component={Welcome} />
            <Route exact path="/search/:str" component={SearchResults} />
            <Route path="/search/:str/:id" component={DetailView} />
            <Route path="/settings" render={() => <Settings />} />
            <Route path="/wish_list" render={() => <Wish_list />} />
            <Route path="/my_rated_list" render={() => <Rated_list />} />
          </div>
        ) : (<Login />)}
      </div>

    );
  }
}

export default App;
