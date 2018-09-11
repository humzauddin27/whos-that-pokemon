import React, { Component } from "react";
import "./index.css";

class GuessInput extends Component {
  state = {
    inputValue: ""
  };

  updateSearchValue = event => {
    const newInputValue = event.target.value;
    this.setState({ inputValue: newInputValue });
  };

  handleOnClick = () => {
    this.props.assignGuessValue(this.state.inputValue);
  };

  render() {
    return (
      <div className="guess-input">
        <input
          className="input"
          value={this.state.inputValue}
          onChange={this.updateSearchValue}
          onKeyDown={event => {
            if (event.key === "Enter") {
              this.handleOnClick();
            }
          }}
          placeholder={"Enter a guess here!"}
        />
        <div className="guess-button" onClick={this.handleOnClick}>
          Guess!
        </div>
      </div>
    );
  }
}

export default GuessInput;
