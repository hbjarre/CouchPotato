import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchView from "../SearchView/SearchView";
import fire from "../config/Fire";
import "./Header.css";

class Header extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.user)
        this.logout = this.logout.bind(this);
        this.state = {
            user: false
        }

        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: true });
            } else {
                this.setState({ user: false });
            }
        });
    }

    logout() {
        fire.auth().signOut();
    }

    render() {
        var login_info =
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle navbar-img" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                            Account
<img src="http://placehold.it/150x150" className="img-circle" alt="Profile Image" />
                        </a>
                        <ul className="dropdown-menu">
                            <li><Link to="/wish_list">Wish list</Link></li>
                            <li><Link to="/my_rated_list">Rated list</Link></li>
                            <li role="separator" className="divider"></li>
                            <li><Link to="/settings">Settings</Link></li>
                            <li><Link to="/login" onClick={this.logout}>Logout</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>;

        if (!this.state.user) {
            login_info = <div><Link to="/login" className=" navbar-img" role="button" style={{ textDecoration: "white", color: "white" }}>Login</Link></div>;
        }
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-inverse bs-dark">
                    <div className="container">
                        <Link to="/" style={{ textDecoration: "white", color: "white" }}>
                            <div className="row align-items-center mx-auto">
                                <img src="/img/soffpotatis.png" className="mx-auto" style={{ width: 75, height: 'auto' }} alt="CouchPotato Logo" />
                                <h2 className="mx-auto">CouchPotato</h2>
                            </div>
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                            <div className="d-flex w-100 justify-content-between">
                                <SearchView />
                                {login_info}
                            </div>
                        </div>
                    </div>


                </nav >
            </div>
        );
    }
}

export default Header;
