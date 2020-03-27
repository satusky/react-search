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
      results: {
          status: "",
          hits: [],
          message: ""
        },
      indexToExpand: null,
      resultToExpand: null,
      postId: "",
      resultsReturned: false,
      requestSubmitted: false
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
  }
  
  handleSubmit(event) {
    this.setState({ 
      query: {
        index: "test", 
        query: `${event.target.value}`
      },
      results: {
        status: "",
        hits: [],
        message: ""
      },
      indexToExpand: null,
      resultToExpand: null,
      resultsReturned: false,
      requestSubmitted: false
    });
    
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(this.state.query)
    };

    console.log(requestOptions);

    fetch("http://search.helx-dev.renci.org:5551/search", requestOptions)
      .then(response => response.json())
      .then(data => this.setState({
          results: {
            status: data.status,
            hits: data.result.hits.hits,
            message: data.message
          }
        }))
      .catch(error => console.log(error));

    this.setState({requestSubmitted: true});
  }

  componentDidUpdate() {
    if (!this.state.resultsReturned && this.state.results.hits) {
      for (var i = 0; i < Object.keys(this.state.results.hits).length; i++) {
        if (this.state.results.hits[i]._source.study) {
          this.setState({resultsReturned: true});
          console.log(this.state.resultsReturned);
          break
        }
      };
    }
  }
  
  renderTableData() {
    if (!this.state.requestSubmitted) {
      return(<div />)
    }
    
    return (
        this.state.results.hits.map((listing, index) => {
          return (
            (listing._source.study) && (
              <tr
                key={index}
                data-item={listing._id}
                onClick={e => this.handleSelect(e)}
              >
                <td data-item={listing._id} data-index={index}>
                  {listing._source.name[0]}
                </td>
              </tr>
            )
          );
      })
    )

  }
  

  handleSelect(e) {
    let selectedIndex = e.target.getAttribute("data-index");
    this.setState({
      indexToExpand: selectedIndex,
      resultToExpand: this.state.results.hits[selectedIndex]
    });
    e.preventDefault();
  }

  toDisplay() {
    console.log(this.state.results.hits);
    console.log(this.state.resultToExpand);
    console.log(this.state.resultsReturned);
    console.log(Object.keys(this.state.results.hits).length);
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
                  id="results"
                  className={styles.results}
                  onChange={this.renderTableData()}
                />
                { this.state.requestSubmitted && !this.state.resultsReturned &&
                  <h2>No variables found</h2>
                }
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
