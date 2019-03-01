import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchView from "../SearchView/SearchView";
import { InputGroup, Button, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import fire from "../config/Fire";


class Header extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        fire.auth().signOut();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <div className="row align-items-center mx-auto">
                        <img src="/img/soffpotatis.png" className="mx-auto" style={{width: 75, height: 'auto'}} alt="CouchPotato Logo" />
                        <Link to="/"><h2 className="mx-auto">CouchPotato</h2></Link>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <div className="d-flex w-100 justify-content-between">
                            <div></div>
                            <SearchView />
                            <DropdownButton
                                title="User"
                                id="input-group-dropdown-1"
                                className="mx-1"
                            >
                                <Dropdown.Item href="/wish_list">Wish list</Dropdown.Item>
                                <Dropdown.Item href="/my_rated_list">My rated list</Dropdown.Item>
                                <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#" onClick={this.logout}>Logout</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;
