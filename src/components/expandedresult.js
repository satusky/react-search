import React from "react";
import "../App.css";

export default class ExpandedResult extends React.Component {
  /*
  constructor(props) {
    super(props);
  }
  */

  render() {
    return (
      <div className="expanded">
        <h1 id="expandedTitle">{this.props.data.label}</h1>
        <p>
          This is where the description of the phenotype will go. Right now this
          text is here because I don't feel like copying the standard latin
          stuff that people always use for placeholders. I feel like this is
          more "me" anyway.
        </p>
        <h2>Connections</h2>
        <ul>
          <li>Phenotypes</li>
          <li>Genes</li>
          <li>Genotypes</li>
          <li>Diesease</li>
        </ul>
      </div>
    );
  }
}
