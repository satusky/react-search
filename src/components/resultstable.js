import React from "react";
import "../App.css";

export default class ResultsTable extends React.Component {

  render() {
    return (
      <div className="results">
        <h1 id="title">Search Results</h1>
        <h3>Click to expand</h3>
        <table id="results">
          <tbody>{this.props.onChange}</tbody>
        </table>
      </div>
    );
  }
}

