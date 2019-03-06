import React, { Component } from "react";
import { Link } from "react-router-dom";
import modelInstance from "../data/GalleryModel"
import SearchView from "../SearchView/SearchView";
import MovieCard from "../MovieCard/MovieCard";

class SearchResults extends Component {

  constructor(props) {

    super(props);

    this.state = {
      status: "LOADING"
    }

  }

  updateApi = () => {
    let search = this.props.search;
    

    if (search == undefined) {
      search = "Avatar";
    }

    modelInstance
      .getMovie(search)
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

  componentDidMount() {
    this.updateApi();
  }

  componentDidUpdate() {
    this.updateApi();
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
            <MovieCard movie={element} key={index} />
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
        <div className="d-flex flex-wrap">{html}</div>
      </div>
    );
  }

}

export default SearchResults;
