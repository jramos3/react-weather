import React from "react";
import Search from "./components/Search";
import WeatherCard from "./components/WeatherCard";
import Spinner from "./components/Spinner";
import NotFound from "./components/NotFound";
import "../src/styles/app.css";

class App extends React.Component {
  state = {
    weatherData: [],
    loading: false,
    woeid: null,
    reqType: "",
    dataFound: false
  };

  getWOEID = loc => {
    this.setState({ loading: true });
    fetch(
      `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${loc}`
    )
      .then(response => response.json())
      .then(data => {
        if (data.length === 1) {
          const woeid = data[0].woeid;

          woeid === this.state.woeid
            ? this.setState({ loading: false })
            : this.setState({ woeid });
        } else {
          this.setState({
            loading: false,
            woeid: -1,
            dataFound: false
          });
        }
      })
      .catch(error => console.log(error));
  };

  getWeatherData = woeid => {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        const { title, location_type, consolidated_weather } = data;
        const weatherData = {
          title,
          locationType: location_type,
          consolidatedWeather:
            this.state.reqType === "today"
              ? consolidated_weather.slice(0, 1)
              : consolidated_weather
        };
        this.setState({
          weatherData,
          loading: false,
          dataFound: true
        });
      })
      .catch(error => console.log(error));
  };

  getReqType = reqType => {
    this.setState({ reqType });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.woeid !== this.state.woeid ||
      prevState.reqType !== this.state.reqType
    ) {
      this.setState({ dataFound: false });
      this.getWeatherData(this.state.woeid);
    }
  }

  render() {
    const { loading, woeid, weatherData, dataFound } = this.state;

    return (
      <div>
        <Search getWOEID={this.getWOEID} getReqType={this.getReqType} />

        {loading ? (
          <Spinner />
        ) : dataFound ? (
          <div>
            <h2 className="city">{`${weatherData.title}, ${
              weatherData.locationType
            }`}</h2>
            <div className="weather-container">
              {weatherData.consolidatedWeather.map(day => (
                <WeatherCard key={day.id} weatherData={day} />
              ))}
            </div>
          </div>
        ) : woeid === -1 ? (
          <NotFound />
        ) : null}
      </div>
    );
  }
}

export default App;
