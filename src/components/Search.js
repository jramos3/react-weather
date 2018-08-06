import React from "react";
import "../styles/search.css";

class Search extends React.Component {
  locationRef = React.createRef();
  reqTypeRef = React.createRef();

  resetControls = () => {
    this.locationRef.current.value = "";
    this.reqTypeRef.current.value = "today";
  };

  render() {
    return (
      <div className="search-box">
        <input type="text" placeholder="Enter City" ref={this.locationRef} />
        <select ref={this.reqTypeRef}>
          <option value="today">Weather Today</option>
          <option value="six-day">6-Day Weather Forecast</option>
        </select>
        <button
          onClick={() => {
            if (this.locationRef.current.value !== "") {
              this.props.getReqType(this.reqTypeRef.current.value);
              this.props.getWOEID(this.locationRef.current.value);
              this.resetControls();
            }
          }}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
