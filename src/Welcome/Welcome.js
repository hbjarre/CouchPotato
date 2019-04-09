import React, { Component } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import BigBoyMovieCard from "../MovieCard/BigBoyMovieCard";
import "./Welcome.css";
//import fire from "../config/Fire";
import modelInstance from "../data/GalleryModel";

class Welcome extends Component {
  constructor(props){
    super(props);

    this.state = {
      status: "LOADING",
      movies: []
    }


  }

  componentDidMount() {
    this.refreshDiscovery();
  }

  refreshDiscovery() {
    modelInstance.discoverPopularMovies().then(
      movieResponse => {
        this.setState({
          status: "LOADED",
          movies: movieResponse
        })
      })
      .catch((e) => {
        this.setState({
          status: "ERROR"
          
        });
      });;


  }

  render() {
    console.log("rendering")
    let movies = null;
    let html_bigboy = null;
    let html_r1 = null;
    let html_r2 = null;
    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned movies

    switch (this.state.status) {
      case "LOADING":
        html_bigboy = <em>Loading...</em>;
        break;
      case "LOADED":

        movies = this.state.movies;
        //Limit to 5 movies
        var discovered_movies = movies.results.slice(0,5);

        var bigboy_card = discovered_movies.splice(0,1);
        console.log(bigboy_card)
        var row_1 = discovered_movies.splice(0,2);
        console.log(row_1)
        var row_2 = discovered_movies;
        console.log(row_2)

        if (discovered_movies != undefined) {
          html_bigboy = bigboy_card.map((element, index) =>
          <Link to={`/movie/${element.id}`} key={index}><BigBoyMovieCard movie={element} /></Link>
        );
          html_r1 = row_1.map((element, index) =>
            <Link to={`/movie/${element.id}`} key={index}><MovieCard movie={element} /></Link>
          );
          html_r2 = row_2.map((element, index) =>
            <Link to={`/movie/${element.id}`} key={index}><MovieCard movie={element} /></Link>
          );
        }

        else {
          html_bigboy = <b>Could not find moviess.</b>;
        }
        break;
      default:
        html_bigboy = <b>Failed to load data, please try again.</b>;
        break;
    }


    return (
      <div className="container">
      <h3>Discover Popular Movies</h3>

      <div className="d-flex flex-wrap justify-content-center">
      <div >{html_bigboy}</div>
      <div>
      <div className="d-flex">{html_r1}</div>
      <div className="d-flex">{html_r2}</div>
      </div>
      </div>

    </div>
    );
  }
}

export default Welcome;
