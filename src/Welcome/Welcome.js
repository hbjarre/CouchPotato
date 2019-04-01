import React, { Component } from "react";
import "./Welcome.css";
import { Link } from "react-router-dom";
import modelInstance from "../data/GalleryModel"
import MovieCard from "../MovieCard/MovieCard";

class Welcome extends Component {
  constructor(props){
    super(props);

    this.state = {
      status: "LOADING",
      movies: []
    }
  }

  updateMovies () {
    modelInstance.getDiscover().then((movies) => {
      this.setState({movies: movies.results, status: "LOADED"});
    }).catch((e) => {
      console.error(e);
      this.setState({status: "ERROR"});
    });
  }

  componentDidMount() {
    this.updateMovies();
  }

  componentWillReceiveProps(nextProps) {
    this.updateMovies();
  }

  render() {
    var html = "";

    switch (this.state.status) {
      case "LOADING":
        html = <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;
        break;
      case "LOADED":
        html = this.state.movies.map((element, index) =>
          <MovieCard movie={element} key={index}/>
        );
        break;
      default:
        html = <b>Failed to load data, please try again.</b>;
        break;
    }

    return (
      <div className="container">
        <h3>Popular movies</h3>
        <div className="d-flex flex-wrap justify-content-center">{html}</div>
      </div>
    );
  }
}

export default Welcome;
