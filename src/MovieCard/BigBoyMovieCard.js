import React, { Component } from "react";

class BigBoyMovieCard extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let movie = this.props.movie;

    let poster = "http://image.tmdb.org/t/p/w780/" + movie.poster_path;
    let posterClass = "";
    if (movie.poster_path == null) {
        poster = "img/film-roll.png";
        posterClass = "notFound";
    }

    return (
      <div className="bigboymovieCard">
          <img className={posterClass} src={poster} />
          <p>{movie.original_title}</p>
      </div>
    );
  }
}

export default BigBoyMovieCard;
