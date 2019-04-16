import React, { Component } from "react";
import modelInstance from "./data/GalleryModel"
import fire from "./config/Fire"

class star extends Component {

    constructor(props) {

        super(props);
        this.state = {
            id: this.props.movie.id,
            movie: this.props.movie,
            onWishList: false,
            user: null,
            showWishList: false
        }
        this.AddToWatchList = this.AddToWatchList.bind(this)

        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user: user});
                this.refreshWishList();
            } else {
                this.setState({user: null});
            }
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

    
    refreshWishList() {
        if (this.state.user != null && this.state.movie != null) {
            var db = fire.firestore();
            var query = db.collection("user_data").where("user_id", "==", this.state.user.uid)
                                                  .where("watch_list", "array-contains", this.state.id);

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

    render() {
        var onWishList = this.state.onWishList;

                var starIconClass = "far fa-star fa-2x star";
                if (onWishList) {
                    starIconClass = "fas fa-star fa-2x star";
                }
                if (!this.state.showWishList) {
                    starIconClass = "d-none";
                }

        return (
            <i className={starIconClass} style={{color: "#F0C900", cursor: "pointer"}} onClick={() => this.AddToWatchList()}></i>
        );
    }

}

export default star;
