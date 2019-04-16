import React, { Component } from "react";
import { FormControl } from 'react-bootstrap';
import { Link } from "react-router-dom";

class SearchView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
    };

  };

  handleSearchChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    //Här vill vi göra något så att searchresultview uppdateras
    //this.setState({ searchValue: event.target.value });
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <form className="d-flex navbar-form navbar-right form-horizontal" onSubmit={() => this.handleSubmit}>
        <FormControl
          className="search-box"
          role="search"
          placeholder="Search"
          aria-label="Search"
          value={this.state.searchValue}
          onChange={this.handleSearchChange}
          name="searchValue"
        />
        <Link style={{ textDecoration: "black", color: "black", paddingTop: "5px" }}
          to={{
            pathname: "/search/title=" + this.state.searchValue.replace(" ", "+")+"&page=1",
            state: {
              search: this.state.searchValue,
            }
          }}
        >
          <button type="submit"><span className="glyphicon glyphicon-search"></span></button>
        </Link>

      </form>

    );
  }
}



export default SearchView;
