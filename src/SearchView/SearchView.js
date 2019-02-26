import React, { Component } from "react";
import { InputGroup, FormControl, Button } from 'react-bootstrap';

class SearchView extends Component {
  render() {
    return (
      <div className="d-flex">
        <InputGroup className="mb-3">
        <FormControl
        placeholder="Search..."
        aria-label="Search"
        />
        <select>
            <option selected value="all">All</option>
            <option value="lime">Action</option>
            <option value="comedy">Comedy</option>
            <option value="horrer">Horror</option>
        </select>
        <Button>Search</Button>
      
        </InputGroup>
      </div>
    );
  }
}

export default SearchView;
