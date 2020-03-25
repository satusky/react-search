//import React, { Component } from 'react';
import React from "react";
import { Container, Row, Col } from "react-grid-system";
import axios from "axios";
import SearchBar from "./components/searchbar";
import ResultsTable from "./components/resultstable";
import ExpandedResult from "./components/expandedresult";
import styles from "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      rows: 500,
      start: 0,
      results: [],
      indexToExpand: [],
      resultToExpand: []
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.toDisplay = this.toDisplay.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    console.log(this.state.value);
  }

  handleSubmit(event) {
    //this.state.searchOptions.loading = true
    //loading = true
    //console.log('Searching...')
    //console.log(this.state.value)
    var params = new URLSearchParams();
    params.append("rows", 500);
    params.append("start", 0);
    params.append("highlight_class", "hilite");
    params.append("boost_q", "category:genotype%5E-10");
    params.append("prefix", "HP");
    params.append("prefix", "MONDO");
    params.append("prefix", "EFO");
    params.append("prefix", "OBA");
    params.append("prefix", "NCIT");
    params.append("prefix", "-OMIA");
    const fetchResults = async () =>
      await axios
        .get(
          `https://api-dev.monarchinitiative.org/api/search/entity/autocomplete/${
            this.state.value
          }`,
          {
            params: params
          }
        )
        .then(response => {
          //console.log(response.data)
          this.setState({ results: response.data.docs });
        })
        .catch(error => console.error(error));
    fetchResults();
    //this.state.searchOptions.loading = false
    //loading = false
    event.preventDefault();
  }

  renderTableData() {
    return this.state.results.map((listing, index) => {
      return (
        <tr
          key={listing.id}
          data-item={listing.id}
          onClick={e => this.handleSelect(e)}
        >
          <td data-item={listing.id} data-index={index}>
            {listing.label}
          </td>
        </tr>
      );
    });
  }

  handleSelect(e) {
    let selectedIndex = e.target.getAttribute("data-index");
    //let selectedResultId = e.target.getAttribute('data-item');
    this.setState({
      indexToExpand: selectedIndex,
      resultToExpand: this.state.results[selectedIndex]
    });
    e.preventDefault();
  }

  toDisplay() {
    console.log(this.state.resultToExpand);
  }

  render() {
    return (
      <div className="root">
        <header className="App-header">
          <Container fluid>
            <Row>
              <SearchBar
                className={styles.search}
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
                onSubmit={this.handleSubmit.bind(this)}
              />
            </Row>
            <Row>
              <Col>
                <ResultsTable
                  className={styles.results}
                  onChange={this.renderTableData()}
                />
              </Col>
              <Col>
                <ExpandedResult
                  className={styles.expanded}
                  data={this.state.resultToExpand}
                  onChange={this.toDisplay()}
                />
              </Col>
            </Row>
          </Container>
        </header>
      </div>
    );
  }
}

export default App;
