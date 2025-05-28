//  @ts-nocheck
import { log } from "console";
import React, { Component } from "react";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }

  changeDetail = () => {
    this.setState({
      color: "blue",
      brand: "Tesls",
      model: "Model S",
      year: "2024",
    });
  };

  componentDidMount() {
    console.log("componentDidMoubt");
    // runs after first render =>EN' DASLEP FRONTENDTI QURIW USHIN, RETRIEVE DATA FROM BACKEND SERVER
    // LIFECYCLE METHODLAR
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    // runs before disappear => SOL PAGEDI JASIRILIWDAN ALDIN
  }

  componentDidUpdate() {}

  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          Color: {this.state.color} - Model: {this.state.model} - from{" "}
          {this.state.year}.
        </p>
        <button type="button" onClick={this.changeDetail}>
          Change detail
        </button>
      </div>
    );
  }
}

export default Test;
