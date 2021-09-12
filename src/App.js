import React, { Component } from "react";
import axios from "axios";
import Display from "./components/Display";
import RegionSelector from "./components/RegionSelector";
import "./App.css";

class App extends Component {
  state = {
    numberOfPokemon: 0,
    listOfPokemon: [],
    error: null,
  };

  fetchPokemon(numberOfPokemon) {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${numberOfPokemon}`)
      .then((response) => {
        this.setState({
          numberOfPokemon: numberOfPokemon,
          listOfPokemon: response.data.results,
        });
      })
      .catch((error) => this.setState({ error: error }));
  }

  setRegion = (regionSelected) => {
    this.fetchPokemon(regionSelected);
  };

  goBackToRegionSelect = () => {
    return (
      <div
        onClick={() => {
          if (window.confirm("This will reset your streak to 0")) {
            this.setState({ numberOfPokemon: 0 });
          }
        }}
        className="backToRegionSelect"
      >
        {" "}
        Go back to Region Select{" "}
      </div>
    );
  };

  render() {
    const { listOfPokemon, numberOfPokemon, error } = this.state;
    if (error) {
      const failedImage = require(`./assets/images/brock.gif`);
      return (
        <div className="failed-load">
          <p> Oops! Something went wrong... </p>
          <img src={String(failedImage)} alt="Please reload the page" />
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
            {numberOfPokemon === 0 ? (
              <div className="region-select">
                <RegionSelector setRegion={this.setRegion} />
              </div>
            ) : (
              <div>
                <Display
                  listOfPokemon={listOfPokemon}
                  numberOfPokemon={numberOfPokemon}
                />
                {this.goBackToRegionSelect()}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
