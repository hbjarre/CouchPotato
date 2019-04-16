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


discoverGenre (genre) {
  modelInstance.getDiscoverGenre(genre).then((movies) => {
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

  test() {
    alert("test")
    console.log("test")
  }

  render() {
    var html = "";
   

    switch (this.state.status) {
      case "LOADING":
        html = <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;
        break;
      case "LOADED":
        html = this.state.movies.map((element, index) =>
          <MovieCard movie={element} key={index} big={(index == 0 || index == 7)}/>
          
        );
        
        break;
      default:
        html = <b>Failed to load data, please try again.</b>;
        break;
    }
    
    return (
      <div className="container">
      <div className="d-flex">
      <div><button type="button" class="btn btn-outline-light" onClick={() => {this.updateMovies()}}>Popular movies</button></div>
      <div><button type="button" class="btn btn-outline-light" onClick={() => {this.discoverGenre("Science Fiction")}}>Discover SCI-FI</button></div>
      <div><button type="button" class="btn btn-outline-light" onClick={() => {this.discoverGenre("Comedy")}}>Discover Comedy</button></div>
      <div><button type="button" class="btn btn-outline-light" onClick={() => {this.discoverGenre("Horror")}}>Discover Horror</button></div>
      <div><button type="button" class="btn btn-outline-light" onClick={() => {this.discoverGenre("Documentary")}}>Discover Documentary</button></div>
        </div>
        <div className="card-container">{html}</div>
      </div>
    );
  }
}

export default Welcome;
