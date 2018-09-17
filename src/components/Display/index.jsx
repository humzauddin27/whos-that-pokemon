import React, { Component } from "react";
import axios from "axios";
import GuessInput from "../GuessInput";
import PokemonInfo from "../PokemonInfo";
import Sprite from "../Sprite";
import LoadingSpinner from "../LoadingSpinner";
import "./index.css";

class Display extends Component {
  state = {
    pokemonFound: false,
    pokeInfo: null,
    guessValue: "",
    wrongGuesses: 0,
    streak: 0
  };

  focusInput = component => {
    if (component) {
      component.focus();
    }
  };

  componentWillMount() {
    this.assignNewPokemon();
  }

  assignNewPokemon = () => {
    const pokeNumber = this.generateRandomNumber();
    const newPokemon = this.generateRandomPokemon(pokeNumber);
    this.getPokemonInfo(newPokemon);
  };

  generateRandomPokemon(pokemonNumber) {
    const { listOfPokemon } = this.props;
    const selectedPokemon = listOfPokemon[pokemonNumber];
    return selectedPokemon;
  }

  getPokemonInfo = pokemon => {
    if (!pokemon) {
      return null;
    }
    axios
      .get(pokemon.url)
      .then(response => this.setState({ pokeInfo: response.data }));
  };

  generateRandomNumber() {
    return Math.floor(Math.random() * this.props.numberOfPokemon);
  }

  giveHints = () => {
    const { wrongGuesses, pokeInfo } = this.state;
    const types = pokeInfo.types.map(typeEntry => typeEntry.type.name);
    const firstLetter = pokeInfo.name.substr(0, 1);

    return (
      <div className="hints">
        {wrongGuesses >= 1 && (
          <div className="types">
            {types.map(type => {
              const typeImage = require(`../../assets/types/${type}.jpg`);
              return <img src={String(typeImage)} alt={type} key={type} />;
            })}
            {`Type${types.length > 1 ? "s" : ""}: `}
          </div>
        )}
        {wrongGuesses >= 2 && (
          <p> First letter: {firstLetter.toUpperCase()} </p>
        )}
      </div>
    );
  };

  assignGuessValue = newGuess => {
    const { pokeInfo, streak } = this.state;
    const guessFiltered = newGuess.toLowerCase().replace(/\s/g, "");
    if (guessFiltered === pokeInfo.name) {
      this.setState({ pokemonFound: true, streak: streak + 1 });
    } else if (this.state.wrongGuesses === 2) {
      this.setState({ pokemonFound: true, streak: 0 });
    } else {
      this.setState({ wrongGuesses: this.state.wrongGuesses + 1 });
    }
    this.setState({ guessValue: newGuess });
  };

  handleOnRestart = () => {
    this.setState({
      pokemonFound: false,
      wrongGuesses: 0,
      guessValue: "",
      pokeInfo: null
    });
    this.assignNewPokemon();
  };

  render() {
    const { pokeInfo, pokemonFound, streak } = this.state;
    if (!pokeInfo) {
      return <LoadingSpinner />;
    }

    const sprite = pokeInfo.sprites.front_default;
    return !pokemonFound ? (
      <div className="image">
        <Sprite path={sprite} hidden />
        {this.giveHints()}
        <GuessInput assignGuessValue={this.assignGuessValue} />
        <p> Streak: {streak} </p>
      </div>
    ) : (
      <div>
        <PokemonInfo sprite={sprite} pokemonInfo={pokeInfo} />
        <input
          className="hidden-input"
          ref={this.focusInput}
          onKeyDown={event => {
            if (event.key === "Enter") {
              this.handleOnRestart();
            }
          }}
        />
        <div
          id="start-again-button"
          type="submit"
          className="start-again-button"
          onClick={this.handleOnRestart}
        >
          {streak > 0 ? "Continue" : "Start Again"}
        </div>
        <p> Streak: {streak} </p>
      </div>
    );
  }
}

export default Display;
