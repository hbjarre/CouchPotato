import React, { Component } from "react";
import { Link } from "react-router-dom";
import modelInstance from "../data/GalleryModel"
import SearchView from "../SearchView/SearchView";
import MovieCard from "../MovieCard/MovieCard";

class SearchResults extends Component {

  constructor(props) {

    super(props);
    this.state = {
      status: "LOADING",
      search: this.props.match.params.str
    }
    this.url = window.location.href.split("/")[4];
    console.log(this.url);
  }

  componentWillReceiveProps(nextProps){
    const old = this.state.search;
    const newStr = nextProps.match.params.str;
    console.log(newStr)

    if (old != newStr){
      modelInstance.getMovie(newStr, "").then(
        movieResponse =>{
        this.setState({
          status: "LOADED",
            search: newStr,
            movies: movieResponse
        })
      });
    }
  }

  componentDidMount() {
    this.search = this.props.search;
    

    if (this.state.search == undefined) {
      this.state.search = "Avatar";
    }

    modelInstance
      .getMovie(this.state.search,"")
      .then(movieResponse => {
        this.setState({
          status: "LOADED",
          movies: movieResponse

        });
      })
      .catch((e) => {
        this.setState({
          status: "ERROR"
        });
      });
  }

  componentDidUnMount() {
    
  }

  render() {
    let movies = null;
    let html = null;
    

    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned movies
    switch (this.state.status) {
      case "LOADING":
        html = <em>Loading...</em>;
        break;
      case "LOADED":
      
        movies = this.state.movies;

        if (movies.Search != undefined) {
          html = movies.Search.map((element, index) =>
            <Link to={`/movie/${element.imdbID}`} key={index}><MovieCard movie={element} /></Link>
          );
        }
        else {
          html = <b>Could not find movies.</b>;
        }
        break;
      default:
        html = <b>Failed to load data, please try again.</b>;
        break;
    }

    return (
      <div className="container">
      
 
        <h3>Movies</h3>
        <div className="d-flex flex-wrap justify-content-center">{html}</div>
      </div>
    );
  }

}

export default SearchResults;
