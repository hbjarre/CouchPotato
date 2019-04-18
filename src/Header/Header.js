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
        var login_info =
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.user.email}</a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link to="/wish_list" className="dropdown-item">Watch list</Link>
                    <div class="dropdown-divider"></div>
                    <Link to="/login" onClick={this.logout} className="dropdown-item">Logout</Link>
                </div>
            </li>;

        if (this.state.user === false) {
            login_info = <li class="nav-item"><Link to="/login" aria-haspopup="true" aria-expanded="false" className="nav-link">Login/Sign up</Link></li>;
        }
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
                            <div className="mr-auto ml-lg-5 my-2 my-lg-0">
                                <SearchView />
                            </div>
                            <ul className="navbar-nav my-2 my-lg-0">
                            {login_info}
                            </ul>
                        </div>
                    </div>
                </nav >
            </div>
        );
    }
}

export default Header;
