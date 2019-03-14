import React, { Component } from "react";
import { FormControl} from 'react-bootstrap';
import { Link } from "react-router-dom";

class SearchView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      type: 'all'
    };

  };

  handleSearchChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    //Här vill vi göra något så att searchresultview uppdateras
    //this.setState({ searchValue: event.target.value });
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return (
      <form className="d-flex" onSubmit={() => this.handleSubmit}>
        {//Måste vi använda angular här? Är det verkligen bra?
        }
        <FormControl
          placeholder="Search..."
          aria-label="Search"
          value={this.state.searchValue}
          onChange={this.handleSearchChange}
          name="searchValue"
        />
        <select name="type" onChange={this.handleSearchChange} defaultValue="All">
        <option value="all">All</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
        <Link
          to={{
            pathname: "/search/title=" + this.state.searchValue.replace(" ", "+") + "&type=" + this.state.type,
            state: {
              search: this.state.searchValue,
              type: this.state.type
            }
          }}
        >
          <button type="submit">Search</button>
        </Link>
      </form>

    );
  }
}



export default SearchView;
