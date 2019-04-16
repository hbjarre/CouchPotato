import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchView from "../SearchView/SearchView";
import fire from "../config/Fire";
import "./Header.css";

class Header extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            user: false
        }

        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user)
                this.setState({ user: user });
            } else {
                this.setState({ user: false });
            }
        });
    }

    logout() {
        fire.auth().signOut();
    }

    render() {
        console.log(this.state.user.email)
        var login_info =
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle navbar-img" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                            {this.state.user.email}
                        </a>
                        <ul className="dropdown-menu">
                            <li><Link to="/wish_list">Wish list</Link></li>
                            <li role="separator" className="divider"></li>
                            <li><Link to="/login" onClick={this.logout}>Logout</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>

        if (this.state.user===false) {
            login_info = <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                    <li >
                        <Link to="/login" aria-haspopup="true" aria-expanded="false">
                            Login/Sign up
                        </Link>
                    </li>
                </ul>
            </div>
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
