import React, { Component } from "react";

class MovieCard extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let movie = this.props.movie;

    let poster = movie.Poster;
    let posterClass = "";
    if (poster == "N/A") {
        poster = "img/film-roll.png";
        posterClass = "notFound";
    }

    return (
      <div className="movieCard">
          <img className={posterClass} src={poster} />
          <p>{movie.Title}</p>
      </div>
    );
  }
}

export default MovieCard;
