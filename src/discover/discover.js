import React, { Component } from "react";
import fire from "../config/Fire";
import { Link } from "react-router-dom";
import modelInstance from "../data/GalleryModel"


class Discovery extends Component {
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
    this.refreshWishList();
    this.findGenre();
  }

  refreshWishList() {
     
    if (this.state.user != null) {
      var db = fire.firestore();
      var query = db.collection("user_data").where("user_id", "==", this.state.user.uid);

      query.get().then((doc) => {
          if (doc.size == 0) {
            this.setState({
              status: "LOADED"
            });
          }

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
              console.error(e);
              this.setState({
                status: "ERROR"
              });
            });
          });
      }).catch(e => {
        console.error(e);
        this.setState({
          status: "ERROR"
        });
      });
    }
  
  }


  findGenre() {

    console.log("attempts findGenre")
    var genreList = [];

    var myWatchlist = this.movies;

    console.log(myWatchlist)

    myWatchlist.forEach(movie => {
        genreList.push(modelInstance.getMovieById(movie.id).genres.name);
    })

    console.log("works")
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

        if (movies != undefined) {
          if (movies.length == 0) {
            html = <div><em>Use random discovery</em></div>;
          }
          else {
            html = movies[0].id;
            ;
          }
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
      
 
        <h3>Discovery</h3>
        <div className="d-flex flex-wrap justify-content-center">{html}</div>
      </div>
    );
  }
}

export default Discovery;
