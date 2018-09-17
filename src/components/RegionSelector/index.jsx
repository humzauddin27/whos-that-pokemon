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
          {Object.values(REGIONS).map(region => (
            <div>
              <img
                className="boxart"
                key={region.art}
                src={region.art}
                alt={region.num}
                onClick={() => this.props.setRegion(region.num)}
              />
              <p> Range: 1 - {region.num} </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default RegionSelector;
