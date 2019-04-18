import React, { Component } from "react";
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
      <form className="form-inline" onSubmit={() => this.handleSubmit}>
        <input type="search" className="form-control" placeholder="Search" value={this.state.searchValue} onChange={this.handleSearchChange} name="searchValue"></input>
          <Link
            to={{
              pathname: "/search/title=" + this.state.searchValue.replace(" ", "+")+"&page=1",
              state: {
                search: this.state.searchValue,
              }
            }}
          >
          <button className="btn btn-outline-light ml-sm-2 mt-2 mt-sm-0" type="submit"><i className="fas fa-search"></i></button>
          </Link>

      </form>

    );
  }
}



export default SearchView;
