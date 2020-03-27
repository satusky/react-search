import React from "react";
import "../App.css";

export default class ExpandedResult extends React.Component {
  /*
  constructor(props) {
    super(props);
  }
  */

  render() {
    if (!this.props.data) {
        return(<div />)
    }

    return (
      <div className="expanded">
        {this.props.data._source.study && (
          <div>
            <h1 id="expandedTitle">{this.props.data._source.name[0]}</h1>
            <h2>{this.props.data._id}</h2>
            <h3>Study:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{this.props.data._source.study}</h3>
            <h3>Tag:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{this.props.data._source.tag}</h3>
            <h3>Var:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{this.props.data._source.var}</h3>

            <section id="description">
              <h2 id="descriptionTitle">Description</h2>
              <ul id="descriptionList">
                {this.props.data._source.name.length > 1 &&
                  this.props.data._source.name.map((item, index) => {
                    if (index > 0) {
                      return(<li key={index}>{item}</li>)
                    }
                  })
                }
              </ul>
            </section>
          </div>
        )}
      </div>
    );
  }
}
