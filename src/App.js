import React, { Component } from "react";
import axios from "axios";
import Display from "./components/Display";
import LoadingSpinner from "./components/LoadingSpinner";
import { numberOfPokemon } from "./consts";
import "./App.css";

class App extends Component {
  state = {
    listOfPokemon: [],
    error: null
  };

  componentWillMount() {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${numberOfPokemon}`)
      .then(response => {
        this.setState({
          listOfPokemon: response.data.results
        });
      })
      .catch(error => this.setState({ error: error }));
  }

  render() {
    if (this.state.error) {
      const failedImage = require(`./assets/images/brock.gif`);
      return (
        <div className="failed-load">
          <p> Oops! Something went wrong... </p>
          <img src={String(failedImage)} alt="Please reload the page" />
        </div>
      );
    }

    if (!this.state.listOfPokemon.length) {
      return (
        <div className="loading-spinner">
          <LoadingSpinner />
        </div>
      );
    }
    return (
      <div className="App">
        <header className="App-header">
          <div>Who's That Poke&#769;mon?</div>
        </header>
        <div className="body">
          <div className="display">
            <Display listOfPokemon={this.state.listOfPokemon} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
