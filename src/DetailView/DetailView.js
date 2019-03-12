import React, { Component } from "react";
import modelInstance from "../data/GalleryModel"
import fire from "../config/Fire"

class DetailView extends Component {

    constructor(props) {

        super(props);
        console.log(this.props.match.params.id)
        this.state = {
            status: "LOADING",
            id: this.props.match.params.id,
            onWishList: false
        }
        this.url = window.location.href.split("/")[4];
        this.AddToWatchList = this.AddToWatchList.bind(this)
    }

    componentDidMount() {
        // when data is retrieved we update the state
        // this will cause the component to re-render
        modelInstance
            .getMovie("", this.state.id)
            .then(movie => {
                var db = fire.firestore();
                var query = db.collection("user_data").where("user_id", "==", fire.auth().currentUser.uid)
                                                      .where("watch_list", "array-contains", movie.imdbID);

                query.get().then((doc) => {
                    var onWishList = false;
                    console.log(doc);
                    console.log(doc.size);
                    if (doc.size > 0) {
                        onWishList = true;
                    }

                    this.setState({
                        status: "LOADED",
                        movie: movie,
                        onWishList: onWishList
                    });
                }).catch((e) => {
                    console.error(e);
                    this.setState({
                        status: "ERROR"
                    });
                });
            })
            .catch((e) => {
                console.error(e);
                this.setState({
                    status: "ERROR"
                });
            });
    }

    componentDidUnMount() {

    }

    AddToWatchList() {
        if (this.state.onWishList) {
            modelInstance.removeFromWatch(this.state.movie).then(() => {
                this.setState({onWishList: false});
            });
        }
        else {
            modelInstance.addToWatch(this.state.movie).then(() => {
                this.setState({onWishList: true});
            });
        }
    }

    CouchPotatoRating(movie) {
        if (movie.Metascore == "N/A") {
            return <h5>No score</h5>
        }
        else {
            return <h4>{this.state.movie.Metascore}/100</h4>
        }

    }

    render() {
        let movie = null;
        let html = null;


        // depending on the state we either generate
        // useful message to the user or show the list
        // of returned movies
        switch (this.state.status) {
            case "LOADING":
                html = <em>Loading...</em>;
                break;
            case "LOADED":
                console.log(this.state.movie)
                movie = <img src={this.state.movie.Poster} />
                var onWishList = this.state.onWishList;

                var starIconClass = "ml-3 far fa-star fa-lg";
                if (onWishList) {
                    starIconClass = "ml-3 fas fa-star fa-lg";
                }

                html =
                    <div className="d-flex row">
                        <div className="d-flex align-items-center">
                            <h3><strong>{this.state.movie.Title}</strong></h3>
                            <img src="/img/soffpotatis.png" className="mx-auto" style={{ width: 50, height: 50 }} alt="CouchPotato Logo" />
                            {this.CouchPotatoRating(this.state.movie)}
                            <i className={starIconClass} style={{color: "#F0C900", cursor: "pointer"}} onClick={() => this.AddToWatchList()}></i>
                        </div>
                        <div>
                        <h4>({this.state.movie.Year}) {this.state.movie.Genre} | {this.state.movie.Runtime}</h4>
                        <p>{this.state.movie.Plot}</p>
                        <h6><strong>Director:</strong> {this.state.movie.Director}<br />
                            <strong>Actors:</strong> {this.state.movie.Actors}<br />
                            <strong>Writers:</strong> {this.state.movie.Writer}
                        </h6>
                        <h4>
                            Details
                        </h4>
                        <h6>
                            <strong>Awards: </strong>{this.state.movie.Awards}<br />
                            <strong>
                                Ratings:</strong> {this.state.movie.Ratings.Value}
                            <ul>{this.state.movie.Ratings.map((rating) => {
                                return (<li key={rating.Source}>
                                    <strong>{rating.Source}</strong> {rating.Value}
                                </li>)
                            })}</ul>
                            <strong>Rated: </strong>{this.state.movie.Rated} <br />
                            <strong>Released: </strong>{this.state.movie.Released} <br />
                            <strong>BoxOffice: </strong>{this.state.movie.BoxOffice} <br />
                            <strong>Language: </strong>{this.state.movie.Language} <br />
                            <strong>Country: </strong>{this.state.movie.Country} <br />
                            <strong>Production: </strong>{this.state.movie.Production} <br />
                            <strong>Website: </strong><a href={this.state.movie.Website}>{this.state.movie.Website}</a>
                        </h6>
                        </div>
                    </div >
                break;
            default:
                html = <b>Failed to load data, please try again.</b>;
                break;
        }

        return (
            <div className="container d-flex">
                <div className="d-flex flex-wrap m-3">{movie}</div>
                <div className="d-flex flex-wrap p-3">{html}</div>
            </div>
        );
    }

}

export default DetailView;
