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

    let cardClass = "";

    if (this.props.big) {
      posterClass += " posterImageBig";
      cardClass = "bigboymovieCard";
    }
    else {
      posterClass += " posterImage";
      cardClass = "movieCard";
    }
    

    return (
      <div className={cardClass}>
        <Link to={`/movie/${movie.id}` }><img className={posterClass} src={poster} /></Link>
        <div className="hover-content">
        <Star movie={movie} />
        <span className="tooltiptext">Add to watch list</span>
        </div>
      </div>
    );
  }
}

export default MovieCard;
