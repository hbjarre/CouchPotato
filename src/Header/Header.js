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
            <div className="bg-light p-4">
                <div className="d-flex justify-content-between container">
                    <h1>CouchPotato</h1>
                    <SearchView />
                    <div className="d-flex justify-content-begin">
                        <InputGroup className="mb-3">
                            <DropdownButton
                                title="User"
                                id="input-group-dropdown-1"
                            >
                                <Dropdown.Item href="#">Favorites</Dropdown.Item>
                                <Dropdown.Item href="#">Settings</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#" onClick={this.logout}>Logout</Dropdown.Item>
                            </DropdownButton>
                        </InputGroup>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
