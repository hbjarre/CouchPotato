import React, { Component } from "react";
import modelInstance from "../data/GalleryModel"
import "../DetailView/DetailView.css";

class DetailView extends Component {

    constructor(props) {

        super(props);
        console.log(this.props.match.params.id)
        this.state = {
            status: "LOADING",
            id: this.props.match.params.id
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
                this.setState({
                    status: "LOADED",
                    movie: movie
                });
            })
            .catch(() => {
                this.setState({
                    status: "ERROR"
                });
            });
    }

    componentDidUnMount() {

    }

    AddToWatchList() {
        console.log("we got there!!")
        //modelInstance.addToWatch(this.state.movie)
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
                html =
                    <div>
                        <div className="d-flex p-3 flex-column detail_header">
                            <div className="d-flex flex-row justify-content-between">
                                <h3>{this.state.movie.Title}</h3>
                                <div className="d-flex justify-content-end">
                                    <img src="/img/soffpotatis.png" className="mx-auto" style={{ width: 50, height: 50 }} alt="CouchPotato Logo" />
                                    {this.CouchPotatoRating(this.state.movie)}
                                </div>
                            </div>
                            <h5>({this.state.movie.Year}) {this.state.movie.Genre} | {this.state.movie.Runtime}</h5>
                        </div>
                        <div className="d-flex p-3 flex-column">
                            <p>{this.state.movie.Plot}</p>
                            <div className="d-flex flex-column details">
                                <h6><strong>Director:</strong> {this.state.movie.Director}<br />
                                    <strong>Actors:</strong> {this.state.movie.Actors}<br />
                                    <strong>Writers:</strong> {this.state.movie.Writer}
                                </h6>
                                <div className="d-flex flex-column">
                                    <h4>
                                        Details
                                    </h4>
                                    <h6>
                                        <strong>Awards: </strong>{this.state.movie.Awards} <br />
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
                                        <strong>Website: </strong> <a href={this.state.movie.Website}>{this.state.movie.Website}</a>
                                    </h6 >
                                </div>
                            </div>
                        </div>
                    </div>

                break;
            default:
                html = <b>Failed to load data, please try again.</b>;
                break;
        }

        return (
            <div className="container d-flex DetailView">
                <div className="d-flex flex-wrap">{movie}</div>
                <div className="d-flex flex-wrap">{html}</div>
                <button onClick={() => this.AddToWatchList()}>+</button>
            </div>
        );
    }

}

export default DetailView;
