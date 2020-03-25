import React from "react";
import "../App.css";

class SearchBar extends React.Component {

  render() {
    return (
      <div className="search">
          <input
            type="text"
            id="searchBar"
            onChange={this.props.onChange}
            value={this.props.value}
            onSubmit={this.props.onSubmit}
            placeholder="Search for something"
          />
          <button
            id="submit"
            value={this.props.value}
            onClick={this.props.onSubmit}
          >
            Submit
          </button>
      </div>
    );
  }
}

export default SearchBar;
