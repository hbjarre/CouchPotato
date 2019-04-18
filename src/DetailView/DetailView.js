import React, { Component } from "react";
import modelInstance from "../data/GalleryModel"
import fire from "../config/Fire"
import "./DetailView.css";

class DetailView extends Component {

    constructor(props) {

        super(props);
        this.state = {
            status: "LOADING",
            id: this.props.match.params.id,
            onWishList: false,
            user: null,
            showWishList: false
        }
        this.url = window.location.href.split("/")[4];
        this.AddToWatchList = this.AddToWatchList.bind(this)

        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user });
                this.refreshWishList();
            } else {
                this.setState({ user: null });
            }
        });

    }

    componentDidMount() {
        // when data is retrieved we update the state
        // this will cause the component to re-render
        modelInstance
            .getMovieById(this.state.id)
            .then(movie => {
                this.setState({
                    status: "LOADED",
                    movie: movie,
                    genres: movie.genres,
                    production_companies: movie.production_companies,
                    countries: movie.production_countries
                });

                this.refreshWishList();
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
                this.setState({ onWishList: false });
            });
        }
        else {
            modelInstance.addToWatch(this.state.movie).then(() => {
                this.setState({ onWishList: true });
            });
        }
    }

    CouchPotatoRating(movie) {
        if (movie.vote_average === "0") {
            return <h5>No score</h5>
        }
        else {
            return <h4>{movie.vote_average}/10</h4>
        }
    }

    refreshWishList() {
        if (this.state.user != null && this.state.movie != null) {
            var db = fire.firestore();
            var query = db.collection("user_data").where("user_id", "==", this.state.user.uid)
                .where("watch_list", "array-contains", this.state.movie.id);

            query.get().then((doc) => {
                if (doc.size > 0) {
                    this.setState({
                        onWishList: true,
                        showWishList: true
                    });
                }
                else {
                    this.setState({
                        onWishList: false,
                        showWishList: true
                    });
                }
            }).catch((e) => {
                console.error(e);
                this.setState({
                    status: "ERROR"
                });
            });
        }
    }

    getSomeList(badlist, goodlist) {
        for (let i in badlist) {
            if (i === 0){
                goodlist.push(badlist[i].name)
            }
            else {goodlist.push(", " + badlist[i].name)}
        }
        return goodlist
    }

    render() {
        let movie = null;
        let html = null;
        var genre_list = []
        genre_list = this.getSomeList(this.state.genres, genre_list);
        var companies_list = []
        companies_list = this.getSomeList(this.state.production_companies, companies_list)
        var countries_list = []
        countries_list = this.getSomeList(this.state.countries, countries_list)

        // depending on the state we either generate
        // useful message to the user or show the list
        // of returned movies
        switch (this.state.status) {
            case "LOADING":
                html = <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;
                break;
            case "LOADED":

                movie = <img src={"http://image.tmdb.org/t/p/w342/" + this.state.movie.poster_path} className="poster-image" />
                var onWishList = this.state.onWishList;

                var starIconClass = "ml-3 far fa-star fa-lg star";
                if (onWishList) {
                    starIconClass = "ml-3 fas fa-star fa-lg star";
                }

                if (!this.state.showWishList) {
                    starIconClass = "d-none";
                }

                html =
                    <div className="">
                        <div className="d-flex align-items-center justify-content-between w-100">
                            <h3><strong>{this.state.movie.original_title}</strong></h3>
                            <div className="d-flex align-items-center">
                                {this.CouchPotatoRating(this.state.movie)}
                                <div className="detail_star">
                                    <i className={starIconClass} style={{ color: "#F0C900", cursor: "pointer" }} onClick={() => this.AddToWatchList()}></i>
                                    <span className="star_tooltiptext">Add to watch list</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h5>{genre_list}</h5> <br/>
                            <h4>{this.state.movie.runtime} minutes</h4>
                            <p>{this.state.movie.overview}</p>
                            <h4>
                                Details
                        </h4>
                            <h6>
                                <strong>Released: </strong>{this.state.movie.release_date} <br />
                                <strong>Companies: </strong> {companies_list} <br />
                                <strong>Production countries: </strong> {countries_list} <br />
                                <strong>Original language: </strong> {this.state.movie.original_language}
                            </h6>
                        </div>
                    </div >
                break;
            default:
                html = <b>Failed to load data, please try again.</b>;
                break;
        }                       

        return (
            <div className="container">
            <div className="detail-view-container d-flex flex-wrap flex-lg-nowrap">
                <div className="d-flex detail-view-header flex-grow-1">
                    <div className="d-flex flex-grow-1 justify-content-center position-relative">
                        <i className="fas fa-chevron-left fa-2x m-4 detail-view-back-button" onClick={() => this.props.history.goBack()} style={{ cursor: 'pointer' }}></i>
                        {movie}
                    </div>
                </div>
                <div className="d-flex flex-wrap justify-content-center m-4">{html}</div>
            </div>  
            </div>
        );
    }

}

export default DetailView;
