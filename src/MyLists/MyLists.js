import React, { Component } from "react";
import fire from "../config/Fire";
import { Link } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import modelInstance from "../data/GalleryModel";



class MyLists extends Component {
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
            this.refreshMyLists();
        } else {
            this.setState({user: null});
        }
      });
    }



componentDidMount() {
    this.refreshMyLists();
  }

  refreshWishList() {
  
  
  }

refreshMyLists() {

  


}


render() {

    return (
        <div className="container">
          <h3>My list</h3>
        </div>
      );
  }
}

export default MyLists;