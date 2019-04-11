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

    posterClass += " posterImage";

    return (
      <div className="movieCard" id="parent">
        <Link to={`/movie/${movie.id}` }><img className={posterClass} src={poster} /></Link>
        <div className="hover-content">
        <Star movie={movie} />
        <span class="tooltiptext">Add to watch list</span>
        </div>
      </div>
    );
  }
}

export default MovieCard;
