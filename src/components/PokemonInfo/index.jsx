import React, { Component } from "react";
import Sprite from "../Sprite";
import "./index.css";

class PokemonInfo extends Component {
  determineStatBarColor(stat) {
    if (stat <= 50) {
      return "#b90000";
    } else if (stat <= 85) {
      return "#ff830f";
    } else {
      return "#17d405";
    }
  }

  generateStatBar(stat) {
    const styles = {
      width: `${stat}px`,
      background: `${this.determineStatBarColor(stat)}`,
    };

    return <div className="stat-bar" style={styles} />;
  }

  determineColorText(color) {
    switch (color) {
      case "fire":
        return "#f68f2e";
      case "bug":
        return "#a8b820";
      case "dark":
        return "#705848";
      case "dragon":
        return "#7038f8";
      case "electric":
        return "#f8d030";
      case "fairy":
        return "#ee99ac";
      case "fighting":
        return "#c03028";
      case "flying":
        return "#a890f0";
      case "ghost":
        return "#705898";
      case "grass":
        return "#78c850";
      case "ground":
        return "#e0c068";
      case "ice":
        return "#98d8d8";
      case "normal":
        return "#a8a878";
      case "poison":
        return "#a040a0";
      case "psychic":
        return "#f85888";
      case "rock":
        return "#c8a048";
      case "steel":
        return "#b8b8d0";
      case "water":
        return "#6890f0";
      default:
        return "wheat";
    }
  }

  render() {
    const { pokemonInfo, sprite } = this.props;
    const types = pokemonInfo.types.map((typeEntry) => typeEntry.type.name);
    const stats = pokemonInfo.stats.map((statEntry) => ({
      name: statEntry.stat.name,
      value: statEntry.base_stat,
    }));
    const hpStat = stats.find((stat) => stat.name === "hp").value;
    const atkStat = stats.find((stat) => stat.name === "attack").value;
    const defStat = stats.find((stat) => stat.name === "defense").value;
    const spAtkStat = stats.find((stat) => stat.name === "special-attack")
      .value;
    const spDefStat = stats.find((stat) => stat.name === "special-defense")
      .value;
    const spdStat = stats.find((stat) => stat.name === "speed").value;
    const color = this.determineColorText(types[0]);
    return (
      <div>
        <p style={{ backgroundColor: `${color}` }} className="pokemon-name">
          {" "}
          IT'S {pokemonInfo.name.toUpperCase()}!{" "}
        </p>
        <Sprite path={sprite} />
        <div className="types">
          {types.map((type) => {
            const typeImage = require(`../../assets/types/${type}.jpg`);
            return <img src={String(typeImage)} alt={type} key={type} />;
          })}
        </div>
        <div className="stats">
          <div className="individual-stat">
            <p> HP: {hpStat} </p>
            {this.generateStatBar(hpStat)}
          </div>
          <div className="individual-stat">
            <p> ATK: {atkStat} </p>
            {this.generateStatBar(atkStat)}
          </div>
          <div className="individual-stat">
            <p> DEF: {defStat} </p>
            {this.generateStatBar(defStat)}
          </div>
          <div className="individual-stat">
            <p> SP. ATK: {spAtkStat} </p>
            {this.generateStatBar(spAtkStat)}
          </div>
          <div className="individual-stat">
            <p> SP. DEF: {spDefStat} </p>
            {this.generateStatBar(spDefStat)}
          </div>
          <div className="individual-stat">
            <p> SPD: {spdStat} </p>
            {this.generateStatBar(spdStat)}
          </div>
        </div>
      </div>
    );
  }
}

export default PokemonInfo;
