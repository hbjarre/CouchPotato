import React, { Component } from "react";
import { Link } from "react-router-dom";
import modelInstance from "../data/GalleryModel"
import MovieCard from "../MovieCard/MovieCard";

class SearchResults extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: "LOADING",
      search: this.props.match.params.str,
      type: this.props.match.params.typ,
      page: 1
    }
    this.url = window.location.href.split("/")[4];
    this.NextPage = this.NextPage.bind(this);
    this.BackPage = this.BackPage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const old = this.state.search;
    const old_type = this.state.type;
    const newStr = nextProps.match.params.str;
    const new_type = nextProps.match.params.typ;

    if (old != newStr || old_type != new_type) {
      modelInstance.getMovie(newStr, "", new_type, this.state.page).then(
        movieResponse => {
          this.setState({
            status: "LOADED",
            search: newStr,
            type: new_type,
            movies: movieResponse
          })
        });
    }
  }


  NextPage() {
    document.getElementById("back_btn").disabled = false;
    let page_nr = (this.state.page + 1);
    console.log(page_nr)
    modelInstance.getMovie(this.state.search, "", this.state.type, page_nr).then(
      movieResponse => {
        this.setState({
          status: "LOADED",
          page: page_nr,
          movies: movieResponse
        });
      })
  }
  

  BackPage() {
    let page_nr = (this.state.page - 1);
    console.log(page_nr)
    modelInstance.getMovie(this.state.search, "", this.state.type, page_nr).then(
      movieResponse => {
        this.setState({
          status: "LOADED",
          page: page_nr,
          movies: movieResponse
        });
      })
  }

  componentDidMount() {
    this.search = this.props.search;

    modelInstance.getTest();


    if (this.state.search == undefined) {
      this.state.search = "Avatar";
    }

    modelInstance
      .getMovie(this.state.search)
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
        html = <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;
        break;
      case "LOADED":

        movies = this.state.movies;
        var back_btn = <button onClick={this.BackPage} id="back_btn">back</button>
        var next_btn = <button onClick={this.NextPage}>next</button>
        if (movies.results != undefined) {
          html = movies.results.map((element, index) =>
            <Link to={`/movie/${element.id}`} key={index}><MovieCard movie={element} /></Link>
          );
        }

        else {
          html = <b>Could not find {this.state.type}s.</b>;
        }
        if (movies.total_results == 0) {
          html = <b>No movies found...</b>
        }
        break;
      default:
        html = <b>Failed to load data, please try again.</b>;
        break;
    }

    return (
      <div className="container">
       <Link to="/" style={{ textDecoration: "white", color: "white" }}>
       <i className="fas fa-chevron-left fa-2x mt-4 mr-4" style={{ cursor: 'pointer' }}></i></Link>
        <div className="d-flex flex-wrap justify-content-center">{html}</div>
      </div>
    );
  }

}

export default SearchResults;
