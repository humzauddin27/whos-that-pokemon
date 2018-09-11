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
      background: `${this.determineStatBarColor(stat)}`
    };

    return <div className="stat-bar" style={styles} />;
  }

  render() {
    const { pokemonInfo, sprite } = this.props;
    const types = pokemonInfo.types.map(typeEntry => typeEntry.type.name);
    const stats = pokemonInfo.stats.map(statEntry => ({
      name: statEntry.stat.name,
      value: statEntry.base_stat
    }));
    const hpStat = stats.find(stat => stat.name === "hp").value;
    const atkStat = stats.find(stat => stat.name === "attack").value;
    const defStat = stats.find(stat => stat.name === "defense").value;
    const spAtkStat = stats.find(stat => stat.name === "special-attack").value;
    const spDefStat = stats.find(stat => stat.name === "special-defense").value;
    const spdStat = stats.find(stat => stat.name === "speed").value;

    return (
      <div>
        <p className="pokemon-name"> IT'S {pokemonInfo.name.toUpperCase()}! </p>
        <Sprite path={sprite} />
        <div className="types">
          {types.map(type => {
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
