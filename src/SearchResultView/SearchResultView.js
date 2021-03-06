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
      page: this.props.match.params.page
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
            status: "LOADING"
          })
    const old = this.state.search;
    const old_page = this.state.page;
    const newStr = nextProps.match.params.str;
    const new_page = nextProps.match.params.page;

    if (old !== newStr || old_page !== new_page) {
      modelInstance.getMovie(newStr, this.state.page).then(
        movieResponse => {
          this.setState({
            status: "LOADED",
            search: newStr,
            page: new_page,
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
    modelInstance.getTest();

    modelInstance
      .getMovie(this.state.search, this.state.page)
      .then(movieResponse => {
        this.setState({
          status: "LOADED",
          movies: movieResponse,
          max_pages: movieResponse.total_pages
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
        if (this.state.page!==1){
        var back_btn =<Link to={`/search/title=${this.state.search}&page=${parseInt(this.state.page)-1}`} ><i className="fas fa-chevron-left fa-2x" style={{ color: "white", cursor: 'pointer' }}></i></Link>
        }
        if (this.state.page<this.state.max_pages){
        var next_btn = <Link to={`/search/title=${this.state.search}&page=${parseInt(this.state.page)+1}`} ><i className="fas fa-chevron-right fa-2x" style={{ color: "white", cursor: 'pointer' }}></i></Link>
        }
        if (movies.results !== undefined) {
          html = movies.results.map((element, index) =>
            <MovieCard movie={element} key={index}/>
          );
        }

        else {
          html = <b>Could not find any movies with the title {this.state.search}.</b>;
        }
        if (movies.total_results === 0) {
          html = <b>Could not find any movies with the title {this.state.search}.</b>
        }
        break;
      default:
        html = <b>Failed to load data, please try again.</b>;
        break;
    }

    return (
      <div className="container d-flex flex-wrap flex-lg-nowrap">
       <Link to="/" style={{ textDecoration: "white", color: "white" }}>
       <i className="fas fa-chevron-left fa-2x mt-4 mr-4" style={{ cursor: 'pointer' }}></i></Link>
       <div>
        <div className="d-flex flex-wrap justify-content-center">{html}</div>
        <div className="d-flex justify-content-center mb-5">
          {back_btn}<p className="align-self-center mb-0 mx-5">{this.state.page}</p>{next_btn}
        </div>
      </div>
        
      </div>
    );
  }

}

export default SearchResults;
