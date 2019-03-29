import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchView from "../SearchView/SearchView";
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';
import fire from "../config/Fire";

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
            <DropdownButton
                title="User"
                id="input-group-dropdown-1"
                className="mx-1"
            >
                <Dropdown.Item as={Link} to="/wish_list">Wish list</Dropdown.Item>
                <Dropdown.Item as={Link} to="/my_rated_list">My rated list</Dropdown.Item>
                <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to="/" onClick={this.logout}>Logout</Dropdown.Item>
            </DropdownButton>;

        if (!this.state.user) {
            login_info = <Link to="/login"><Button className="mx-1">Login</Button></Link>
        }
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link to="/" style={{ textDecoration: "black", color: "black" }}>
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
                            <div></div>
                            <SearchView />
                            {login_info}
                        </div>
                    </div>
                </div>
            </nav >
        );
    }
}

export default Header;
