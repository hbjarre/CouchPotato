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
      <div><button id="popular" type="button" className="btn btn-outline-light wht" onClick={() => {this.updateMovies()}}>Popular movies</button></div>
      <div><button type="button" className="btn btn-outline-light wht" onClick={() => {this.discoverGenre("Action")}}>Action</button></div>
      <div><button type="button" className="btn btn-outline-light wht" onClick={() => {this.discoverGenre("Drama")}}>Drama</button></div>
      <div><button type="button" className="btn btn-outline-light wht" onClick={() => {this.discoverGenre("Comedy")}}>Comedy</button></div>
      <div><button type="button" className="btn btn-outline-light wht" onClick={() => {this.discoverGenre("Science Fiction")}}>SCI-FI</button></div>
      <div><button type="button" className="btn btn-outline-light wht" onClick={() => {this.discoverGenre("Fantasy")}}>Fantasy</button></div>
      <div><button type="button" className="btn btn-outline-light wht" onClick={() => {this.discoverGenre("Horror")}}>Horror</button></div>
      <div><button type="button" className="btn btn-outline-light wht" onClick={() => {this.discoverGenre("Documentary")}}>Documentary</button></div>
        </div>
        <div className="card-container">{html}</div>
      </div>
    );
  }
}

export default Welcome;
/*0: {id: 28, name: "Action"}
1: {id: 12, name: "Adventure"}
2: {id: 16, name: "Animation"}
3: {id: 35, name: "Comedy"}
4: {id: 80, name: "Crime"}
5: {id: 99, name: "Documentary"}
6: {id: 18, name: "Drama"}
7: {id: 10751, name: "Family"}
8: {id: 14, name: "Fantasy"}
9: {id: 36, name: "History"}
10: {id: 27, name: "Horror"}
11: {id: 10402, name: "Music"}
12: {id: 9648, name: "Mystery"}
13: {id: 10749, name: "Romance"}
14: {id: 878, name: "Science Fiction"}
15: {id: 10770, name: "TV Movie"}
16: {id: 53, name: "Thriller"}
17: {id: 10752, name: "War"}
18: {id: 37, name: "Western"}*/