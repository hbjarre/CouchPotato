import React, { Component } from "react";
import { Link } from "react-router-dom";
import modelInstance from "../data/GalleryModel"



class SearchResults extends Component {

    constructor(props) {

        super(props);

            this.state = {
                status:"LOADING"
        
        }

    }

    componentDidMount() {


        modelInstance
      .getMovie("Avatar")
      .then(movieResponse => {
        this.setState({
          status: "LOADED",
          movies: movieResponse


         // movies: movieResponse.Search.map(element => {
        //  return element.Title
        //  })




        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });

    }

    render() {
        let movies = null;
        let html = null;
    
        // depending on the state we either generate
        // useful message to the user or show the list
        // of returned movies
        switch (this.state.status) {
          case "LOADING":
            movies = <em>Loading...</em>;
            break;
          case "LOADED":
            movies = this.state.movies
            html = movies.Search.map((element, index) => 
                 <li key={index}>{element.Title} {element.Year}</li>
                )
            
            ;
            break;
          default:
            movies = <b>Failed to load data, please try again</b>;
            break;
        }
    
        return (
          <div className="Movies">
            <h3>Movies</h3>
            <ul>{html}</ul>
          </div>
        );
      }

}

export default SearchResults;
