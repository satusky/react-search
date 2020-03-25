import React from 'react';
import ReactDOM from 'react-dom';

import {
  ReactiveBase,
  DataSearch,
  ResultList,
  ReactiveList,
} from '@appbaseio/reactivesearch';

class App extends React.Component {

  render() {
    return (
      <ReactiveBase 
        app="test"
        url="https://scox.europa.renci.org:9200/"
      >
        <div className="row reverse-labels">
          <div className="col">
            <DataSearch
              componentId="SearchSensor"
              //dataField="name"
              title="Search"
            />
          </div>
          <div className="col" style={{ backgroundColor: '#fafafa' }}>
            <ReactiveList
              componentId="SearchResult"
              dataField="variable"
              className="result-list-container"
              pagination
              URLParams
              react={{
                and: 'SearchSensor',
              }}
              render={({ data }) => (
                <ReactiveList.ResultListWrapper>
                  {data.map(item => (
                    <ResultList>
                      <ResultList.Content>
                        { item }
                      </ResultList.Content>
                    </ResultList>
                  ))}
                </ReactiveList.ResultListWrapper>
              )}
            />
          </div>
        </div>
      </ReactiveBase>
    );
  }

}

export default App;