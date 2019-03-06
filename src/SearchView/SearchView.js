import React, { Component } from "react";
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import SearchResults from "../SearchResultView/SearchResultView";
import { Link } from "react-router-dom";

class SearchView extends Component {

  constructor(props) {
    super(props);
    this.state = {searchValue: ''};
    };

    click = () => {
      let search = this.state.searchValue
    }

    handleSearchChange = (event) => {
      this.setState({searchValue: event.target.value});
    }


  render() {
    return (
      <form className="d-flex">
        <InputGroup>
        <FormControl
        placeholder="Search..."
        aria-label="Search"
        value={this.state.searchValue}
        onChange={this.handleSearchChange}
        />
        <select>
            <option defaultValue="all">All</option>
            <option value="lime">Action</option>
            <option value="comedy">Comedy</option>
            <option value="horrer">Horror</option>
        </select>
        <Link
          to={{
            pathname: "/search/" + this.state.searchValue.replace(" ", "+"),
            state: {
              search: this.state.searchValue
            }
          }}
        >
        <button type="submit">Search</button>
        </Link>

        </InputGroup>
      </form>
    );
  }
}



export default SearchView;
