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
                    <Link style={{ textDecoration: 'none', color: 'black'}} to="/"><h1>CouchPotato</h1></Link>
                    <SearchView />
                    <div className="d-flex justify-content-begin">
                        <InputGroup className="mb-3">
                            <DropdownButton
                                title="User"
                                id="input-group-dropdown-1"
                            >
                                <Dropdown.Item href="/wish_list">Wish list</Dropdown.Item>
                                <Dropdown.Item href="/my_rated_list">My rated list</Dropdown.Item>
                                <Dropdown.Item href="/settings">Settings</Dropdown.Item>
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
