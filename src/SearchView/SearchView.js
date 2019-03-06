import React, { Component } from "react";
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import SearchResults from "../SearchResultView/SearchResultView"

class SearchView extends Component {

  constructor(props) {
    super(props);
    };

    click = () => {

      //this.props.getMovies();
  }


  render() {
    return (
      <div className="d-flex">
        <InputGroup>
        <FormControl
        placeholder="Search..."
        aria-label="Search"
        />
        <select>
            <option defaultValue="all">All</option>
            <option value="lime">Action</option>
            <option value="comedy">Comedy</option>
            <option value="horrer">Horror</option>
        </select>
        <button onClick={this.click}>Search</button>

        </InputGroup>
      </div>
    );
  }
}



export default SearchView;
