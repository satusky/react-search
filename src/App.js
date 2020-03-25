//import React, { Component } from 'react';
import React from "react";
import { Container, Row, Col } from "react-grid-system";
import SearchBar from "./components/searchbar";
import ResultsTable from "./components/resultstable";
import ExpandedResult from "./components/expandedresult";
import styles from "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: {
        index: "test",
        query: ""
      },
      rows: 500,
      start: 0,
      results: [],
      indexToExpand: [],
      resultToExpand: [],
      postId: ""
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.toDisplay = this.toDisplay.bind(this);
  }
  
  handleChange(event) {
    this.setState({ 
      query: {
        index: "test", 
        query: `${event.target.value}`
      }
    });
    console.log(this.state.query.query);
    //console.log(this.state.query);
  }
  
  handleSubmit(event) {
    this.setState({ 
        query: {
          index: "test", 
          query: `${event.target.value}`
        }
    });
    
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(this.state.query)
    };

    console.log(requestOptions);

    fetch("http://scox.europa.renci.org:5551/search", requestOptions)
      .then(response => response.json())
      .then(data => this.setState({results: data}))
      .catch(error => console.log(error));
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
                value={this.state.query.query}
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
