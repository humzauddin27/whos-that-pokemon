import React, { Component } from "react";
import { REGIONS } from "../../consts";
import "./index.css";

class RegionSelector extends Component {
  render() {
    return (
      <div className="select-region">
        <p> Pick the game's national dex that you want to be tested on! </p>
        <div className="images">
          {" "}
          {Object.values(REGIONS).map((region, index) => (
            <div key={region.art}>
              <img
                className="boxart"
                src={region.art}
                alt={region.num}
                onClick={() => this.props.setRegion(region.num)}
              />
              <p> Generation {index + 1} </p>
              <p> Range: 1 - {region.num} </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default RegionSelector;
