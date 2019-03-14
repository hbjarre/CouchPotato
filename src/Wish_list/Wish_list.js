import React, { Component } from "react";
import fire from "../config/Fire";
import { Link } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import modelInstance from "../data/GalleryModel"


class Wish_list extends Component {
  constructor(props){
    super(props);

    this.state = {
      status: "LOADING",
      movies: [],
      user: null
    }

    fire.auth().onAuthStateChanged((user) => {
      if (user) {
          this.setState({user: user});
          this.refreshWishList();
      } else {
          this.setState({user: null});
      }
    });
  }

  componentDidMount() {
  }

  refreshWishList() {
    

    var db = fire.firestore();
    var query = db.collection("user_data").where("user_id", "==", this.state.user.uid);

    query.get().then((doc) => {
        doc.docs.forEach((userData) => {
          var promiseList = [];
          userData.data().watch_list.forEach(movieId => {
              promiseList.push(modelInstance.getMovieById(movieId));
          });
          
          Promise.all(promiseList).then(responses => {
            console.log(responses);
            this.setState({
              status: "LOADED",
              movies: responses
            });
          }).catch(e => {
            this.setState({
              status: "ERROR"
            });
          });
        });
    });

    /*modelInstance
      .getMovieById("tt0076759")
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
      });*/
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

        if (movies != undefined) {
          html = movies.map((element, index) =>
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
      
 
        <h3>Wish list</h3>
        <div className="d-flex flex-wrap justify-content-center">{html}</div>
      </div>
    );
  }
}

export default Wish_list;
