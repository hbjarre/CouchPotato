import React, { Component } from "react";
import { Link } from "react-router-dom";

import Star from "../star";

class MovieCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let movie = this.props.movie;

    let poster = "http://image.tmdb.org/t/p/w342/" + movie.poster_path;
    let posterClass = "";
    if (movie.poster_path == null) {
      poster = "img/film-roll.png";
      posterClass = "notFound";
    }

    return (
      <div className="movieCard" id="parent">
        <Link to={`/movie/${movie.id}`}><img className={posterClass} src={poster} /></Link>
        <p  style={{ textDecoration: "white", color: "white" }} className="hover-content">{movie.original_title}</p>
        <Star movie={movie} />
      </div>
    );
  }
}

export default MovieCard;
